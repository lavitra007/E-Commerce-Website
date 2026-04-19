fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test',
    email: 'test2@test.com',
    password: 'password'
  })
}).then(res => res.json()).then(console.log).catch(console.error);
