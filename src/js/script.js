// Digital Resume JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital Resume script loaded');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(navLink);
            }
        });
    });
    
    function updateActiveNavLink(activeLink) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Add scroll effect to sections
    const observeOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observeOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Print functionality
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Add print class to body for any print-specific styling
            document.body.classList.add('printing');
            
            // Small delay to ensure styles are applied
            setTimeout(() => {
                window.print();
                document.body.classList.remove('printing');
            }, 100);
        });
    }
    
    // Skills animation on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Stagger animation
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(item);
    });
    
    // Certification items animation
    const certItems = document.querySelectorAll('.certification-item');
    const certObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Stagger animation
            }
        });
    }, { threshold: 0.2 });
    
    certItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        certObserver.observe(item);
    });
    
    // Education items animation (similar to certifications)
    const eduItems = document.querySelectorAll('.education-item');
    const eduObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Stagger animation
            }
        });
    }, { threshold: 0.2 });
    
    eduItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        eduObserver.observe(item);
    });
    
    // Experience items animation
    const expItems = document.querySelectorAll('.experience-item');
    const expObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 300); // Stagger animation
            }
        });
    }, { threshold: 0.1 });
    
    expItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        expObserver.observe(item);
    });
    
    // Add typing effect to the name (optional fun feature)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            nameElement.textContent += originalText[charIndex];
            charIndex++;
            
            if (charIndex >= originalText.length) {
                clearInterval(typingInterval);
            }
        }, 100);
    }
    
    // Contact info click to copy
    const contactItems = document.querySelectorAll('.contact-item span');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent;
            
            // Only try to copy phone and email
            if (text.includes('@') || text.includes('+91')) {
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.color = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 1500);
                }).catch(() => {
                    // Fallback for older browsers
                    console.log('Copy not supported');
                });
            }
        });
        
        // Add cursor pointer for clickable items
        const text = item.textContent;
        if (text.includes('@') || text.includes('+91')) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
        }
    });
    
    // Back to top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #268bd2 0%, #2aa198 100%);
        color: #ffffff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(38, 139, 210, 0.4);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Back to top click handler
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to back to top button
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #2aa198 0%, #859900 100%)';
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(42, 161, 152, 0.6)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #268bd2 0%, #2aa198 100%)';
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(38, 139, 210, 0.4)';
    });
    
    // Simple auto-scrolling projects
    const projectsSlider = document.getElementById('projectsSlider');
    
    if (projectsSlider) {
        console.log('Setting up auto-scrolling projects...');
        
        // Duplicate projects for infinite scroll
        const originalProjects = projectsSlider.innerHTML;
        projectsSlider.innerHTML = originalProjects + originalProjects;
        
        // Pause animation on hover
        projectsSlider.addEventListener('mouseenter', () => {
            projectsSlider.style.animationPlayState = 'paused';
        });
        
        projectsSlider.addEventListener('mouseleave', () => {
            projectsSlider.style.animationPlayState = 'running';
        });
        
        console.log('Auto-scrolling projects initialized');
    }
    
    console.log('Digital Resume loaded successfully!');
});

// Additional CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .nav-links a.active {
        background-color: #3498db;
        color: white;
    }
    
    @media print {
        .back-to-top {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
