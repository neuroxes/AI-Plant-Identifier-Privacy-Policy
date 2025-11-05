// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initTableOfContents();
    initBackToTop();
    initSmoothScroll();
    addServiceRowLabels();
    initActiveSection();
});

// Generate Table of Contents dynamically
function initTableOfContents() {
    const tocList = document.getElementById('tocList');
    const sections = document.querySelectorAll('.policy-section');
    
    sections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        if (heading) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // Get the section ID or create one
            const sectionId = section.id || `section-${index}`;
            section.id = sectionId;
            
            a.href = `#${sectionId}`;
            a.textContent = heading.textContent;
            
            li.appendChild(a);
            tocList.appendChild(li);
        }
    });
}

// Back to Top Button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Add data labels for mobile responsive table
function addServiceRowLabels() {
    const serviceRows = document.querySelectorAll('.service-row:not(.service-header)');
    const labels = ['Service Provider', 'Purpose', 'Data Shared'];
    
    serviceRows.forEach(row => {
        const cells = row.querySelectorAll('div');
        cells.forEach((cell, index) => {
            if (labels[index]) {
                cell.setAttribute('data-label', labels[index]);
            }
        });
    });
}

// Highlight active section in TOC
function initActiveSection() {
    const sections = document.querySelectorAll('.policy-section');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                // Remove active class from all TOC links
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's TOC link
                const activeLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add animation to cards on scroll
function initScrollAnimations() {
    const cards = document.querySelectorAll('.use-case-card, .storage-card, .permission-card, .right-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations after a short delay
setTimeout(initScrollAnimations, 500);

// Handle TOC link active state
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents a.active {
            color: var(--primary-color);
            background-color: rgba(45, 106, 79, 0.12);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});

// Keyboard accessibility for back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Print functionality
function printPrivacyPolicy() {
    window.print();
}

// Copy section link functionality
function copySectionLink(sectionId) {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
            showNotification('Link copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }
}

// Show notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add slide animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// Handle hash in URL on page load
window.addEventListener('load', function() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerOffset = 20;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Add focus styles for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Lazy load images if any are added in the future
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Expose utility functions globally if needed
window.PrivacyPolicy = {
    printPolicy: printPrivacyPolicy,
    copySectionLink: copySectionLink,
    showNotification: showNotification
};