document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const inputs = document.querySelectorAll(".input-field");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                showError(input, "This field is required");
                isValid = false;
            } else {
                clearError(input);
            }
        });
        
        const email = document.getElementById("email");
        if (!validateEmail(email.value)) {
            showError(email, "Invalid email format");
            isValid = false;
        }
        
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters");
            isValid = false;
        }
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match");
            isValid = false;
        }
        
        if (isValid) {
            alert("Signup successful!");
            form.reset();
        }
    });
    
    function showError(input, message) {
        const errorText = input.nextElementSibling;
        errorText.textContent = message;
        errorText.style.display = "block";
    }
    
    function clearError(input) {
        const errorText = input.nextElementSibling;
        errorText.textContent = "";
        errorText.style.display = "none";
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Smooth transition for form appearance
    gsap.from(".signup-container", { y: 50, opacity: 0, duration: 1, ease: "power2.out" });
    gsap.to(".navbar", { y: 0, duration: 1, ease: "power2.out" });
});
