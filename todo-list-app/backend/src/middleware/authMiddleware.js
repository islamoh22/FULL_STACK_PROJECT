const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Ensure this path is correct

module.exports = async (req, res, next) => {
  // Retrieve the Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    req.user = await User.findById(decoded.id);

    // If user is not found, respond with an error
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Respond with an error if the token is invalid
    res.status(401).json({ message: 'Token is not valid' });
  }
};

