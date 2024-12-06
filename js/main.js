document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.querySelector('header');
    const productCards = document.querySelectorAll('.product-card');
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle dropdown menus
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            this.classList.toggle('show');
            dropdowns.forEach(d => {
                if (d !== this) d.classList.remove('show');
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // CTA button hover animations
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errors = validateForm(formData);
            
            if (Object.keys(errors).length === 0) {
                // Submit form
                submitForm(formData);
            } else {
                displayFormErrors(errors);
            }
        });
    }

    // Form validation helper
    function validateForm(formData) {
        const errors = {};
        
        if (!formData.get('email').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (formData.get('message').length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        return errors;
    }

    // Form submission handler
    function submitForm(formData) {
        // Add your form submission logic here
        console.log('Form submitted:', Object.fromEntries(formData));
    }

    // Error display helper
    function displayFormErrors(errors) {
        Object.entries(errors).forEach(([field, message]) => {
            const errorElement = document.querySelector(`.error-${field}`);
            if (errorElement) {
                errorElement.textContent = message;
            }
        });
    }
}); 