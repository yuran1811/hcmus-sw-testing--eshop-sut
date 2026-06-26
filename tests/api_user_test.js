const assert = require('assert');

const API_URL = 'http://localhost:3000';

async function runTests() {
  console.log('=== STARTING API & SECURITY TEST RUN ===\n');

  // 1. Log in as Admin to get token and Admin ID
  console.log('Logging in as Admin...');
  const adminLoginRes = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@eshop.com',
      password: 'Admin123!'
    })
  });
  
  if (!adminLoginRes.ok) {
    throw new Error(`Admin login failed: ${adminLoginRes.statusText}`);
  }
  
  const adminData = await adminLoginRes.json();
  const adminToken = adminData.token;
  const adminId = adminData.user.id;
  console.log(`Logged in as Admin. ID: ${adminId}, Token: ${adminToken.substring(0, 15)}...\n`);

  // 2. Log in as Test User (or register if not exists)
  console.log('Logging in as Test User...');
  let userLoginRes = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@eshop.com',
      password: 'Test1234!'
    })
  });

  let userData;
  let userToken;
  let userId;

  if (userLoginRes.ok) {
    userData = await userLoginRes.json();
    userToken = userData.token;
    userId = userData.user.id;
    console.log(`Logged in as existing Test User. ID: ${userId}\n`);
  } else {
    console.log('Test User login failed, attempting to register...');
    const registerRes = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@eshop.com',
        password: 'Test1234!'
      })
    });
    
    if (!registerRes.ok) {
      throw new Error(`Test User registration failed: ${registerRes.statusText}`);
    }
    
    const regData = await registerRes.json();
    userId = regData.id;
    
    // Login after registration
    userLoginRes = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@eshop.com',
        password: 'Test1234!'
      })
    });
    
    userData = await userLoginRes.json();
    userToken = userData.token;
    console.log(`Registered and logged in new Test User. ID: ${userId}\n`);
  }

  // ==========================================================================
  // TEST 1: Foreign Key Constraints
  // Verify that attempting to delete a user who has active orders is blocked
  // Expected: 400/403 with "Không thể xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động!"
  // ==========================================================================
  console.log('--- TEST 1: Foreign Key Constraints ---');
  console.log('Creating an active order for the Test User...');
  const orderRes = await fetch(`${API_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      total_amount: 30000000,
      shipping_address: '123 Test Street, District 5, HCMC'
    })
  });

  if (!orderRes.ok) {
    console.error('Failed to create order for Test User:', orderRes.statusText);
  } else {
    const orderData = await orderRes.json();
    console.log(`Order created successfully. Order ID: ${orderData.orderId}`);
    
    console.log(`Attempting to delete Test User (ID: ${userId}) who has an active order...`);
    const deleteUserRes = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const deleteUserStatus = deleteUserRes.status;
    const deleteUserData = await deleteUserRes.json();
    console.log(`DELETE response status: ${deleteUserStatus}`);
    console.log('DELETE response body:', deleteUserData);

    if (deleteUserStatus === 400 || deleteUserStatus === 403) {
      if (deleteUserData.error === 'Không thể xóa người dùng đang có giao dịch hoặc đơn hàng hoạt động!') {
        console.log('✅ TEST 1 PASSED: Delete user with active orders is blocked with correct Vietnamese error message.\n');
      } else {
        console.log(`❌ TEST 1 FAILED: Returned status ${deleteUserStatus} but incorrect error message: "${deleteUserData.error || deleteUserData.message}"\n`);
      }
    } else if (deleteUserStatus === 200) {
      console.log('❌ TEST 1 FAILED: User with active orders was successfully deleted (Foreign Key Constraint bypass)!\n');
    } else {
      console.log(`❌ TEST 1 FAILED: Unexpected status code ${deleteUserStatus}\n`);
    }
  }

  // ==========================================================================
  // TEST 2: API Self-Deletion Bypass
  // Verify that sending a direct DELETE to /api/admin/users/<admin_id> is blocked
  // Expected: 400/403 with "Không được phép tự xóa tài khoản đang đăng nhập!"
  // ==========================================================================
  console.log('--- TEST 2: API Self-Deletion Bypass ---');
  console.log(`Attempting to self-delete Admin account (ID: ${adminId})...`);
  const selfDeleteRes = await fetch(`${API_URL}/api/admin/users/${adminId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });

  const selfDeleteStatus = selfDeleteRes.status;
  const selfDeleteData = await selfDeleteRes.json();
  console.log(`DELETE response status: ${selfDeleteStatus}`);
  console.log('DELETE response body:', selfDeleteData);

  if (selfDeleteStatus === 400 || selfDeleteStatus === 403) {
    if (selfDeleteData.error === 'Không được phép tự xóa tài khoản đang đăng nhập!') {
      console.log('✅ TEST 2 PASSED: Admin self-deletion is blocked with correct Vietnamese error message.\n');
    } else {
      console.log(`❌ TEST 2 FAILED: Returned status ${selfDeleteStatus} but incorrect error message: "${selfDeleteData.error || selfDeleteData.message}"\n`);
    }
  } else if (selfDeleteStatus === 200) {
    console.log('❌ TEST 2 FAILED: Admin self-deleted successfully (Self-Deletion Bypass)!\n');
  } else {
    console.log(`❌ TEST 2 FAILED: Unexpected status code ${selfDeleteStatus}\n`);
  }

  // ==========================================================================
  // TEST 3: Concurrency (Race Conditions)
  // Verify that if two Admins attempt to delete the same User X simultaneously,
  // the second request is handled gracefully, returning 404 or 400.
  // Expected: Second request returns 404/400 with a friendly Vietnamese error.
  // ==========================================================================
  console.log('--- TEST 3: Concurrency (Race Conditions) ---');
  console.log('Creating a temporary user for concurrency test...');
  const tempRegRes = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Temp User For Concurrency',
      email: 'concurrency_temp@eshop.com',
      password: 'TempPassword123!'
    })
  });

  if (!tempRegRes.ok) {
    console.error('Failed to create temporary user for concurrency test:', tempRegRes.statusText);
    console.log('❌ TEST 3 BLOCKED: Cannot create temporary user.\n');
  } else {
    const tempRegData = await tempRegRes.json();
    const tempUserId = tempRegData.id;
    console.log(`Temporary user created. ID: ${tempUserId}`);

    console.log(`Sending two parallel DELETE requests for user ID: ${tempUserId}...`);
    
    // Execute both deletes concurrently
    const deletePromise1 = fetch(`${API_URL}/api/admin/users/${tempUserId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const deletePromise2 = fetch(`${API_URL}/api/admin/users/${tempUserId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });

    const [res1, res2] = await Promise.all([deletePromise1, deletePromise2]);
    
    const status1 = res1.status;
    const status2 = res2.status;
    const data1 = await res1.json();
    const data2 = await res2.json();

    console.log(`Request 1 Status: ${status1}, Body:`, data1);
    console.log(`Request 2 Status: ${status2}, Body:`, data2);

    // Identify which one was first (succeeded) and which was second (failed)
    let firstRes, secondRes, firstStatus, secondStatus, firstData, secondData;
    if (status1 === 200 && status2 !== 200) {
      firstStatus = status1; firstData = data1;
      secondStatus = status2; secondData = data2;
    } else if (status2 === 200 && status1 !== 200) {
      firstStatus = status2; firstData = data2;
      secondStatus = status1; secondData = data1;
    } else {
      firstStatus = status1; firstData = data1;
      secondStatus = status2; secondData = data2;
    }

    if (firstStatus === 200 && (secondStatus === 404 || secondStatus === 400)) {
      if (secondData.error === 'Người dùng không tồn tại hoặc đã bị xóa trước đó!') {
        console.log('✅ TEST 3 PASSED: Second delete request handled gracefully, returning 404/400 with friendly Vietnamese error.\n');
      } else {
        console.log(`❌ TEST 3 FAILED: Second request returned status ${secondStatus} but incorrect error message: "${secondData.error || secondData.message}"\n`);
      }
    } else if (status1 === 200 && status2 === 200) {
      console.log('❌ TEST 3 FAILED: Both parallel delete requests returned 200 OK (no concurrency handling, second request did not notice the user was already deleted)!\n');
    } else {
      console.log(`❌ TEST 3 FAILED: Unexpected statuses: Request 1: ${status1}, Request 2: ${status2}\n`);
    }
  }

  console.log('=== API & SECURITY TEST RUN COMPLETED ===');
}

runTests().catch(err => {
  console.error('Test run crashed:', err);
});
