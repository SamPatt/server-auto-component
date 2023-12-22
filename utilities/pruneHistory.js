function pruneHistory(history) {
    // Check if history has enough messages to prune
    if (history.length <= 7) {
        return history; // No pruning needed if 7 or fewer messages
    }

    // Always keep the first three messages (system, first user, first assistant)
    const essentialHistory = history.slice(0, 3);

    // Keep the last three pairs of user-assistant messages
    const recentHistory = history.slice(-6); // Each pair has 2 messages, so 3 pairs = 6 messages

    // Combine the essential and recent histories
    return [...essentialHistory, ...recentHistory];
}

module.exports = {
    pruneHistory
}