// DOM Elements
const UI = {
    init() {
        this.header = document.querySelector('.header');
        this.menuBtn = document.querySelector('.menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.contactForm = document.querySelector('.contact-form');
        this.navLinksItems = document.querySelectorAll('.nav-link');
        this.typingText = document.querySelector('.typing-text');
        this.skillLevels = document.querySelectorAll('.progress');
        this.projectFilters = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.tiltElements = document.querySelectorAll('[data-tilt]');
    }
};

// State Management
const State = {
    lastScroll: 0,
    isMenuOpen: false,
    isMobile: () => window.innerWidth <= 768
};

// Navigation Handling
const Navigation = {
    init() {
        this.setupScrollHandler();
        this.setupMobileMenu();
        this.setupNavLinks();
    },

    setupScrollHandler() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                UI.header.classList.remove('scroll-up');
            }
            
            if (currentScroll > State.lastScroll && !UI.header.classList.contains('scroll-down')) {
                UI.header.classList.remove('scroll-up');
                UI.header.classList.add('scroll-down');
            }
            
            if (currentScroll < State.lastScroll && UI.header.classList.contains('scroll-down')) {
                UI.header.classList.remove('scroll-down');
                UI.header.classList.add('scroll-up');
            }
            
            State.lastScroll = currentScroll;
        });
    },    setupMobileMenu() {
        if (UI.menuBtn) {
            UI.menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                State.isMenuOpen = !State.isMenuOpen;
                UI.navLinks.classList.toggle('active');
                UI.menuBtn.classList.toggle('open');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (State.isMenuOpen && !e.target.closest('.navbar')) {
                    State.isMenuOpen = false;
                    UI.navLinks.classList.remove('active');
                    UI.menuBtn.classList.remove('open');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && State.isMenuOpen) {
                    State.isMenuOpen = false;
                    UI.navLinks.classList.remove('active');
                    UI.menuBtn.classList.remove('open');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    },

    setupNavLinks() {
        UI.navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (State.isMenuOpen) {
                    State.isMenuOpen = false;
                    UI.navLinks.classList.remove('active');
                    UI.menuBtn.classList.remove('open');
                }
            });
        });
    }
};

// Typing Animation
const TypingAnimation = {
    init() {
        if (UI.typingText) {
            const text = UI.typingText.getAttribute('data-text');
            this.startTyping(text);
        }
    },

    startTyping(text) {
        let isDeleting = false;
        let charIndex = 0;

        const type = () => {
            const currentText = text.substring(0, charIndex);
            UI.typingText.textContent = currentText;

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === text.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typeSpeed = 500;
            }

            charIndex += isDeleting ? -1 : 1;
            UI.typingText.innerHTML = currentText + ' <span class="wave">👋</span>';
            
            setTimeout(type, typeSpeed);
        };

        type();
    }
};

// Project Filtering
const ProjectFilter = {
    init() {
        UI.projectFilters.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    },

    filterProjects(filter) {
        UI.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 100);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    },

    updateActiveButton(activeButton) {
        UI.projectFilters.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
};

// Tilt Animation
const TiltAnimation = {
    init() {
        this.setupTilt();
        window.addEventListener('resize', () => this.handleResize());
    },

    setupTilt() {
        if (!State.isMobile()) {
            UI.tiltElements.forEach(element => {
                if (!element.vanillaTilt) {
                    VanillaTilt.init(element, {
                        max: 10,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.3
                    });
                }
            });
        }
    },

    handleResize() {
        if (State.isMobile()) {
            this.destroyTilt();
        } else {
            this.setupTilt();
        }
    },

    destroyTilt() {
        UI.tiltElements.forEach(element => {
            if (element.vanillaTilt) {
                element.vanillaTilt.destroy();
            }
        });
    }
};

// Form Handling
const FormHandler = {
    init() {
        if (UI.contactForm) {
            UI.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle form submission
                alert('Thank you for your message! I will get back to you soon.');
                UI.contactForm.reset();
            });
        }
    }
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    Navigation.init();
    TypingAnimation.init();
    ProjectFilter.init();
    TiltAnimation.init();
    FormHandler.init();
});
