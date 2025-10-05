// Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Functionality for the Home section scroll down animation
function scrollToNextSection(targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
        // Use smooth scroll behavior
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

//Testimonial Slider
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        nav:true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1170:{
                items:3,
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  let mouseStopTimeout;
  
  // Define all interactive elements explicitly for the custom cursor.
  // We need to fetch these elements before adding event listeners.
  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, .project-card, .skill, .tool, .tab-btn, .scroll-button-container'
  );


  // Move cursor elements
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;
    cursorOutline.style.left = `${clientX}px`;
    cursorOutline.style.top = `${clientY}px`;

    // Make cursor visible again
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
    cursorDot.classList.remove('stopped'); // Remove white dot when moving

    // Clear previous timeout and set a new one
    clearTimeout(mouseStopTimeout);
    mouseStopTimeout = setTimeout(() => {
      // Cursor stopped: fade outline and make inner dot white
      cursorOutline.style.opacity = '0';
      cursorDot.classList.add('stopped'); // Apply white dot
      createRipple(clientX, clientY, 'stop');
    }, 10000); // Adjust delay as needed (10s here)
  });

  // Handle hover effects
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovered');
      cursorOutline.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovered');
      cursorOutline.classList.remove('hovered');
    });

    el.addEventListener('mousedown', () => {
      cursorDot.classList.add('clicked');
      cursorOutline.classList.add('clicked');
    });
  });

  // When the mouse is released anywhere, remove the transparency
  window.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicked');
    cursorOutline.classList.remove('clicked');
  });

  // Handle multiple "pop-up" ripples on click
  window.addEventListener('click', (e) => {
    const rippleCount = 3; // Number of ripples to create on click
    for (let i = 0; i < rippleCount; i++) {
      setTimeout(() => {
        createRipple(e.clientX, e.clientY, 'click');
      }, i * 80); // Stagger each ripple by 80ms
    }
  });

  // Helper function to create both types of ripples
  function createRipple(x, y, type) {
    const ripple = document.createElement('div');
    ripple.classList.add(type === 'click' ? 'click-ripple' : 'stop-ripple');
    document.body.appendChild(ripple);

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

});