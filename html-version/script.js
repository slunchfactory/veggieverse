/**
 * VeggieVerse - Main JavaScript
 * Navigation, Slider, and Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // Navigation Drawer
  // ============================================
  const menuBtn = document.getElementById('menuBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navDrawer = document.getElementById('navDrawer');
  const navClose = document.getElementById('navClose');

  function openDrawer() {
    navOverlay.classList.add('active');
    navDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navOverlay.classList.remove('active');
    navDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openDrawer);
  }

  if (navClose) {
    navClose.addEventListener('click', closeDrawer);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  // ESC key to close drawer
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // ============================================
  // Mood Slider (Auto-sliding carousel)
  // ============================================
  const moodSlides = document.getElementById('moodSlides');
  const moodDots = document.querySelectorAll('.mood-dot');
  let currentSlide = 0;
  const totalSlides = 3;
  let slideInterval;

  function goToSlide(index) {
    currentSlide = index;
    if (moodSlides) {
      moodSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Update dots
    moodDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Initialize slider
  if (moodSlides) {
    startAutoSlide();

    // Dot click handlers
    moodDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide();
      });
    });

    // Pause on hover
    moodSlides.addEventListener('mouseenter', stopAutoSlide);
    moodSlides.addEventListener('mouseleave', startAutoSlide);
  }

  // ============================================
  // Floating Vegetables Click Handler
  // ============================================
  const floatingItems = document.querySelectorAll('.floating-item');
  const selectedVeggies = document.getElementById('selectedVeggies');
  let selectedCount = 3; // Already has 3 mock items

  floatingItems.forEach(item => {
    item.addEventListener('click', function() {
      if (selectedCount < 3) {
        // Add visual feedback
        this.style.opacity = '0.5';
        this.style.pointerEvents = 'none';
        selectedCount++;

        // Show alert for demo
        if (selectedCount === 3) {
          console.log('3개의 야채가 선택되었습니다!');
        }
      }
    });
  });

  // ============================================
  // Remove button handlers for veggie slots
  // ============================================
  const removeButtons = document.querySelectorAll('.veggie-slot .remove-btn');

  removeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const slot = this.parentElement;
      const img = slot.querySelector('img');
      if (img) {
        img.style.display = 'none';
        this.style.display = 'none';
        selectedCount--;
      }
    });
  });

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // ============================================
  // Header scroll effect (optional)
  // ============================================
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // Reset header on page load
  if (header) {
    header.style.transition = 'transform 0.3s ease';
  }

  // ============================================
  // Image lazy loading fallback
  // ============================================
  const images = document.querySelectorAll('img[onerror]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Error handler already in HTML onerror attribute
      console.log('Image failed to load:', this.src);
    });
  });

  console.log('VeggieVerse initialized!');
});
