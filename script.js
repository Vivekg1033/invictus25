document.addEventListener("DOMContentLoaded", function () {
    const preloaderText = document.getElementById("preloader-text");
    const subText = document.querySelector(".hero-subtext");
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    // Letter-by-letter animation with slight speed increase
    function animateText(element, delay = 0) {
        const text = element.textContent;
        element.textContent = "";
        element.style.opacity = "1";

        text.split("").forEach((char, index) => {
            setTimeout(() => {
                element.textContent += char;
            }, index * 80 + delay);
        });
    }

    animateText(preloaderText);
    
    setTimeout(() => {
        subText.style.opacity = "1";
        gsap.from(subText, { y: 20, opacity: 0, duration: 0.8 });
    }, 1500);

    // Ensure main content is visible before preloader fades out
    mainContent.style.display = "block";
    mainContent.style.opacity = "0";

    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                preloader.style.display = "none";
                gsap.to(mainContent, { opacity: 1, duration: 1.2 });
                gsap.to(".navbar", { y: 0, duration: 1, ease: "power2.out" });
            }
        });
    }, 3000);

    // Image Slider Auto Scroll & Navigation
    const slider = document.querySelector(".slider");
    const images = document.querySelectorAll(".slider img");
    let index = 0;
    const totalImages = images.length;
    const imageWidth = images[0].clientWidth; // Ensure correct width calculation

    function moveSlider(forward = true) {
        index = forward ? index + 1 : index - 1;

        if (index >= totalImages) {
            gsap.set(slider, { x: 0 });
            index = 1;
        } else if (index < 0) {
            index = totalImages - 1;
        }

        gsap.to(slider, { x: -index * imageWidth, duration: 1, ease: "power2.inOut" });
    }

    let autoPlay = setInterval(() => moveSlider(true), 3000);

    document.querySelector(".next-btn").addEventListener("click", () => {
        clearInterval(autoPlay);
        moveSlider(true);
        autoPlay = setInterval(() => moveSlider(true), 3000);
    });

    document.querySelector(".prev-btn").addEventListener("click", () => {
        clearInterval(autoPlay);
        moveSlider(false);
        autoPlay = setInterval(() => moveSlider(true), 3000);
    });

    // Tabs Navigation
    const tabs = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(tc => tc.classList.remove("active"));

            const tabId = tab.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
            tab.classList.add("active");
        });
    });
});
