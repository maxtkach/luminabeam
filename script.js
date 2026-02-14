// ===================================
// SCROLL EFFECTS
// ===================================

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU
// ===================================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Close mobile menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking outside
document.getElementById('mobileMenu')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeMobileMenu();
    }
});

// ===================================
// INTERSECTION OBSERVER - ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all problem cards
document.querySelectorAll('.problem-card').forEach(card => {
    fadeInObserver.observe(card);
});

// Observe all feature items
document.querySelectorAll('.feature-item').forEach(item => {
    fadeInObserver.observe(item);
});

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    fadeInObserver.observe(item);
});

// Observe all testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    fadeInObserver.observe(card);
});

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

// Specs accordion
function toggleSpec(element) {
    const item = element.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.spec-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!wasActive) {
        item.classList.add('active');
    }
}

// FAQ accordion
function toggleFaq(element) {
    const item = element.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!wasActive) {
        item.classList.add('active');
    }
}

// ===================================
// COUNTDOWN TIMER
// ===================================

function updateCountdown() {
    // Set end date to 12 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 12);
    endDate.setHours(23, 59, 59);

    const now = new Date();
    const diff = endDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        // Update DOM
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');

        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    }
}

// Update countdown every minute
updateCountdown();
setInterval(updateCountdown, 60000);

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// ===================================
// CONTACT FORM MODAL (Placeholder)
// ===================================

function showContactForm(e) {
    e.preventDefault();
    
    // In production, this would open a modal with a contact form
    // For now, we'll show an alert
    const message = `
Форма замовлення

У реальній версії тут відкриється модальне вікно з формою:

• Ім'я та прізвище
• Телефон
• Email
• Кількість приладів
• Коментар

З інтеграцією:
→ CRM система для обробки лідів
→ Email-повідомлення
→ Telegram/Viber notifications
→ Google Analytics відстеження конверсій
    `;
    
    alert(message);
}

// ===================================
// PARALLAX EFFECT FOR ORBS
// ===================================

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    
    if (orb1) {
        const currentTransform = orb1.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/)?.[1] || 0);
        orb1.style.transform = `translateY(${currentY + scrollDelta * 0.3}px)`;
    }
    
    if (orb2) {
        const currentTransform = orb2.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/)?.[1] || 0);
        orb2.style.transform = `translateY(${currentY + scrollDelta * 0.2}px)`;
    }
    
    if (orb3) {
        const currentTransform = orb3.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([-\d.]+)px\)/)?.[1] || 0);
        orb3.style.transform = `translateY(${currentY + scrollDelta * 0.25}px)`;
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// GALLERY LIGHTBOX (Simple version)
// ===================================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // In production, this would open a lightbox
            // For now, open image in new tab
            window.open(img.src, '_blank');
        }
    });
});

// ===================================
// PRELOADER (Optional)
// ===================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===================================
// ANALYTICS (Placeholder)
// ===================================

// Track scroll depth
let maxScrollDepth = 0;

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = Math.floor(scrollPercent / 25) * 25;
        
        // In production, send to analytics
        console.log(`Scroll depth: ${maxScrollDepth}%`);
    }
});

// Track time on page
let pageLoadTime = Date.now();

window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000);
    
    // In production, send to analytics
    console.log(`Time on page: ${timeOnPage} seconds`);
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║     🎭 LuminaBeam 7R Pro Landing     ║
║                                       ║
║  Професійне сценічне світло           ║
║  Mobile Optimized - Pixel Perfect     ║
║                                       ║
╚═══════════════════════════════════════╝

✅ 8px Grid System
✅ Full Bleed Media
✅ Bento Grid Specs
✅ Horizontal Swipe Testimonials
✅ Sticky Bottom CTA
✅ OLED-Optimized Colors
✅ Touch-Friendly (44x44px)
✅ Vertical Rhythm (80px sections)

Дякуємо за перегляд!
`);