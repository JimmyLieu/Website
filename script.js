// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const form = document.getElementById("contactForm");
const submitMessage = document.getElementById("submitMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            form.reset();
            submitMessage.style.display = "block";
            submitMessage.style.color = "green";
            submitMessage.textContent = "Thanks for your message! I'll get back to you soon.";
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        submitMessage.style.display = "block";
        submitMessage.style.color = "red";
        submitMessage.textContent = "Oops! There was a problem sending your message. Please try again.";
    }
});

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';   
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Carousel functionality
const track = document.querySelector('.carousel-track');
let isPressed = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isPressed = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.parentElement.scrollLeft;
});

track.addEventListener('mouseleave', () => {
    isPressed = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isPressed = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isPressed) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    track.parentElement.scrollLeft = scrollLeft - walk;
});

// Add touch support for mobile devices
track.addEventListener('touchstart', (e) => {
    isPressed = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.parentElement.scrollLeft;
});

track.addEventListener('touchend', () => {
    isPressed = false;
});

track.addEventListener('touchmove', (e) => {
    if (!isPressed) return;
    e.preventDefault();
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.parentElement.scrollLeft = scrollLeft - walk;
});

// Initialize smooth scrolling behavior
track.parentElement.style.scrollBehavior = 'smooth';