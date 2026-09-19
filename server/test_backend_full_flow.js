import { generateItinerary, saveItinerary, getItineraryById } from './controllers/plannerController.js';
import { calculateRoute } from './controllers/routeController.js';
import { getGems, createGem, upvoteGem } from './controllers/gemsController.js';

// Mock Express req/res
function createMockReqRes(body = {}, params = {}, query = {}) {
  let statusCode = 200;
  let responseData = null;

  const req = { body, params, query };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    _getData: () => responseData,
    _getStatus: () => statusCode
  };

  return { req, res };
}

async function runTests() {
  console.log('========================================================');
  console.log('EXPLORERIQ FULL-STACK BACKEND ARCHITECTURE VERIFICATION');
  console.log('========================================================\n');

  // TEST 1: Smart Planner API (generateItinerary)
  console.log('=== TEST 1: POST /api/planner/generate ===');
  const { req: planReq, res: planRes } = createMockReqRes({
    city: 'Agra',
    checkInDate: '2026-10-01',
    checkOutDate: '2026-10-04',
    budgetLimit: 25000,
    travelerType: 'Cultural Explorer',
    guests: 2
  });

  await generateItinerary(planReq, planRes);
  const planData = planRes._getData();

  console.log('Status Code:', planRes._getStatus());
  console.log('Success:', planData?.success);
  console.log('Destination City:', planData?.destinationCity);
  console.log('Days Generated:', planData?.days);
  console.log('Daily Plans Count:', planData?.dayPlan?.length);
  console.log('Day 1 Slots Count:', planData?.dayPlan?.[0]?.slots?.length);
  console.log('Budget Breakdown:', planData?.breakdown);
  console.log('Dynamic Booking URL:', planData?.bookingUrl);

  if (
    planData?.success &&
    planData?.days === 3 &&
    planData?.dayPlan?.length === 3 &&
    planData?.dayPlan[0]?.slots?.length === 7 &&
    planData?.bookingUrl?.includes('checkin=2026-10-01') &&
    planData?.bookingUrl?.includes('checkout=2026-10-04')
  ) {
    console.log('TEST 1 PASSED: 7-slot daily planner and Booking.com URL verified! ✅\n');
  } else {
    throw new Error('TEST 1 FAILED: Unexpected planner response structure.');
  }

  // TEST 2: Route Planner API (calculateRoute)
  console.log('=== TEST 2: POST /api/route/calculate (Taj Mahal -> Agra Fort) ===');
  const { req: routeReq, res: routeRes } = createMockReqRes({
    startLat: 27.1751,
    startLng: 78.0421,
    destLat: 27.1795,
    destLng: 78.0211,
    destName: 'Agra Fort',
    cityContext: { userCity: 'Agra' }
  });

  await calculateRoute(routeReq, routeRes);
  const routeData = routeRes._getData();

  console.log('Status Code:', routeRes._getStatus());
  console.log('Success:', routeData?.success);
  console.log('Road Distance (km):', routeData?.distanceKm);
  console.log('Travel Duration (mins):', routeData?.durationMinutes);
  console.log('Live Route Flag:', routeData?.isLiveRoute);
  console.log('Multi-Modal Transit Modes Count:', routeData?.modes?.length);
  routeData?.modes?.forEach((m) => {
    console.log(`- ${m.name}: ₹${m.fare} (${m.durationMins} mins, ${m.co2Grams}g CO2) [Cheapest: ${!!m.isCheapest}, Fastest: ${!!m.isFastest}, Eco: ${!!m.isEcoFriendly}]`);
  });

  if (
    routeData?.success &&
    routeData?.distanceKm > 2 &&
    routeData?.distanceKm < 5.0 &&
    routeData?.modes?.length === 5
  ) {
    console.log('TEST 2 PASSED: Accurate road distance and 5-mode transit matrix verified! ✅\n');
  } else {
    throw new Error('TEST 2 FAILED: Unexpected route calculation result.');
  }

  // TEST 3: Community Hidden Gems API (getGems, createGem, upvoteGem)
  console.log('=== TEST 3: Hidden Gems API (GET, POST create, POST upvote) ===');
  
  // 3a: Get Gems
  const { req: getGemsReq, res: getGemsRes } = createMockReqRes({}, {}, { city: 'Agra' });
  await getGems(getGemsReq, getGemsRes);
  const gemsList = getGemsRes._getData();
  console.log('GET /api/gems Count:', gemsList?.count);
  console.log('First Gem Title:', gemsList?.gems?.[0]?.title);

  // 3b: Create Gem
  const { req: createGemReq, res: createGemRes } = createMockReqRes({
    title: 'Secret Chhatri Rooftop Viewpoint',
    location: 'Near Taj East Gate, Agra',
    category: 'Nature & Views',
    description: 'A 400-year-old sandstone pavilion overlooking the Taj Mahal minarets at twilight.',
    rating: 5,
    submittedBy: 'Dev Explorer'
  });
  await createGem(createGemReq, createGemRes);
  const newGem = createGemRes._getData();
  console.log('POST /api/gems/create Success:', newGem?.success);
  console.log('Created Gem ID:', newGem?.gem?._id || newGem?.gem?.id);
  console.log('Created Gem Title:', newGem?.gem?.title);

  // 3c: Upvote Gem
  const gemIdToUpvote = newGem?.gem?._id || newGem?.gem?.id;
  const { req: upvoteReq, res: upvoteRes } = createMockReqRes({}, { id: gemIdToUpvote });
  await upvoteGem(upvoteReq, upvoteRes);
  const upvoteData = upvoteRes._getData();
  console.log(`POST /api/gems/${gemIdToUpvote}/upvote Success:`, upvoteData?.success);
  console.log('Updated Upvote Count:', upvoteData?.upvotes || upvoteData?.likes);

  if (
    gemsList?.success &&
    newGem?.success &&
    upvoteData?.success &&
    (upvoteData?.upvotes > 1 || upvoteData?.likes > 1)
  ) {
    console.log('TEST 3 PASSED: Full Hidden Gems CRUD and upvoting cycle verified! ✅\n');
  } else {
    throw new Error('TEST 3 FAILED: Unexpected hidden gems response.');
  }

  console.log('========================================================');
  console.log('ALL BACKEND PRODUCTION CONTROLLERS & SERVICES VERIFIED! ✅');
  console.log('========================================================');
}

runTests().catch((err) => {
  console.error('VERIFICATION SUITE FAILED:', err);
  process.exit(1);
});
