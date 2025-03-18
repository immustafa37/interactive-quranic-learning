document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const resultBox = document.getElementById("result");

    // JSON data load karna
    async function loadData() {
        try {
            const response = await fetch("data.json");
            return await response.json();
        } catch (error) {
            console.error("Error loading JSON data:", error);
            return [];
        }
    }

    // Search function
    async function searchAyah() {
        const query = searchInput.value.trim();
        if (query === "") {
            resultBox.innerHTML = "<p class='placeholder'>Please enter an Ayah or word.</p>";
            return;
        }

        const data = await loadData();
        const found = data.find(item => item.ayah.includes(query));

        if (found) {
            resultBox.innerHTML = `
                <p><strong>📖 Ayah:</strong> ${found.ayah}</p>
                <p><strong>🌎 Translation:</strong> ${found.translation}</p>
                <p><strong>📚 Tafseer:</strong> ${found.tafseer}</p>
            `;
        } else {
            resultBox.innerHTML = "<p class='placeholder'>No results found.</p>";
        }
    }

    // Button event listener
    searchButton.addEventListener("click", searchAyah);
});