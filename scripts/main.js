// Mobile-optimized JavaScript for interactive animations and engaging features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffect();
    initInteractiveGradients();
    initMobileOptimizations();
    initDynamicBackground();
    initIntersectionObserver();
});

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project, .skills-container li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Parallax effect for header
function initParallaxEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                
                if (header) {
                    header.style.transform = `translateY(${rate}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Interactive gradient effects on mouse move
function initInteractiveGradients() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('mousemove', (e) => {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            project.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Disable parallax on mobile for better performance
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = 'none';
        }
        
        // Optimize touch interactions
        document.querySelectorAll('.project, .cta, .skills-container li').forEach(el => {
            el.style.touchAction = 'manipulation';
        });
        
        // Adjust animations for mobile
        document.querySelectorAll('section, .project').forEach(el => {
            el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
}

function handleOrientationChange() {
    // Brief timeout to allow browser to complete orientation change
    setTimeout(() => {
        // Recalculate any dynamic sizing
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            project.style.transform = 'none';
        });
        
        // Re-trigger scroll animations
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
        });
        
        // Force reflow
        void document.body.offsetHeight;
        
        // Re-observe elements
        initScrollAnimations();
    }, 100);
}

// Dynamic background animation
function initDynamicBackground() {
    const body = document.body;
    let hue = 0;
    
    function animateBackground() {
        hue = (hue + 0.5) % 360;
        const gradient = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 80%) 0%, 
            hsl(${(hue + 60) % 360}, 70%, 85%) 50%,
            hsl(${(hue + 120) % 360}, 70%, 80%) 100%)`;
        
        body.style.background = gradient;
        requestAnimationFrame(animateBackground);
    }
    
    // Only animate on larger screens for performance
    if (window.innerWidth > 768) {
        animateBackground();
    }
}

// Advanced intersection observer for staggered animations
function initIntersectionObserver() {
    const skillItems = document.querySelectorAll('.skills-container li');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.5)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        skillObserver.observe(item);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const header = document.querySelector('header');
        if (header) {
            header.style.opacity = '1';
        }
    }, 100);
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate layout-dependent features
        if (window.innerWidth <= 768) {
            // Mobile view optimizations
            document.body.style.background = 'var(--light-gradient)';
        } else {
            // Re-enable dynamic background for larger screens
            initDynamicBackground();
        }
    }, 250);
});

// Add active state to navigation (if navigation is added later)
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or menus (if added later)
    }
    
    // Arrow key navigation for projects
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const projects = document.querySelectorAll('.project');
        const currentProject = document.activeState;
        
        // Find current project index
        let currentIndex = -1;
        projects.forEach((project, index) => {
            if (project.contains(document.activeElement)) {
                currentIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown' && currentIndex < projects.length - 1) {
            projects[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            projects[currentIndex - 1].focus();
        }
    }
});

// Console welcome message
console.log('%c Welcome to Moses Portfolio! ', 'background: #667eea; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with responsive design and smooth animations ', 'background: #764ba2; color: white; font-size: 12px; padding: 5px; border-radius: 5px;');