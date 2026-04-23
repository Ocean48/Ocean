document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        
        // Update icon
        icon.classList.remove(isLight ? 'fa-moon' : 'fa-sun');
        icon.classList.add(isLight ? 'fa-sun' : 'fa-moon');
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update background color based on scroll position and new theme
        window.dispatchEvent(new Event('scroll'));
        
        // Add a subtle rotation animation
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => icon.style.transform = 'none', 300);
    });

    // Smooth scrolling
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Spotlight effect for cards
    const cards = document.querySelectorAll('.glass-card');
    document.addEventListener('mousemove', e => {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // Project Modal Logic
    const projectData = {
        'oceango': {
            title: 'OceanGo',
            date: '2023 - 2024',
            image: 'https://images.unsplash.com/photo-1611082161740-429ea36569eb?auto=format&fit=crop&q=80&w=800',
            description: '<p>OceanGo is an AI research project developed during my Bachelor\'s Degree at the University of Windsor.</p><p>It implements a sophisticated Monte Carlo Tree Search (MCTS) algorithm to play the complex board game Go. The project involved deep exploration into reinforcement learning concepts, tree traversal optimization, and heuristic evaluations.</p>',
            link: 'https://github.com/Ocean48/OceanGo',
            tags: ['Python', 'AI', 'MCTS', 'Research']
        },
        'bathyal': {
            title: 'Bathyal',
            date: '2026',
            image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800',
            description: '<p>Bathyal is a truly open-source project management system.</p><p>I started this project because I couldn\'t find a project management tool that was completely open-source without hidden enterprise tiers or limitations. Bathyal aims to change that by providing a comprehensive, community-driven alternative for teams to organize and track their work efficiently.</p>',
            link: 'https://github.com/Ocean48/bathyal',
            tags: ['Open Source', 'Project Management', 'Full Stack']
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    const modalClose = modalOverlay.querySelector('.modal-close');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                const tagsHtml = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                modalContent.innerHTML = `
                    <div class="modal-body-content">
                        <h2>${data.title}</h2>
                        <div class="modal-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${data.date}</span>
                            <div class="tags" style="gap: 0.5rem; margin: 0;">${tagsHtml}</div>
                        </div>
                        <img src="${data.image}" alt="${data.title} preview">
                        ${data.description}
                        <a href="${data.link}" target="_blank" class="btn primary mt-4">View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                `;
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modalContent.innerHTML = '', 400);
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Stop observing once animated in to prevent shaking at the bottom of the page
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-down, .build-in-bottom, .build-in-left, .build-in-right, .build-in-scale').forEach(el => {
        animationObserver.observe(el);
    });

    // Background color change on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        // Avoid division by zero, clamp between 0 and 1
        const scrollFraction = maxScroll > 0 ? Math.min(Math.max(scrollPosition / maxScroll, 0), 1) : 0;
        
        const isLight = document.body.classList.contains('light-theme');
        
        // Define color stops (HSL values) - Minimalist Tech Monochrome
        const darkColors = [
            { h: 0, s: 0, l: 4 },    // Near black
            { h: 0, s: 0, l: 6 },    // Very dark gray
            { h: 0, s: 0, l: 8 },    // Dark gray
            { h: 0, s: 0, l: 4 }     // Back to base
        ];
        
        const lightColors = [
            { h: 0, s: 0, l: 100 },  // Pure white
            { h: 0, s: 0, l: 98 },   // Off-white
            { h: 0, s: 0, l: 96 },   // Light gray
            { h: 0, s: 0, l: 100 }   // Back to base
        ];
        
        const colors = isLight ? lightColors : darkColors;
        
        const segmentCount = colors.length - 1;
        let segmentIndex = Math.floor(scrollFraction * segmentCount);
        if (segmentIndex >= segmentCount) segmentIndex = segmentCount - 1;
        
        const segmentFraction = (scrollFraction * segmentCount) - segmentIndex;
        
        const color1 = colors[segmentIndex];
        const color2 = colors[segmentIndex + 1];
        
        const h = color1.h + (color2.h - color1.h) * segmentFraction;
        const s = color1.s + (color2.s - color1.s) * segmentFraction;
        const l = color1.l + (color2.l - color1.l) * segmentFraction;
        
        document.documentElement.style.setProperty('--bg-base', `hsl(${h}, ${s}%, ${l}%)`);
    });
    
    // Call once to set initial background color
    window.dispatchEvent(new Event('scroll'));
    
    // Parallax effect on Hero
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroSubtitle.style.transform = `translateY(${scrolled * 0.25}px)`;
            heroCta.style.transform = `translateY(${scrolled * 0.1}px)`;
            
            heroTitle.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
            heroSubtitle.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    });

    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent adding multiple ripples quickly
            if (this.querySelector('.ripple')) {
                this.querySelector('.ripple').remove();
            }
            
            const circle = document.createElement('span');
            circle.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            circle.style.width = circle.style.height = `${size}px`;
            circle.style.left = `${e.clientX - rect.left - size/2}px`;
            circle.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });

    // Trigger animations for elements already in view on load
    setTimeout(() => {
        const nav = document.querySelector('.floating-nav');
        if (nav) nav.classList.add('in-view');
        
        // Let intersection observer handle the hero content for a true build-in effect
        // but if they are already visible, they will build-in automatically
    }, 100);
});
