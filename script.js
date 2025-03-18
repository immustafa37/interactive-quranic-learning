document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const resultBox = document.getElementById("result");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query === "") {
            resultBox.innerHTML = "<p class='placeholder'>Please enter an Ayah or word.</p>";
        } else {
            resultBox.innerHTML = `<p>🔎 Searching for: <strong>${query}</strong>...</p>`;
        }
    });
});
