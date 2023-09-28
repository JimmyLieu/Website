// nav toggle
let links = document.querySelectorAll(".links");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// toggle navbar in mobile view
const toggleBtn = document.querySelector(".toggle-btn");
const ul = document.querySelector(".nav-links-container");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  ul.classList.toggle("active");
});


const aboutMe = () => {
  const github = document.getElementById('github');
  const linkedin = document.getElementById('linkedin');
  const info = document.getElementById('info');
  github.href = 'https://github.com/JimmyLieu';
  linkedin.href = 'https://www.linkedin.com/in/LieuJimmy/';
  info.innerHTML = `I am a Computer Science student at the University of Texas at Tyler. 
  Throughtout my experience in college, I've developed a passion for web and 
  mobile app development. Throughout this website, you will find my personal projects and 
  related skills. I hope you enjoy.
`;
}

const skills = () => {
  const skills = ['HTML', 'CSS', 'TailwindCSS', 'Javascript', 'Python', 'Dart', 'Shell', 'ReactJS', 'Flutter'];
  const skillsDiv = document.getElementById('skills');
  skills.forEach((skill)=> skillsDiv.innerHTML += `<p class="skill-name">${skill}</p>`)
}

aboutMe()
skills()