// Current Date Display
document.addEventListener('DOMContentLoaded', function () {
    const currentDateElements = document.querySelectorAll('.current-date');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    currentDateElements.forEach(element => {
        element.textContent = formattedDate;
    });
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        const isMenuOpen = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        hamburger.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close Mobile Menu When a Link is Clicked
    navLinks.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');

    // Check localStorage for dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
};

backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Share Button Functionality
const shareFloatingButton = document.getElementById('sharefloatingButton');
const shareOptions = document.getElementById('shareOptions');

shareFloatingButton.addEventListener('click', function (event) {
    event.stopPropagation();
    shareOptions.classList.toggle('show');
});

// Chat Button Functionality
const chatFloatingButton = document.getElementById('chatfloating-Button');
const chatOptions = document.getElementById('chatOptions');

chatFloatingButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const isOpen = chatOptions.classList.toggle('show');
    chatFloatingButton.setAttribute('aria-expanded', isOpen);
});

// Close chat options when clicking outside
document.addEventListener('click', function (event) {
    if (!chatFloatingButton.contains(event.target) && !chatOptions.contains(event.target)) {
        chatOptions.classList.remove('show');
        chatFloatingButton.setAttribute('aria-expanded', 'false');
    }
});

// Prevent chat options from closing when interacting with the dropdown
chatOptions.addEventListener('click', function (event) {
    event.stopPropagation();
});

// Share on WhatsApp
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
}

// Copy Link
function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
}
