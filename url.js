document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const result = document.querySelector(".input-container");
    const shortenedLinkContainer = document.createElement("div"); // Create a container for the shortened link
    shortenedLinkContainer.classList.add("shortened-link-container");
    const serviceSection = document.querySelector(".services"); // Get the "Advanced Statistics" section

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const url = input.value;
        await shortenUrl(url);
    });

    async function shortenUrl(url) {
        try {
            const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
            const data = await res.json();
            if (data.ok) {
                const newUrl = document.createElement("div");
                newUrl.classList.add("result");
                newUrl.innerHTML = `
                    <p>Shortened URL: <a href="${data.result.full_short_link}" target="_blank">${data.result.full_short_link}</a></p>
                    <button class="newUrl-btn">Copy</button>
                `;
                shortenedLinkContainer.innerHTML = ''; // Clear any previous content
                shortenedLinkContainer.appendChild(newUrl); // Add the shortened link to the container
                result.insertAdjacentElement('afterend', shortenedLinkContainer); // Insert the container just below the input container
                const copyBtn = newUrl.querySelector(".newUrl-btn");
                copyBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(data.result.full_short_link);
                    copyBtn.textContent = "Copied!";
                });
                input.value = "";
            } else {
                console.error("Shortening failed:", data.error);
            }
        } catch (err) {
            console.error("An error occurred:", err);
        }
    }
});
