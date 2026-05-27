// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        // Note: In a real application, you would send the form data to a server
        console.log('Form submitted with data:', {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelectorAll('input[type="text"]')[1].value,
            message: this.querySelector('textarea').value
        });
    });
}

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'slideInLeft 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and stat cards
document.querySelectorAll('.project-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.dataset.animation = 'slideInLeft 0.8s ease forwards';
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

// Add subtle mouse movement effect to floating cube
const floatingCube = document.querySelector('.floating-cube');
if (floatingCube) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingCube.style.transform = `
            rotateX(${mouseY * 20}deg) 
            rotateY(${mouseX * 20}deg)
            rotateZ(${mouseX * 10}deg)
        `;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        floatingCube.style.transform = 'rotateX(0) rotateY(0) rotateZ(0)';
    });
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillBars.forEach(bar => {
                bar.style.animation = 'fillProgress 1.5s ease-out forwards';
            });
            skillsAnimated = true;
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Cursor effect (optional - adds a custom cursor trail)
const createCursorTrail = () => {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Optional: Add custom cursor styling
    document.body.style.cursor = 'default';
};

createCursorTrail();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease';
});

// Add fade-in animation
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadStyle);

// Console welcome message
console.log('%c👋 Welcome to Leon\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? That\'s awesome! Feel free to explore and get in touch.', 'color: #b0b0c0; font-size: 14px;');