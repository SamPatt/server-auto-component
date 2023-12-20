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
    // const user = await User.create(req.body);
    // await user.save();

    res.send(req.user)

    // res.redirect("/profiles/new");
  } catch (err) {
    console.log(err);
  }
}