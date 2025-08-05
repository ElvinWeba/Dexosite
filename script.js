// Mobile-only restrictions - prevent zooming but allow scrolling
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Prevent pinch zoom gesture
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
}

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

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const body = document.body;

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu when clicking on overlay
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Enhanced sticky header behavior
let lastScrollY = 0;
let ticking = false;

function updateHeader() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Contact form handling (if form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
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
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});
}



// Portfolio card hover effects removed

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Hero title is now handled by CSS animations for instant readability
// Typing effect removed to ensure text is readable immediately on load

// Pricing card animations removed

// Counter animations removed

// Counter animations removed 

// Mobile Services Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const servicesCarousel = document.querySelector('.services-carousel');
    const featuresCarousel = document.querySelector('.features-carousel');
    const pricingCarousel = document.querySelector('.pricing-carousel');
    
    // Initialize carousel function
    function initCarousel(carousel) {
        if (!carousel) return;
        
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn-prev');
        const nextBtn = carousel.querySelector('.carousel-btn-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let isInitialized = false;
        
        // Initialize carousel
        function init() {
            if (isInitialized) return;
            
            currentSlide = 0;
            // Force initial position for pricing carousel
            if (carousel.classList.contains('pricing-carousel') && track) {
                track.style.transform = 'translateX(0%)';
            }
            updateCarousel();
            updateIndicators();
            isInitialized = true;
        }
        
        // Update carousel position
        function updateCarousel() {
            if (!track) return;
;
            let translateX;
            if (carousel.classList.contains('features-carousel')) {
                // For features carousel, each slide is 50% width
                translateX = -currentSlide * 50;
            } else if (carousel.classList.contains('services-carousel')) {
                // For services carousel, each slide is 50% width
                translateX = -currentSlide * 50;
            } else if (carousel.classList.contains('pricing-carousel')) {
                // For pricing carousel, each slide is 100% width
                translateX = -currentSlide * 100;
            } else {
                // Default fallback
                translateX = -currentSlide * 100;
            }
            track.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update indicator states
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (indicator) {
                    indicator.classList.toggle('active', index === currentSlide);
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            if (slideIndex < 0 || slideIndex >= totalSlides) return;
            currentSlide = slideIndex;
            updateCarousel();
            updateIndicators();
        }
        
        // Go to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
            updateIndicators();
        }
        
        // Go to previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
            updateIndicators();
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.innerWidth <= 768) {
                    prevSlide();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.innerWidth <= 768) {
                    nextSlide();
                }
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            if (indicator) {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.innerWidth <= 768) {
                        goToSlide(index);
                    }
                });
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        function handleTouchStart(e) {
            if (window.innerWidth > 768) return;
            startX = e.touches[0].clientX;
            isDragging = true;
        }
        
        function handleTouchMove(e) {
            if (!isDragging || window.innerWidth > 768) return;
            endX = e.touches[0].clientX;
        }
        
        function handleTouchEnd() {
            if (!isDragging || window.innerWidth > 768) return;
            
            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
            
            isDragging = false;
        }
        
        // Add touch event listeners
        if (track) {
            track.addEventListener('touchstart', handleTouchStart, { passive: true });
            track.addEventListener('touchmove', handleTouchMove, { passive: true });
            track.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
        
        // Initialize carousel immediately
        init();
        
        // Re-initialize on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (window.innerWidth <= 768) {
                    // Ensure carousel is properly initialized for mobile
                    if (!isInitialized) {
                        init();
                    }
                } else {
                    // Reset for desktop view
                    isInitialized = false;
                    currentSlide = 0;
                    updateCarousel();
                    updateIndicators();
                }
            }, 100);
        });
    }
    
    // Initialize all carousels
    initCarousel(servicesCarousel);
    initCarousel(featuresCarousel);
    initCarousel(pricingCarousel);
    
    // Ensure pricing carousel is properly positioned on page load
    window.addEventListener('load', function() {
        if (pricingCarousel && window.innerWidth <= 768) {
            const track = pricingCarousel.querySelector('.carousel-track');
            if (track) {
                track.style.transform = 'translateX(0%)';
            }
        }
    });
    
    // Add swipe hint animation on page load - DISABLED to prevent unwanted movement
    function addSwipeHint() {
        // Disabled to prevent carousel from moving automatically
        /*
        if (window.innerWidth <= 768) {
            const carouselContainers = document.querySelectorAll('.carousel-container');
            carouselContainers.forEach(container => {
                // Add swipe hint class
                container.classList.add('swipe-hint');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    container.classList.remove('swipe-hint');
                }, 2000);
            });
        }
        */
    }
    
    // Trigger swipe hint after a short delay - DISABLED
    // setTimeout(addSwipeHint, 1000);
    
    // Keyboard navigation support for all carousels
    document.addEventListener('keydown', function(e) {
        if (window.innerWidth <= 768) {
            const activeCarousel = document.querySelector('.services-carousel:not([style*="display: none"])') || 
                                  document.querySelector('.features-carousel:not([style*="display: none"])') ||
                                  document.querySelector('.pricing-carousel:not([style*="display: none"])');
            
            if (activeCarousel && activeCarousel.offsetParent !== null) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevBtn = activeCarousel.querySelector('.carousel-btn-prev');
                    if (prevBtn) prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextBtn = activeCarousel.querySelector('.carousel-btn-next');
                    if (nextBtn) nextBtn.click();
                }
            }
        }
    });
}); 