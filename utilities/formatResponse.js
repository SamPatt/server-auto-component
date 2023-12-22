function formatValidResponse(aiResponse) {
    // Remove markdown code fences if present
    let cleanedResponse = aiResponse.replace(/```js/g, '').replace(/```/g, '');

    // Find the first valid opening JSX tag, ignoring React fragments
    const firstValidTagStart = cleanedResponse.search(/<([a-z]+[a-z0-9-]*)([^>]*)>/i);

    if (firstValidTagStart === -1) {
        return "Code not valid"; // No valid opening tag found
    }

    // Remove everything before the first valid opening tag
    cleanedResponse = cleanedResponse.substring(firstValidTagStart);

    // Remove closing React fragment if present
    cleanedResponse = cleanedResponse.replace(/<\/>$/g, '');

    return cleanedResponse;
}

module.exports = {
    formatValidResponse
};
