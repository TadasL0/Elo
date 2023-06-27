function countWordFrequencies(text) {
    const stopwords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
    let words = text.toLowerCase().split(/\W+/);

    // Remove stop words
    words = words.filter(word => !stopwords.includes(word));

    const wordFrequencies = {};

    words.forEach(word => {
        if (word !== '') {
            if (wordFrequencies.hasOwnProperty(word)) {
                wordFrequencies[word]++;
            } else {
                wordFrequencies[word] = 1;
            }
        }
    });

    return wordFrequencies;
}


function updateLeaderboard(wordFrequencies) {
    // Get an array of entries ([word, count] pairs), and sort it by count
    const sortedWordFrequencies = Object.entries(wordFrequencies).sort((a, b) => b[1] - a[1]);

    // Just take the top 10
    const top10WordFrequencies = sortedWordFrequencies.slice(0, 10);

    // Get the leaderboard element and clear it
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    // Add each word to the leaderboard
    top10WordFrequencies.forEach(([word, count]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${word}: ${count}`;
        leaderboard.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('journal-entry').addEventListener('input', function() {
        const text = this.value;

        // call updateEntry() function
        updateEntry(text);

        const wordFrequencies = countWordFrequencies(text);
        updateLeaderboard(wordFrequencies);
    });
});
