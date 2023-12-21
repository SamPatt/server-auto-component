const User = require("../models/User");

module.exports = {
  index,
  delete: deleteUser,
};

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.user._id)
  req.logout(function() {
    res.redirect('/')
  })
}

async function index(req, res) {
  try {
    if (req.isAuthenticated()) {
      // Get user data from req.user
      const userData = {
        id: req.user.id,
        username: req.user.username,
        // Include other user data as needed
      };

      // Redirect to the frontend route with user data as query parameters
      res.redirect(`/user?userData=${encodeURIComponent(JSON.stringify(userData))}`);
    } else {
      // Handle the case where the user is not authenticated
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}