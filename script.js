// Mobile Navigation
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const navList = document.querySelector('.nav-list');

mobileMenuIcon.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenuIcon.innerHTML = navList.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-up');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .about-text, .service-card').forEach(el => {
    el.classList.add('animate-up'); // Add class but it needs opacity 0 in CSS, wait, I defined animate-up with animation.
    // Actually, I should use a class like 'hidden' then add 'show'.
    // Or just re-trigger the animation by adding the class.

    // Better approach:
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';

    observer.observe(el);
});

// Update observer to actually modify styles
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .about-text, .service-card').forEach(el => {
    fadeObserver.observe(el);
});

// Theme Switcher Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);

    if (currentTheme === 'light-mode') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
}

// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
});
