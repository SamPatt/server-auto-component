const OpenAI = require("openai")

const openai = new OpenAI(process.env.OPENAI_API_KEY);


async function aiRequest(request, html) {
    let prompt = `Generate a React component based on the following description and HTML context: ${request}. Context: ${html}`;
  
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
    return completion.choices[0];
  }
  

module.exports = {
    aiRequest,
    };