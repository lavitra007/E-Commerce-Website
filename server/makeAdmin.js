/**
 * One-time utility: Promote a user to admin by email.
 * Usage: node makeAdmin.js your@email.com
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node makeAdmin.js <email>');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`No user found with email: ${email}`);
      process.exit(1);
    }
    user.role = 'admin';
    await user.save();
    console.log(`✅ Success! "${user.name}" (${user.email}) is now an admin.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });
