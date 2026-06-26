const assert = require('assert');

const API_URL = 'http://localhost:3000';

async function runTests() {
  console.log('=== STARTING MOBILE API & SECURITY TEST RUN ===\n');

  // 1. Log in as Test User
  console.log('Logging in as Test User...');
  const loginRes = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@eshop.com',
      password: 'Test1234!'
    })
  });
  
  if (!loginRes.ok) {
    throw new Error(`Test User login failed: ${loginRes.statusText}`);
  }
  
  const userData = await loginRes.json();
  const token = userData.token;
  const userId = userData.user.id;
  console.log(`Logged in as Test User. ID: ${userId}, Token: ${token.substring(0, 15)}...\n`);

  // ==========================================================================
  // TEST 1: Coupon Expiration Constraint
  // Verify that applying the expired coupon code "EXPIRED" returns a 400 Bad Request with: "Mã giảm giá đã hết hạn"
  // ==========================================================================
  console.log('--- TEST 1: Coupon Expiration Constraint ---');
  const expRes = await fetch(`${API_URL}/api/apply-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      code: 'EXPIRED',
      total_amount: 150000,
      user_id: userId
    })
  });

  const expStatus = expRes.status;
  const expData = await expRes.json();
  console.log(`Apply coupon EXPIRED status: ${expStatus}`);
  console.log('Apply coupon EXPIRED body:', expData);

  if (expStatus === 400 && expData.error === 'Mã giảm giá đã hết hạn') {
    console.log('✅ TEST 1 PASSED: Expired coupon blocked with correct message.\n');
  } else {
    console.log(`❌ TEST 1 FAILED: Expected 400 Bad Request with "Mã giảm giá đã hết hạn", got status ${expStatus} and body:`, expData, '\n');
  }

  // ==========================================================================
  // TEST 2: Coupon Minimum Order Threshold (300,000 ₫ boundary for SAVE10)
  // Verify:
  // - 299,999 ₫: Rejected (400 Bad Request)
  // - 300,000 ₫: Accepted (But let's see if the backend has the > vs >= bug!)
  // ==========================================================================
  console.log('--- TEST 2: Coupon Minimum Order Threshold ---');
  
  // Test 2a: 299,999 ₫ (Below threshold)
  console.log('Applying SAVE10 to 299,999 ₫ order (expected rejection)...');
  const thresholdRes1 = await fetch(`${API_URL}/api/apply-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      code: 'SAVE10',
      total_amount: 299999,
      user_id: userId
    })
  });
  const thresholdStatus1 = thresholdRes1.status;
  const thresholdData1 = await thresholdRes1.json();
  console.log(`Response 2a status: ${thresholdStatus1}, body:`, thresholdData1);

  // Test 2b: 300,000 ₫ (Exactly at threshold)
  console.log('Applying SAVE10 to 300,000 ₫ order (expected acceptance)...');
  const thresholdRes2 = await fetch(`${API_URL}/api/apply-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      code: 'SAVE10',
      total_amount: 300000,
      user_id: userId
    })
  });
  const thresholdStatus2 = thresholdRes2.status;
  const thresholdData2 = await thresholdRes2.json();
  console.log(`Response 2b status: ${thresholdStatus2}, body:`, thresholdData2);

  let test2aPassed = (thresholdStatus1 === 400 && thresholdData1.error.includes('Đơn hàng chưa đủ giá trị tối thiểu'));
  let test2bPassed = (thresholdStatus2 === 200 && thresholdData2.success === true);

  if (test2aPassed && test2bPassed) {
    console.log('✅ TEST 2 PASSED: Minimum threshold boundaries are enforced correctly (299,999 ₫ rejected, 300,000 ₫ accepted).\n');
  } else {
    console.log('❌ TEST 2 FAILED: Boundary checks failed!');
    if (!test2bPassed && thresholdStatus2 === 400) {
      console.log(`   👉 Boundary Bug Confirmed: 300,000 ₫ was rejected (likely due to using '>' instead of '>=')!`);
    }
    console.log('\n');
  }

  // ==========================================================================
  // TEST 3: Coupon Usage Limit Constraint (max 2 uses for VIP100)
  // Verify that subsequent attempts to use the coupon after 2 times return:
  // "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)"
  // ==========================================================================
  console.log('--- TEST 3: Coupon Usage Limit Constraint ---');
  
  // Record usage twice to exceed limit
  console.log('Seeding coupon usage 1...');
  await fetch(`${API_URL}/api/coupon-usage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ coupon_id: 3 }) // VIP100 has ID 3
  });

  console.log('Seeding coupon usage 2...');
  await fetch(`${API_URL}/api/coupon-usage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ coupon_id: 3 })
  });

  console.log('Attempting to apply VIP100 for the 3rd time (expected rejection)...');
  const limitRes = await fetch(`${API_URL}/api/apply-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      code: 'VIP100',
      total_amount: 350000,
      user_id: userId
    })
  });

  const limitStatus = limitRes.status;
  const limitData = await limitRes.json();
  console.log(`Apply coupon VIP100 (3rd time) status: ${limitStatus}`);
  console.log('Response body:', limitData);

  if (limitStatus === 400 && limitData.error === 'Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)') {
    console.log('✅ TEST 3 PASSED: Coupon usage limit enforced correctly.\n');
  } else {
    console.log(`❌ TEST 3 FAILED: Usage limit not enforced properly. Expected 400 Bad Request, got status ${limitStatus} and body:`, limitData, '\n');
  }

  // ==========================================================================
  // TEST 4: Client-side Total Amount Tampering Check
  // Verify that sending a manipulated total amount (e.g. 10,000 ₫ instead of 450,000 ₫)
  // is detected and blocked by the backend API.
  // ==========================================================================
  console.log('--- TEST 4: Client-side Total Amount Tampering Check ---');
  console.log('Sending checkout request with manipulated total_amount = 10,000 ₫...');
  const tamperRes = await fetch(`${API_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      total_amount: 10000, // Tampered value
      shipping_address: '123 Fake Street, District 1, HCMC'
    })
  });

  const tamperStatus = tamperRes.status;
  const tamperData = await tamperRes.json();
  console.log(`Checkout response status: ${tamperStatus}`);
  console.log('Checkout response body:', tamperData);

  if (tamperStatus === 400 || tamperStatus === 403) {
    console.log('✅ TEST 4 PASSED: Price tampering detected and blocked by the backend.\n');
  } else if (tamperStatus === 200) {
    console.log('❌ TEST 4 FAILED: Price Parameter Tampering vulnerability exists! Backend accepted the manipulated total of 10,000 ₫.\n');
  } else {
    console.log(`❌ TEST 4 FAILED: Unexpected response status ${tamperStatus}\n`);
  }

  console.log('=== MOBILE API & SECURITY TEST RUN COMPLETED ===');
}

runTests().catch(err => {
  console.error('Test run crashed:', err);
});
