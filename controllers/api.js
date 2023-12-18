const openAIRequest = require('../utilities/openAIRequest.js');

// const index = async (req, res, next) => {
//   try {
//     openAIRequest.main();
//     res.send("hello world");
//     // .status(201)
//     // .json(await Module.find({}))
//   } catch (err) {
//     res.status(400).json({ err: err.message });
//   }
// };

const apiResponse = async (req, res, next) => {
    try {
      // Extract text and html from the request body
      const { request, html } = req.body;
  
      // Call the OpenAI API with the extracted parameters
      const aiResponse = await openAIRequest.aiRequest(request, html);
      res.status(200).json(aiResponse);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
  

module.exports = {
//   index,
  apiResponse
};
