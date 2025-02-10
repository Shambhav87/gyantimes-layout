//Current Date Display
document.addEventListener('DOMContentLoaded', function () {
    const currentDateElements = document.querySelectorAll('.current-date');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    currentDateElements.forEach(element => {
        element.textContent = formattedDate;
    });
});

//Hamburger Menu 

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        // Toggle the 'active' class on the navigation links
        navLinks.classList.toggle('active');
        
        // Check if the menu is open
        const isMenuOpen = navLinks.classList.contains('active');
        
        // Update the 'aria-expanded' attribute for accessibility
        hamburger.setAttribute('aria-expanded', isMenuOpen);

        // Change the hamburger icon to 'X' when the menu is open, and back to bars when closed
        if (isMenuOpen) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>'; // Close icon (X)
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>'; // Open icon (bars)
        }
    });
});

//Close Mobile Menu When a Link is Clicked  

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    navLinks.addEventListener('click', function (event) {
        // Check if the clicked element is an anchor tag (link)
        if (event.target.tagName === 'A') {
            // Remove the 'active' class to close the menu
            navLinks.classList.remove('active');
            
            // Update the 'aria-expanded' attribute to false
            hamburger.setAttribute('aria-expanded', false);
            
            // Reset the hamburger icon to bars
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

//Search Functionality
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById('search-results');
                resultsContainer.innerHTML = '';
                if (data.length > 0) {
                    data.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.textContent = item.title;
                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    resultsContainer.textContent = 'No results found.';
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter something to search.');
    }
});

document.getElementById('search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
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

// Initially hide the button
backToTop.style.display = "none";

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.style.display = "flex"; // Show the button
    } else {
        backToTop.style.display = "none"; // Hide the button
    }
};

backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


    // Share Button
    const shareFloatingButton = document.getElementById('sharefloatingButton');
    const shareOptions = document.getElementById('shareOptions');

    shareFloatingButton.addEventListener('click', function (event) {
        event.stopPropagation();
        shareOptions.classList.toggle('show');
    });

    // Chat Button
    const chatFloatingButton = document.getElementById('chatfloating-Button');
    const chatOptions = document.getElementById('chatOptions');
    
    // Toggle chat options on button click
    chatFloatingButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up
        const isOpen = chatOptions.classList.toggle('show'); // Toggle the dropdown
        chatFloatingButton.setAttribute('aria-expanded', isOpen); // Update aria-expanded
    });
    
    // Close chat options when clicking outside
    document.addEventListener('click', function (event) {
        if (!chatFloatingButton.contains(event.target) && !chatOptions.contains(event.target)) {
            chatOptions.classList.remove('show'); // Hide the dropdown
            chatFloatingButton.setAttribute('aria-expanded', 'false'); // Update aria-expanded
        }
    });
    
    // Prevent chat options from closing when interacting with the dropdown
    chatOptions.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent clicks inside the dropdown from closing it
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