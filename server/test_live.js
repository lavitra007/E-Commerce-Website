// Test the LIVE Render backend registration with admin secret
const testEmail = `test_admin_${Date.now()}@test.com`;

fetch('https://farout-luxuries-backend.onrender.com/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Admin',
    email: testEmail,
    password: 'test123456',
    adminSecret: 'LUXE_MaheSH_Admin'
  })
})
.then(res => res.json())
.then(data => {
  console.log('\n=== LIVE API RESPONSE ===');
  console.log(JSON.stringify(data, null, 2));
  console.log(`\nRole returned: ${data.role}`);
  if (data.role === 'admin') {
    console.log('✅ Admin role is working on live!');
  } else {
    console.log('❌ STILL returning user role - env var not set on Render');
  }
})
.catch(err => console.error('Error:', err.message));
