/**
 * IDR Platform - Advanced Interactions (V3)
 * Handles particle system, intersection observers, and smooth loading.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Load Transition
    setTimeout(() => {
        document.body.classList.remove('pre-load');
    }, 100); // Slight delay ensures CSS is fully parsed before fade-in

    // 2. Sticky Navbar & Mobile Menu
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const bars = menuToggle.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // 3. Intersection Observer (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observer-target').forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Form Submission Placeholder
    const contactForm = document.getElementById('idr-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            contactForm.classList.add('hidden');
            const msg = document.getElementById('form-message');
            msg.classList.remove('hidden');
        });
    }

    // 5. HTML5 Canvas Particle System for Hero
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Very slow drift
                this.dx = (Math.random() - 0.5) * 0.3;
                this.dy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2;
                // Pure white or pale orange
                this.color = Math.random() > 0.8 ? 'rgba(255, 106, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)';
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if(this.x > canvas.width || this.x < 0) this.dx = -this.dx;
                if(this.y > canvas.height || this.y < 0) this.dy = -this.dy;
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            // Count based on screen size (~100 particles for desktop)
            let numberOfParticles = (canvas.width * canvas.height) / 15000;
            for(let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            // Clear trail
            ctx.clearRect(0,0, canvas.width, canvas.height);
            for(let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        // Only run if not on tiny mobile to save performance
        if(window.innerWidth > 768) {
            init();
            animate();
        }
    }
});
