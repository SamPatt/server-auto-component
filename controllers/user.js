const User = require("../models/User");

module.exports = {
  create,
  delete: deleteUser,
};

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.user._id)
  req.logout(function() {
    res.redirect('/')
  })
}

async function create(req, res) {
  try {
    // const user = await User.create(req.body);
    // await user.save();

    console.log(req.body)
    // res.redirect("/profiles/new");
  } catch (err) {
    console.log(err);
  }
}