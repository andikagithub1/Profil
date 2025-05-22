// Interactive Navbar
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    }
    
    if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = typingText.getAttribute('data-text');
    typingText.innerHTML = '';
    let i = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        if (isDeleting) {
            currentText = text.substring(0, --i);
        } else {
            currentText = text.substring(0, ++i);
        }

        typingText.textContent = currentText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && i === text.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            typeSpeed = 500; // Pause before starting again
        }

        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.innerHTML = '|';
        typingText.innerHTML = currentText + ' <span class="wave">👋</span>';
        
        setTimeout(type, typeSpeed);
    }

    type();
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Skill Progress Animation
const skillLevels = document.querySelectorAll('.progress');

function animateSkills() {
    skillLevels.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        skill.style.width = percent + '%';
    });
}

// Animate skills when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
});

observer.observe(document.querySelector('.skills'));

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll-based Animation
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Enhanced skill cards animation
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            // Get card category
            const category = card.getAttribute('data-category');
            
            // First set opacity to 0
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                // Show/hide based on filter
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Use timeout to create animation effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Resume Download
document.getElementById('downloadResume').addEventListener('click', (e) => {
    e.preventDefault();
    // Add your resume download logic here
    alert('Resume download feature will be implemented soon!');
});

// Enhanced Vanilla Tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const distance = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (distance > sectionTop - window.innerHeight && distance < sectionTop + sectionHeight) {
                const parallaxSpeed = 0.5;
                const yPos = -(distance - sectionTop) * parallaxSpeed;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
    
    // Parallax Cards Effect
    const cards = document.querySelectorAll('.parallax-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});
