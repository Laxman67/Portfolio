export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode) // Status Code
    .cookie('token', token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      httpOnly: true, // Prevents client-side access
      // Theses Two Lines are mandatory if you're planning to render on third party hpsting like render
      secure: process.env.NODE_ENV === 'production', //Only use HTTPS in production
      sameSite: 'none', // Allows cross-site requests if needed✅
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

// Update due to some problems
