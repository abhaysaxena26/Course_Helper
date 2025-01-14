const jwt = require('jsonwebtoken');

// Make sure you import or define SECRET_KEY properly
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  // Extract the token from the "Bearer <token>" format
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'Token missing from Authorization header.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    
    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticate;