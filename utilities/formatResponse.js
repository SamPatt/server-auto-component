function formatValidResponse(aiResponse) {
    // Find the first opening and last closing div tags
    const startDiv = aiResponse.indexOf("<div");
    const endDiv = aiResponse.lastIndexOf("</div>") + 6; // 6 characters to include '</div>'

    // Extract the valid part of the response
    const validResponse = startDiv >= 0 && endDiv >= 0 ? aiResponse.slice(startDiv, endDiv) : "";

    return validResponse;
}

module.exports = {
    formatValidResponse
};
