console.log("Running words.js");

document.getElementById('word-frequency-button').addEventListener('click', function() {
    console.log("Button clicked");
    var leaderboard = document.getElementById('word-frequency-section');
    if (leaderboard.style.transform === "scaleY(0)" || leaderboard.style.transform === "") {
        console.log("Showing leaderboard");
        leaderboard.style.transform = "scaleY(1)";
        leaderboard.style.opacity = "1";
    } else {
        console.log("Hiding leaderboard");
        leaderboard.style.transform = "scaleY(0)";
        leaderboard.style.opacity = "0";
    }
});
