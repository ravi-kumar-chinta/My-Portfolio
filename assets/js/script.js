// Function to set the theme and update UI
function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
}

// Set the initial theme on page load
var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the theme switch button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true 
});

// Fixed Header & Back to Top button on Scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 50) {
        header.classList.add('fixed-top');
    } else {
        header.classList.remove('fixed-top');
    }
    if (window.scrollY > 400) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Testimonial Slider
$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        items: 3,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: { 0: { items: 1 }, 768: { items: 2 }, 1170: { items: 3 } }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Refreshes Bootstrap's Scrollspy to correctly highlight the "Home" link on page load
    const scrollSpy = bootstrap.ScrollSpy.getInstance(document.body)
    if (scrollSpy) {
      scrollSpy.refresh()
    }
    
    // Skills and Tools Tab functionality
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            contents.forEach(c => c.classList.remove('active'));
            const targetContent = document.getElementById(tab.dataset.tab + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // "View More Projects" functionality
    const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            const hiddenProjects = document.querySelectorAll('.project-item.d-none');
            for (let i = 0; i < 3 && i < hiddenProjects.length; i++) {
                hiddenProjects[i].classList.remove('d-none');
                AOS.refresh();
            }
            if (document.querySelectorAll('.project-item.d-none').length === 0) {
                viewMoreBtn.style.display = 'none';
            }
        });
    }

    // Custom Cursor Logic
    if (window.innerWidth > 768) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (!cursorDot || !cursorOutline) return;
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        });
        const interactiveElements = document.querySelectorAll('a:not(.nav-link), button, input, textarea, .scroll-button-container, .project-card, .skill, .tool, .tab-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
});