function formatValidResponse(aiResponse) {
    // Find the position of the first opening tag
    const firstTagStart = aiResponse.search(/<([a-z]+[a-z0-9-]*)([^>]*)>/i);

    // If no opening tag is found, return an empty string
    if (firstTagStart === -1) {
        return "";
    }

    // Find the position of the last closing tag by looking for the closing tag of the first opening tag
    let tagStack = [];
    let i = firstTagStart;
    while (i < aiResponse.length) {
        // Check for an opening tag
        if (aiResponse[i] === "<" && aiResponse[i+1] !== "/") {
            let tagEnd = aiResponse.indexOf(">", i);
            if (tagEnd === -1) break; // No closing '>', invalid HTML
            tagStack.push(aiResponse.substring(i, tagEnd + 1));
            i = tagEnd;
        } else if (aiResponse[i] === "<" && aiResponse[i+1] === "/") { // Closing tag
            let tagEnd = aiResponse.indexOf(">", i);
            if (tagEnd === -1) break; // No closing '>', invalid HTML
            let lastTag = tagStack.pop();
            // If the stack is empty, we've found the closing tag of the first tag
            if (tagStack.length === 0) {
                return aiResponse.substring(firstTagStart, tagEnd + 1);
            }
            i = tagEnd;
        }
        i++;
    }

    return ""; // Return empty string if valid closing tag is not found
}

module.exports = {
    formatValidResponse
};
