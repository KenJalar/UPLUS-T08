document.addEventListener("DOMContentLoaded", function() {

    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const dynamicScrollbar = document.querySelector('.dynamic-scrollbar');
    const scrollSections = document.querySelectorAll('.scroll-section');

    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollY = window.scrollY;

        // Dynamic scrollbar
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        if (dynamicScrollbar) {
            dynamicScrollbar.style.height = `${scrolled}%`;
            dynamicScrollbar.style.opacity = '1';
        }
        
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            if (dynamicScrollbar) {
                dynamicScrollbar.style.opacity = '0';
            }
        }, 1500);

        // Active section for line animation
        let currentSection = null;
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });
        scrollSections.forEach(section => {
            if (section === currentSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });

    // Hero section text slider
    const heroTexts = document.querySelectorAll("#hero-text-slider h1");
    if (heroTexts.length > 0) {
        let currentTextIndex = 0;
        heroTexts.forEach((text, index) => {
            if (index !== 0) text.style.display = 'none';
        });
        setInterval(() => {
            heroTexts[currentTextIndex].style.display = 'none';
            currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
            heroTexts[currentTextIndex].style.display = 'block';
        }, 4000);
    }

    // Generic Image Slider for multiple galleries
    const galleries = document.querySelectorAll(".project-gallery-frame");
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll("img");
        if (images.length > 0) {
            let currentImageIndex = 0;
            setInterval(() => {
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
            }, 3500);
        }
    });

    // Scroll-triggered animations
    const fadeElems = document.querySelectorAll('.scroll-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    fadeElems.forEach(elem => observer.observe(elem));


    // Animated Stat Counters
    const statCounters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const prefix = counter.getAttribute('data-prefix') || '';
                const suffix = counter.getAttribute('data-suffix') || '';
                
                let count = 0;
                const speed = 200; // higher = slower

                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = prefix + Math.ceil(count) + suffix;
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = prefix + target + suffix;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Animate only once
            }
        });
    }, { threshold: 0.5 });
    statCounters.forEach(counter => counterObserver.observe(counter));


    // Articles Page: "No news" message logic
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        const articles = newsContainer.querySelectorAll('.article-card');
        const noNewsMessage = document.getElementById('no-news-message');
        if (articles.length === 0) {
            noNewsMessage.classList.remove('d-none');
        }
    }

    // Articles Page: Event modal population
    const eventDetailModal = document.getElementById('eventDetailModal');
    if (eventDetailModal) {
        eventDetailModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget; // The event item that was clicked
            const modalTitle = eventDetailModal.querySelector('#eventModalTitle');
            const modalBanner = eventDetailModal.querySelector('#eventModalBanner');
            const modalDate = eventDetailModal.querySelector('#eventModalDate');
            const modalLocation = eventDetailModal.querySelector('#eventModalLocation');
            const modalDescription = eventDetailModal.querySelector('#eventModalDescription');

            modalTitle.textContent = button.getAttribute('data-event-title');
            modalBanner.src = button.getAttribute('data-event-banner');
            modalDate.textContent = button.getAttribute('data-event-date');
            modalLocation.textContent = button.getAttribute('data-event-location');
            modalDescription.textContent = button.getAttribute('data-event-description');
        });
    }

    // FIX: The modal backdrop bug is fixed by removing the custom JS listener
    // and relying solely on Bootstrap's data-bs-* attributes in the HTML.
    // No additional JS is needed here.

});