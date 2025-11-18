// -----------------------------------
// Smooth scroll + Hero fade controller
// -----------------------------------

let isManualScroll = false;

// Smooth scrolling function
function scrollToSection(sectionId) {
    isManualScroll = true;
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Re-enable auto fade after scroll finishes
        setTimeout(() => {
            isManualScroll = false;
        }, 800);
    }
}

// Fade hero on scroll (with delay option)
const hero = document.querySelector('.hero');
let heroHidden = false;

// Delay before auto-fade starts
const HERO_FADE_DELAY = 1500; // in ms

// delayed registration but safe: ensure element exists and use passive scroll
setTimeout(() => {
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.warn('Hero element not found — hero fade disabled');
        return;
    }

    // debug: show that we attached the listener
    console.info('Hero fade listener attached. Delay:', HERO_FADE_DELAY, 'ms');

    window.addEventListener('scroll', () => {
        if (isManualScroll) {
            // skip auto-hide while programmatic/user-initiated smooth scroll is running
            return;
        }

        const y = window.scrollY || window.pageYOffset;
        // debug - uncomment if you want runtime logs
        // console.log('scrollY =', y, 'heroHidden =', heroHidden);

        // Fade out only after scrolling a meaningful distance
        if (y > 900 && !heroHidden) {
        hero.classList.add('invisible-now');
        heroHidden = true;
        }
        else if (y <= 600 && heroHidden) {
        hero.classList.remove('invisible-now');
        heroHidden = false;
        }

    }, { passive: true });
}, HERO_FADE_DELAY);

// -----------------------------------
// Intersection Observer
// -----------------------------------

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

    // Observe idea cards
    const ideaCards = document.querySelectorAll('.idea-card');
    ideaCards.forEach(card => observer.observe(card));

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    // Observe song cards
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => observer.observe(card));

    // Click animations
    ideaCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => this.style.animation = '', 10);
            this.style.boxShadow = '0 0 30px rgba(137, 207, 240, 0.6)';
            setTimeout(() => this.style.boxShadow = '', 500);
        });
    });

    songCards.forEach(card => {
        card.addEventListener('click', function() {
            const playBtn = this.querySelector('.play-btn');
            playBtn.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => {
                playBtn.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }, 200);
        });
    });

    // Floating hearts
    createFloatingHearts();

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Progress bar animation
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
    if (progressSection) progressObserver.observe(progressSection);

}); // ← FIXED: properly closes DOMContentLoaded
