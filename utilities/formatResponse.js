function formatValidResponse(aiResponse) {
    // Regular expression to match the first complete tag (excluding React fragments)
    const tagPattern = /<([a-z]+[a-z0-9-]*)([^>]*)>([\s\S]*?)<\/\1>/i;
    const match = aiResponse.match(tagPattern);

    if (match) {
        // Return the first complete tag with its content
        return match[0];
    }

    return ""; // Return empty string if no valid tag is found
}

module.exports = {
    formatValidResponse
};
