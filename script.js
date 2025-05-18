// script.js

// --- Event Handling ---

// Button click to change header text
const changeTextButton = document.getElementById('changeTextButton');
const mainHeading = document.querySelector('header p');

changeTextButton.addEventListener('click', () => {
    if (mainHeading.textContent === "ADVANCED INTERACTIVE PLAYGROUND") {
        mainHeading.textContent = "Animations & Storage Activated!";
    } else {
        mainHeading.textContent = "ADVANCED INTERACTIVE PLAYGROUND";
    }
});

// Hover effects on navigation links (with CSS transition)
const navLinks = document.querySelectorAll('nav .tab-button');

// Tabs functionality
const tabButtons = document.querySelectorAll('.tab-container .tab-button');
const sections = document.querySelectorAll('main > section');

tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const sectionId = event.target.dataset.sectionId;
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
        tabButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    });
});

// Set 'Home' tab as active on load
document.addEventListener('DOMContentLoaded', () => {
    const homeTab = document.querySelector('.tab-container .tab-button[data-section-id="home"]');
    const homeSection = document.getElementById('home');
    if (homeTab && homeSection) {
        homeTab.classList.add('active');
        homeSection.style.display = 'block';
    }

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeButtonText();
});

// --- CSS Animations Triggered by JavaScript ---
const animateMeButton = document.getElementById('animateMeButton');
const animatedImage = document.querySelector('#home .animated-image');

animateMeButton.addEventListener('click', () => {
    animatedImage.classList.toggle('animate-shake'); // Toggle a CSS class for animation
    if (animatedImage.classList.contains('animate-shake')) {
        animateMeButton.textContent = 'Stop Shake';
    } else {
        animateMeButton.textContent = 'Animate Me!';
    }
});

// Define the shake animation class dynamically via JavaScript (can also be in CSS)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    .animate-shake {
        animation: shake 0.5s infinite alternate;
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(styleSheet);

// --- Local Storage for User Preferences (Theme) ---
const themeToggleButton = document.getElementById('themeToggleButton');
const preferenceStatus = document.getElementById('preferenceStatus');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeButtonText();
    preferenceStatus.textContent = `Theme preference saved: ${currentTheme}`;
});

function updateThemeButtonText() {
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = 'Toggle Light Mode';
    } else {
        themeToggleButton.textContent = 'Toggle Dark Mode';
    }
}

// --- Form Validation (unchanged from previous) ---
const registrationForm = document.getElementById('registrationForm');
const fnameInput = document.getElementById('fname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formMessage = document.getElementById('formMessage');
const errorMessages = document.querySelectorAll('.error-message');

if (registrationForm) { // Check if the form exists on the page
    registrationForm.addEventListener('submit', (event) => {
        let isValid = true;
        errorMessages.forEach(msg => msg.textContent = '');
        formMessage.style.display = 'none';

        if (fnameInput.value.trim() === '') {
            document.getElementById('fnameError').textContent = 'Full name is required.';
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Invalid email format.';
                isValid = false;
            }
        }

        if (passwordInput.value.length < 8) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
            isValid = false;
        }

        if (document.getElementById('terms') && !document.getElementById('terms').checked) {
            document.getElementById('termsError').textContent = 'You must agree to the terms and conditions.';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            formMessage.textContent = 'Registration successful!';
            formMessage.style.display = 'block';
            // In a real application, you would submit the form data here
            console.log('Form submitted successfully!');
        }
    });
}