// snowfall.js

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".snow-container");

    for (let i = 0; i < 50; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        container.appendChild(snowflake);

        const animationDuration = Math.random() * 3 + 2; // Between 2 and 5 seconds
        const delay = Math.random() * 2; // Between 0 and 2 seconds

        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = animationDuration + "s";
        snowflake.style.animationDelay = -delay + "s";

        snowflake.addEventListener("animationiteration", () => {
            snowflake.style.left = Math.random() * 100 + "vw";
        });
    }
});
