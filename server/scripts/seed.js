import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Monument } from '../models/Monument.js';
import { Destination } from '../models/Destination.js';
import { CommunityGem } from '../models/CommunityGem.js';
import { setInMemoryMonuments } from '../controllers/monumentController.js';
import { setInMemoryDestinations } from '../controllers/destinationController.js';
import { setInMemoryGems } from '../controllers/gemController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedDatabase = async () => {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const monumentsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'monuments.json'), 'utf-8'));
    const destinationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'destinations.json'), 'utf-8'));
    const gemsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'gems.json'), 'utf-8'));

    // Populate In-Memory Caches for zero-latency / fallback execution
    setInMemoryMonuments(monumentsData);
    setInMemoryDestinations(destinationsData);
    setInMemoryGems(gemsData);

    // Populate MongoDB if connected
    const monCount = await Monument.countDocuments().catch(() => -1);
    if (monCount === 0) {
      await Monument.insertMany(monumentsData);
      console.log(`[Seed] Seeded ${monumentsData.length} monuments into MongoDB.`);
    }

    const destCount = await Destination.countDocuments().catch(() => -1);
    if (destCount === 0) {
      await Destination.insertMany(destinationsData);
      console.log(`[Seed] Seeded ${destinationsData.length} destinations into MongoDB.`);
    }

    const gemCount = await CommunityGem.countDocuments().catch(() => -1);
    if (gemCount === 0) {
      await CommunityGem.insertMany(gemsData);
      console.log(`[Seed] Seeded ${gemsData.length} community gems into MongoDB.`);
    }

    console.log(`[Seed] Dataset ready: ${monumentsData.length} monuments, ${destinationsData.length} destinations, ${gemsData.length} gems.`);
  } catch (error) {
    console.warn('[Seed] Notice on seeding:', error.message);
  }
};

// Direct command line run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  import('../config/db.js').then(async ({ connectDB }) => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  });
}
