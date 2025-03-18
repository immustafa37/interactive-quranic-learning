document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const resultBox = document.getElementById("result");
    const toggleDarkMode = document.getElementById("toggle-dark-mode");

    // Load JSON Data
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
                <p><strong>🌎 Translation (English):</strong> ${found.translation_english}</p>
                <p><strong>🌍 ترجمہ (اردو):</strong> ${found.translation_urdu}</p>
                <p><strong>📚 Tafseer:</strong> ${found.tafseer}</p>
                <p>Click on any Arabic word to see its root structure.</p>
                <p>${highlightArabicWords(found.ayah)}</p>
                <p><strong>🔍 Similar Ayahs:</strong> ${suggestSimilarAyahs(query, data)}</p>
            `;
        
            attachClickEvents();
            saveSearchHistory(query);

        }
    }

    // Highlight Arabic words
    function highlightArabicWords(text) {
        return text.split(" ").map(word => `<span class='arabic-word'>${word}</span>`).join(" ");
    }

    // Attach click events to Arabic words
    function attachClickEvents() {
        document.querySelectorAll(".arabic-word").forEach(word => {
            word.addEventListener("click", () => {
                alert(`Root structure of: ${word.innerText}`);
            });
        });
    }

    // Suggest similar Ayahs
    function suggestSimilarAyahs(query, data) {
        const suggestions = data.filter(item => item.ayah.includes(query)).slice(0, 3);
        return suggestions.length > 0 
            ? suggestions.map(s => `<p>${s.ayah}</p>`).join(" ")
            : "No similar Ayahs found.";
    }

    // Save search history in LocalStorage
    function saveSearchHistory(query) {
        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (!history.includes(query)) {
            history.push(query);
            localStorage.setItem("searchHistory", JSON.stringify(history));
        }
    }

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Search Button Event
    searchButton.addEventListener("click", searchAyah);

    // Enter Key Event
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchAyah();
        }
    });
});