async function loadLeaderboard() {
    try {
        const response = await fetch("https://eocquestfullstack.vercel.app/");
        const users = await response.json();

        const list = document.getElementById("leaderboard");

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.username} - ${user.ecoPoints} Points`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

loadLeaderboard();