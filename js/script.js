/* ========================================
   Nexa Lahore Tutors - Main JavaScript
   ======================================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Generic Form submission handling
    document.querySelectorAll('form').forEach(form => {
        // Skip forms that have specific handlers
        if (form.id === 'contactForm' || form.id === 'teacherApplicationForm') {
            return;
        }
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your submission! We will contact you shortly.');
            form.reset();
        });
    });
    
    // Contact Form submission (contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // In a real application, you would send this data to your server
            alert('Thank you for your message! We will contact you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // Scroll to top of form
            const contactFormSection = document.getElementById('contact-form');
            if (contactFormSection) {
                contactFormSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Teacher Application Form submission (teachers.html)
    const teacherApplicationForm = document.getElementById('teacherApplicationForm');
    if (teacherApplicationForm) {
        teacherApplicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Thank you for your application! We will review it and contact you within 3-5 business days.');
            
            // Reset form
            this.reset();
            
            // Scroll to top of form
            const applicationFormSection = document.getElementById('application-form');
            if (applicationFormSection) {
                applicationFormSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Subject Filter Tabs (subjects.html)
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const subjectCards = document.querySelectorAll('.subject-card');
                
                subjectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Check URL for subject parameter and scroll to it (subjects.html)
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    if (subjectParam) {
        const subjectId = subjectParam.toLowerCase().replace(/\s+/g, '-');
        const subjectElement = document.getElementById(subjectId);
        if (subjectElement) {
            setTimeout(() => {
                subjectElement.scrollIntoView({ behavior: 'smooth' });
                subjectElement.classList.add('ring-2', 'ring-blue-500');
                setTimeout(() => {
                    subjectElement.classList.remove('ring-2', 'ring-blue-500');
                }, 3000);
            }, 500);
        }
    }
    
    // Pre-fill contact form based on URL parameters (contact.html)
    const subject = urlParams.get('subject');
    const plan = urlParams.get('plan');
    
    if (subject) {
        const subjectSelect = document.querySelector('select[name="subject"]');
        if (subjectSelect) {
            subjectSelect.value = subject.toLowerCase();
        }
    }
    
    if (plan) {
        const planRadios = document.querySelectorAll('input[name="inquiry-type"]');
        if (plan === 'basic' || plan === 'standard' || plan === 'premium') {
            planRadios.forEach(radio => {
                if (radio.value === 'trial') {
                    radio.checked = true;
                }
            });
        }
    }
    
    // FAQ accordion functionality (contact.html)
    const faqItems = document.querySelectorAll('#faq .border');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const answer = item.querySelector('p');
            if (answer) {
                answer.style.display = 'none';
                
                item.addEventListener('click', function() {
                    const isVisible = answer.style.display === 'block';
                    answer.style.display = isVisible ? 'none' : 'block';
                    
                    // Add animation class
                    if (!isVisible) {
                        answer.classList.add('animate-fadeIn');
                    }
                });
            }
        });
    }
    
    // File upload display (teachers.html)
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'No file chosen';
            const container = this.parentElement;
            
            // Create or update file name display
            let fileNameDisplay = container.querySelector('.file-name');
            if (!fileNameDisplay) {
                fileNameDisplay = document.createElement('p');
                fileNameDisplay.className = 'file-name text-sm text-gray-600 mt-2';
                container.appendChild(fileNameDisplay);
            }
            fileNameDisplay.textContent = `Selected: ${fileName}`;
        });
    });
    
    // Checkbox styling (teachers.html)
    document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const customCheckbox = this.nextElementSibling;
            if (customCheckbox) {
                if (this.checked) {
                    customCheckbox.style.backgroundColor = '#2563eb';
                    customCheckbox.style.borderColor = '#2563eb';
                } else {
                    customCheckbox.style.backgroundColor = '';
                    customCheckbox.style.borderColor = '#d1d5db';
                }
            }
        });
    });
    
    // Stats Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Add suffix based on the original content
                if (target === 8) {
                    element.textContent = target + '+';
                } else if (target === 500) {
                    element.textContent = target + '+';
                } else if (target === 95) {
                    element.textContent = target + '%';
                } else if (target === 25) {
                    element.textContent = target + '+';
                } else {
                    element.textContent = target;
                }
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, index * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe stats container
    const statsContainer = document.querySelector('.grid.grid-cols-2.gap-6');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});
