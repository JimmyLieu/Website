// Get the element you want to add margin/padding to
const terminalContainer = document.querySelector('.terminal-container');

// Set the margin and padding values
const marginValue = '10px';
const paddingValue = '20px';

// Apply margin and padding to the element
terminalContainer.style.margin = marginValue;
terminalContainer.style.padding = paddingValue;

const terminalText = `
Jimmy.origin 
    => "Tyler, TX"
Jimmy.education 
    => "University of Texas at Tyler"
Jimmy.major 
    => "Computer Science"
Jimmy.expectedGraduation 
    => "May 2024"
Jimmy.interests 
    => ["Code", "Technology", "Fashion", "Coffee", "Music", "Anime", "Food"]
Jimmy.projects
    => ["Portfolio Website", "Web App Project", "Open-source Contributions"]
Jimmy.languages
    => ["JavaScript", "HTML/CSS", "Java", "mySQL", "Flutter"}
Jimmy.certifications
    => Google IT Support Certification
    `;


let index = 0;
const terminalPre = document.querySelector('.terminal-container pre');

function typeTerminalText() {
  terminalPre.innerHTML += terminalText[index];
  index++;

  if (index >= terminalText.length) {
    clearInterval(typingInterval);
  }
}

const typingInterval = setInterval(typeTerminalText, 1);

// Underline sections
// Add an 'active' class to the navigation link of the current section
function setActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.top-bar nav ul li a');

  sections.forEach((section) => {
    const topOffset = section.offsetTop;
    const bottomOffset = topOffset + section.offsetHeight;

    if (window.pageYOffset >= topOffset && window.pageYOffset < bottomOffset) {
      const targetLink = document.querySelector(`a[href="#${section.id}"]`);
      navLinks.forEach((link) => link.classList.remove('active'));
      targetLink.classList.add('active');
    }
  });
}

// Listen for scroll events and update the active section accordingly
window.addEventListener('scroll', setActiveSection);

// Smooth scrolling
function scrollToSection(sectionId, offset) {
    const section = document.getElementById(sectionId);
    const navBarHeight = document.querySelector('.top-bar').offsetHeight;
    
    const sectionTop = section.offsetTop - navBarHeight - offset;
    
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
  }
  

// Call scrollToSection function when a navigation link is clicked
const navLinks = document.querySelectorAll('.top-bar nav ul li a');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    scrollToSection(sectionId);
  });
});
