require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find({}, 'name email role createdAt').sort({ createdAt: -1 });
    console.log('\n=== ALL USERS IN DATABASE ===');
    users.forEach(u => console.log(`  [${u.role.toUpperCase()}] ${u.name} — ${u.email}`));
    console.log('==============================\n');
    process.exit(0);
  })
  .catch(err => { console.error(err.message); process.exit(1); });
