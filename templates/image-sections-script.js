/* ========================================
IMAGE SECTIONS JAVASCRIPT TEMPLATE FOR SERVICE PAGES
======================================== */

// Transformation Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.transformation-gallery');
    if (!gallery) {
        console.log('Gallery not found');
        return;
    }
    
    const slides = gallery.querySelectorAll('.gallery-slide');
    const prevBtn = gallery.querySelector('.prev-btn');
    const nextBtn = gallery.querySelector('.next-btn');
    const indicators = gallery.querySelectorAll('.indicator');
    
    console.log('Gallery elements found:', {
        slides: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicators: indicators.length
    });
    
    if (slides.length === 0) {
        console.log('No slides found');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        console.log('Showing slide:', index);
        
        // Remove active class from all slides and indicators
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) {
                indicators[i].classList.remove('active');
            }
        });
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        console.log('Next slide clicked');
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        console.log('Prev slide clicked');
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            pauseAutoPlayForUserInteraction();
            nextSlide();
        });
        
        // Add touch events for better mobile support
        nextBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        
        nextBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button touched');
            pauseAutoPlayForUserInteraction();
            nextSlide();
        }, { passive: false });
    } else {
        console.log('Next button not found');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button clicked');
            pauseAutoPlayForUserInteraction();
            prevSlide();
        });
        
        // Add touch events for better mobile support
        prevBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        
        prevBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button touched');
            pauseAutoPlayForUserInteraction();
            prevSlide();
        }, { passive: false });
    } else {
        console.log('Prev button not found');
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Indicator clicked:', index);
            pauseAutoPlayForUserInteraction();
            showSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (gallery.matches(':hover') || gallery.contains(document.activeElement)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                pauseAutoPlayForUserInteraction();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                pauseAutoPlayForUserInteraction();
                nextSlide();
            }
        }
    });
    
    // Auto-play functionality with proper pause behavior
    let autoPlayInterval;
    let userInteractionTimeout;
    let isUserInteracting = false;
    
    function startAutoPlay() {
        // Clear any existing intervals
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        if (userInteractionTimeout) {
            clearTimeout(userInteractionTimeout);
        }
        
        // Only start auto-play if user isn't actively interacting
        if (!isUserInteracting) {
            autoPlayInterval = setInterval(function() {
                if (!isUserInteracting) {
                    nextSlide();
                }
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function pauseAutoPlayForUserInteraction() {
        isUserInteracting = true;
        stopAutoPlay();
        
        // Clear any existing timeout
        if (userInteractionTimeout) {
            clearTimeout(userInteractionTimeout);
        }
        
        // Resume auto-play after 20 seconds of no interaction
        userInteractionTimeout = setTimeout(function() {
            isUserInteracting = false;
            startAutoPlay();
        }, 20000); // 20 seconds
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    gallery.addEventListener('mouseenter', function() {
        isUserInteracting = true;
        stopAutoPlay();
    });
    
    gallery.addEventListener('mouseleave', function() {
        // Don't immediately restart - let the 20-second timer handle it
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isTouching = false;
    let touchStartTime = 0;
    
    gallery.addEventListener('touchstart', function(e) {
        // Don't interfere with button touches
        if (e.target.closest('.gallery-btn')) return;
        
        isTouching = true;
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
        stopAutoPlay();
    }, { passive: true });
    
    gallery.addEventListener('touchmove', function(e) {
        if (!isTouching) return;
        // Allow some movement for better touch handling
    }, { passive: true });
    
    gallery.addEventListener('touchend', function(e) {
        if (!isTouching) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const touchDuration = Date.now() - touchStartTime;
        handleSwipe(touchDuration);
        isTouching = false;
    }, { passive: true });
    
    function handleSwipe(duration) {
        const swipeThreshold = 30;
        const diff = touchStartX - touchEndX;
        
        // Only register swipe if it's quick enough and far enough
        if (Math.abs(diff) > swipeThreshold && duration < 500) {
            pauseAutoPlayForUserInteraction();
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Initialize first slide
    showSlide(0);
    
    console.log('Gallery initialized successfully');
});

/* ========================================
CUSTOMIZATION NOTES:
========================================

1. AUTO-PLAY SETTINGS:
   - Change slide every 5 seconds (line 79)
   - Resume after 20 seconds of no interaction (line 95)
   - Modify these values as needed

2. TOUCH/SWIPE SETTINGS:
   - Swipe threshold: 30px (line 120)
   - Max swipe duration: 500ms (line 123)
   - Adjust for different sensitivity

3. KEYBOARD NAVIGATION:
   - Arrow keys work when gallery is hovered or focused
   - Left arrow: previous slide
   - Right arrow: next slide

4. MOBILE OPTIMIZATIONS:
   - Touch events prevent default behavior
   - Passive listeners for better performance
   - Button touch events are separate from swipe

5. ERROR HANDLING:
   - Console logs for debugging
   - Graceful fallbacks if elements not found
   - Safe array access with length checks

6. PERFORMANCE:
   - Event listeners are properly cleaned up
   - Intervals and timeouts are cleared
   - Passive listeners where appropriate

======================================== */
