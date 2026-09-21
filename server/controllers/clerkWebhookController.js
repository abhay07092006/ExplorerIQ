import { Webhook } from 'svix';
import { User } from '../models/User.js';

export const handleClerkWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({
        success: false,
        message: 'CLERK_WEBHOOK_SECRET is not configured'
      });
    }

    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing Clerk webhook headers'
      });
    }

    const wh = new Webhook(webhookSecret);

    const payload = JSON.stringify(req.body);

    const event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    });

    if (event.type === 'user.created' || event.type === 'user.updated') {
      const user = event.data;

      const email =
        user.email_addresses?.find(
          emailAddress =>
            emailAddress.id === user.primary_email_address_id
        )?.email_address ||
        user.email_addresses?.[0]?.email_address;

      const name =
        [user.first_name, user.last_name]
          .filter(Boolean)
          .join(' ')
          .trim() || 'ExplorerIQ User';

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Clerk user has no email address'
        });
      }

      await User.findOneAndUpdate(
        { clerkId: user.id },
        {
          clerkId: user.id,
          name,
          email
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      );
    }

    if (event.type === 'user.deleted') {
      await User.findOneAndDelete({
        clerkId: event.data.id
      });
    }

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('[Clerk Webhook] Error:', error);

    return res.status(400).json({
      success: false,
      message: 'Invalid Clerk webhook'
    });
  }
};