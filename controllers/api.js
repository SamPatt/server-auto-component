const openAIRequest = require('../utilities/openAIRequest.js');
const { pruneHistory } = require('../utilities/pruneHistory.js');

// In-memory storage for conversation history
let conversationHistories = {};

const apiResponse = async (req, res, next) => {
  try {
    // Extract userId, request, and html from the request body
    const { userId, request, html } = req.body;

    // Validate userId
    if (!userId) {
      throw new Error("UserId is required");
    }

    // Retrieve existing conversation history, or start a new one
    let history = conversationHistories[userId] || [];

    // Call the OpenAI API with the extracted parameters
    const updatedHistory = await openAIRequest.aiRequest(history, request, html);

    // Store the updated history
    conversationHistories[userId] = pruneHistory(updatedHistory);

    // Return the latest response in the history
    const latestResponse = updatedHistory[updatedHistory.length - 1];

    res.status(200).json({ response: latestResponse, history: updatedHistory });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getResponse = async (req, res, next) => {
  try {


    res.status(200).json({ response: "Use POST" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  apiResponse,
  getResponse
};
