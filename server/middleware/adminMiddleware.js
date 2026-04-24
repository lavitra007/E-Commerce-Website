const admin = (req, res, next) => {
  // Super Admin Whitelist - Hassle-free and secure
  const adminEmails = ['monika1@gmail.com', 'monika@gmail.com']; 
  
  if (req.user && (req.user.role === 'admin' || adminEmails.includes(req.user.email))) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { admin };
