const User = require("../models/User");

module.exports = {
  index,
  delete: deleteUser,
  saveComponent
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
      const user = await User.findById(req.user._id);
      res.status(200).json(user);


    } else {
      // Handle the case where the user is not authenticated
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function saveComponent(req, res) {
  try {
    const { userId, content, title } = req.body; // Assuming 'title' is part of the component data

    // Validate data (ensure userId and content are valid and not empty)
    if (!userId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the user by Google ID and update their components array
    const user = await User.findOne({ googleId: userId});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new component to the user's components array
    user.components.push({ title, content });

    // Save the updated user
    const saveResponse = await user.save();

    res.status(200).json({ message: "Component saved successfully", content: saveResponse });
  } catch (error) {
    console.error("Error saving component:", error);
    res.status(500).json({ error: error.message });
  }
}
