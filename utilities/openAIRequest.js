const OpenAI = require("openai")

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const { formatValidResponse } = require('./formatResponse.js');

async function aiRequest(conversationHistory, userRequest, baseHtml) {
    const baseRequest = {
        Task: `Create an element/component to replace the pre element with id 'auto-component'. Your returned code will be placed within a React component's return() statement. Follow the guidelines EXTREMELY STRICTLY`,
        Requirement: `Find the pre element with id 'auto-component' in the baseHtml and provide ONLY the element that fits within its place`,
        Guidelines: [
            `ONLY respond with the CODE you create. Do not provide any additional details or notes about your code, decision making, final product, etc., before OR after the code statement.`,
            `ONLY respond with code that belongs inside the React fragment.`,
            `Do not include anything other than the necessary elements. This means NO comments, NO opening/closing text explaining the element, etc.`,
            `NEVER include top-level elements like root or App. All elements should fit within the jsx fragments.`,
            `Ensure seamless integration into the existing code and only use react-based styling, i.e., style={{display:'flex'}}.`,
            `If using colors, guarantee visibility of font colors with selected background colors.`,
            `In case of inability to meet constraints or need to provide data that does not fit within the return() statement, ALWAYS respond with an error message.`,
            `ALWAYS Adhere STRICTLY to the provided guidelines and constraints.`,
        ],
    };

    // Add base request as a system message only if it's a new conversation
    if (conversationHistory.length === 0) {
        let systemMessageContent = `Task: ${baseRequest.Task}\nRequirement: ${baseRequest.Requirement}\nGuidelines: ${baseRequest.Guidelines.join('\n')}`;
        conversationHistory.push({ role: "system", content: systemMessageContent });
    }

    // Construct the user prompt including userRequest and baseHtml
    let userPrompt = `User Request: ${userRequest}\nHTML Context: ${baseHtml}`;
    
    // Append the new user request to the conversation history
    conversationHistory.push({ role: "user", content: userPrompt });

    const completion = await openai.chat.completions.create({
        messages: conversationHistory,
        model: "gpt-3.5-turbo",
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