const OpenAI = require("openai")
const { pruneHistory } = require('./pruneHistory.js')

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const { formatValidResponse } = require('./formatResponse.js');

async function aiRequest(conversationHistory, userRequest) {
    const baseRequest = {
        Task: `You are a coding assistant helping React developers. You are creating JSX code which fulfils the user request and fits inside a React component's return() statement. Follow the guidelines EXTREMELY STRICTLY`,
        Guidelines: [
            `ONLY respond with the CODE you create. NEVER use classnames or ids. Do not provide any additional details or notes about your code, decision making, final product, etc., before OR after the code statement.`,
            `ONLY respond with code that belongs inside the React fragment. NEVER include the fragment itself.`,
            `Do not include anything other than the necessary elements. This means NO comments, NO opening/closing text explaining the element, NO markdown, etc.`,
            `NEVER include top-level elements like root or App. All elements should fit within the jsx fragments.`,
            `Ensure seamless integration into the existing code and only use react-based styling, i.e., style={{display:'flex'}}.`,
            `If using colors, guarantee visibility of font colors with selected background colors.`,
            `ALWAYS return valid JXS code. NEVER return invalid code.`,
            `ALWAYS Adhere STRICTLY to the provided guidelines and constraints.`,
        ],
    };

    // Add base request as a system message only if it's a new conversation
    if (conversationHistory.length === 0) {
        let systemMessageContent = `Task: ${baseRequest.Task}\nGuidelines: ${baseRequest.Guidelines.join('\n')}`;
        conversationHistory.push({ role: "system", content: systemMessageContent });
    }

    // Construct the user prompt including userRequest and 
    let userPrompt = `User Request: ${userRequest}`;
    
    // Append the new user request to the conversation history
    conversationHistory.push({ role: "user", content: userPrompt });

    const historyToUse = pruneHistory(conversationHistory);

    const completion = await openai.chat.completions.create({
        messages: historyToUse,
        model: "gpt-3.5-turbo-1106",
        max_tokens: 500,
    });

    // Format the AI response to be valid
    const rawAiResponse = completion.choices[0].message;
    console.log("Raw AI Response: ", rawAiResponse);
    const validAiResponse = formatValidResponse(rawAiResponse.content);

    // Append the formatted response to the conversation history
    conversationHistory.push({ role: "assistant", content: validAiResponse });

    return conversationHistory;
}


module.exports = {
    aiRequest,
    };