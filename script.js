// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -250px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    if (window.scrollY > 10) {
        hero.classList.add('invisible-now');
    } else {
        hero.classList.remove('invisible-now');
    });
    // Observe idea cards
    const ideaCards = document.querySelectorAll('.idea-card');
    ideaCards.forEach(card => {
        observer.observe(card);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observe song cards
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => {
        observer.observe(card);
    });

    // Add click animation to idea cards
    ideaCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Add a temporary glow effect
            this.style.boxShadow = '0 0 30px rgba(137, 207, 240, 0.6)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
        });
    });

    // Add click effect to song cards (simulate play)
    songCards.forEach(card => {
        card.addEventListener('click', function() {
            const playBtn = this.querySelector('.play-btn');
            playBtn.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => {
                playBtn.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }, 200);
            
            // Show a "playing" message (you could enhance this)
            console.log('Playing:', this.querySelector('h3').textContent);
        });
    });

    // Create floating hearts animation
    createFloatingHearts();

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Progress bar animation on scroll
    const progressSection = document.querySelector('.marriage-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = document.querySelector('.progress-fill');
                const progress = progressFill.dataset.progress;
                progressFill.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });

    if (progressSection) {
        progressObserver.observe(progressSection);
    }
});

// Create additional floating hearts
function createFloatingHearts() {
    const hero = document.querySelector('.hero');
    const heartEmojis = ['💙', '💗', '💖', '💕'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.opacity = '0';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        
        hero.appendChild(heart);
        
        // Animate the heart
        let bottom = -10;
        let opacity = 0;
        const interval = setInterval(() => {
            bottom += 1;
            opacity = Math.min(opacity + 0.02, 1);
            
            if (bottom > 110) {
                clearInterval(interval);
                heart.remove();
            } else {
                heart.style.bottom = bottom + '%';
                heart.style.opacity = bottom < 10 ? opacity : Math.max(opacity - 0.02, 0);
            }
        }, 50);
    }, 3000);
}

// Add sparkle effect on hover for special elements
const specialElements = document.querySelectorAll('.timeline-item.special');
specialElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Add CSS for sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(1.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add a "scroll to top" button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--navy-blue), var(--baby-blue));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});
