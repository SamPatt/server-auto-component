const openAIRequest = require('../utilities/openAIRequest.js');

const index = async (req, res, next) => {
  try {
    openAIRequest.main();
    res.send("hello world");
    // .status(201)
    // .json(await Module.find({}))
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  index
};
