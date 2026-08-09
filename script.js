const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});

const texts = [
  'Java Full Stack Developer',
  'Game Developer',
  'Web Designer',
  'Unreal Engine Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById('typing');

function typeEffect(){
  const current = texts[textIndex];

  if(!isDeleting){
    typingElement.textContent = current.substring(0, charIndex++);
  }else{
    typingElement.textContent = current.substring(0, charIndex--);
  }

  let speed = isDeleting ? 60 : 120;

  if(!isDeleting && charIndex === current.length + 1){
    speed = 1400;
    isDeleting = true;
  }else if(isDeleting && charIndex === 0){
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const reveals = document.querySelectorAll('section, .skill-card, .project-card, .stat-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{ threshold:0.15 });

reveals.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

const topBtn = document.querySelector('.top-btn');

window.addEventListener('scroll', () => {
  if(window.scrollY > 400){
    topBtn.style.display = 'flex';
  }else{
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
});

const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
    cursor.style.background = 'rgba(255,46,46,.15)';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'transparent';
  });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.clientHeight;

    if(window.scrollY >= sectionTop){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }
  });
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  form.reset();
});
