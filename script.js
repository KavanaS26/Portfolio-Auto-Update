// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            
        });
    }

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===== ANIMATE ELEMENTS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards and sections
    document.querySelectorAll('.project-card, .about-text, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== UPDATE LAST MODIFIED DATE =====
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const lastModified = new Date(document.lastModified);
        const formattedDate = lastModified.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastUpdatedElement.textContent = formattedDate;
    }

    // ===== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        let isTag = false;
        let tagBuffer = '';

        function typeWriter() {
            if (i < text.length) {
                const char = text.charAt(i);
                
                if (char === '<') {
                    isTag = true;
                    tagBuffer = '<';
                } else if (char === '>' && isTag) {
                    isTag = false;
                    heroTitle.innerHTML += tagBuffer + '>';
                    tagBuffer = '';
                } else if (isTag) {
                    tagBuffer += char;
                } else {
                    heroTitle.innerHTML += char;
                }
                
                i++;
                setTimeout(typeWriter, isTag ? 0 : 50);
            }
        }

        // Start typing effect after page loads
        setTimeout(typeWriter, 500);
    }

    // ===== SKILL TAGS ANIMATION ON HOVER =====
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== PROJECT CARDS TILT EFFECT =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHT =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===== CONSOLE MESSAGE (Fun Easter Egg) =====
    console.log('%c👋 Hello, curious developer!', 
        'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cWant to see the source? Check out my GitHub!', 
        'font-size: 14px; color: #6b7280;');
    console.log('%c🚀 This site auto-deploys using GitHub Actions + Netlify', 
        'font-size: 12px; color: #8b5cf6; font-style: italic;');

    // ===== PERFORMANCE MONITORING (Optional) =====
    window.addEventListener('load', () => {
        if (performance.timing) {
            const loadTime = performance.timing.domContentLoadedEventEnd - 
                             performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }

        // Show a subtle notification that the site is loaded
        console.log('%c✅ Portfolio fully loaded and interactive!', 
            'font-size: 14px; color: #10b981; font-weight: bold;');
    });

    // ===== SCROLL TO TOP BUTTON (Optional Enhancement) =====
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Button hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
        scrollTopBtn.style.background = 'var(--secondary-color)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
        scrollTopBtn.style.background = 'var(--primary-color)';
    });

    // ===== FORM VALIDATION (If you add a contact form later) =====
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes, submit the form
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Press 'h' to go to home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            const homeSection = document.querySelector('#home');
            if (homeSection) homeSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // ===== DARK MODE TOGGLE (Optional - for future enhancement) =====
    // You can uncomment this if you want to add dark mode functionality
    /*
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    */

});

// ===== EXTERNAL LINKS OPEN IN NEW TAB =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== PAGE VISIBILITY API (Detect when user returns to tab) =====
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('👋 Welcome back!');
    }
});