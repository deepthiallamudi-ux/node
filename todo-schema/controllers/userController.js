const userService = require('../services/userService');

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.signup(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
};

module.exports = {
  signup
};
