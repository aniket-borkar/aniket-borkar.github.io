/**
 * Plasma Science Interactive Website Script
 * Provides animations, particle effects, and interactive elements
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations
    initAnimations();
    
    // Add scroll effects
    initScrollEffects();
    
    // Add interactive elements
    initInteractiveElements();
    
    // Handle navigation and mobile menu
    initNavigation();
    
    // Add background plasma effect
    createBackgroundEffect();
});

/**
 * Initialize animations for elements across the page
 */
function initAnimations() {
    // Pulse animation for section titles
    const sectionTitles = document.querySelectorAll('.section-header h2');
    sectionTitles.forEach(title => {
        title.classList.add('animated');
    });
    
    // Add hover effects to state cards
    const stateCards = document.querySelectorAll('.state-card');
    stateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            stateCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Animate the plasma icon in the logo
    const plasmaIcon = document.querySelector('.plasma-icon');
    if (plasmaIcon) {
        setInterval(() => {
            plasmaIcon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        }, 3000);
    }
}

/**
 * Initialize scroll-based animations and effects
 */
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const particles = document.querySelectorAll('.hero-particle');
            particles.forEach(particle => {
                const speed = parseFloat(particle.getAttribute('data-speed') || 0.2);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
        
        // Add fixed class to header when scrolled
        const header = document.querySelector('header');
        if (header) {
            if (scrolled > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Handle scroll reveal animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize interactive elements throughout the page
 */
function initInteractiveElements() {
    // Add interactive hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '5';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateX = mouseY * -0.05;
            const rotateY = mouseX * 0.05;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                this.style.zIndex = '1';
            }, 300);
        });
    });
    
    // Interactive resource items
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach(item => {
        const icon = item.querySelector('.resource-icon');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add smooth scrolling for anchor links
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
}

/**
 * Initialize navigation and mobile menu interactions
 */
function initNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * Create plasma-like background effects
 */
function createBackgroundEffect() {
    // Create background plasma particles
    for (let i = 0; i < 15; i++) {
        createPlasmaParticle();
    }
    
    // Add event listener to create plasma particles on click
    document.addEventListener('click', function(e) {
        // Don't create particles for clicks on buttons, links, etc.
        if (
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.tagName.toLowerCase() === 'a' ||
            e.target.tagName.toLowerCase() === 'input' ||
            e.target.closest('.demo-container') ||
            e.target.closest('.interactive-container')
        ) {
            return;
        }
        
        // Create a plasma particle at the click position
        createPlasmaParticle(e.clientX, e.clientY);
    });
}

/**
 * Create a single plasma particle at the specified position
 */
function createPlasmaParticle(x, y) {
    const colors = [
        'rgba(208, 92, 227, 0.3)', // Purple
        'rgba(255, 138, 80, 0.3)',  // Orange
        'rgba(117, 125, 232, 0.3)', // Blue
        'rgba(156, 39, 176, 0.3)'   // Deep purple
    ];
    
    const particle = document.createElement('div');
    particle.classList.add('plasma-particle');
    
    // Position the particle
    if (x && y) {
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
    } else {
        // Random position if no x,y specified
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
    }
    
    // Random size (larger for click events)
    const size = x && y ? 30 + Math.random() * 50 : 10 + Math.random() * 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random color and opacity
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Set a random animation duration and delay
    const duration = 10 + Math.random() * 30;
    const delay = Math.random() * 2;
    particle.style.animation = `float ${duration}s infinite ${delay}s`;
    
    // Store the vertical speed for parallax effect
    particle.setAttribute('data-speed', (Math.random() * 0.3 + 0.1).toFixed(2));
    
    // Add particle to the document
    document.body.appendChild(particle);
    
    // Remove particle after animation duration to prevent memory leaks
    const lifespan = x && y ? 10000 : 30000 + Math.random() * 30000;
    setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            
            // Create a new particle to replace this one if it was a background particle
            if (!x && !y) {
                createPlasmaParticle();
            }
        }, 1000);
    }, lifespan);
}

// Demo tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const demos = document.querySelectorAll('.demo');
const demoDescription = document.querySelector('.demo-description');

if (tabButtons.length > 0 && demos.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and demos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            demos.forEach(demo => demo.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get demo ID and activate corresponding demo
            const demoId = button.getAttribute('data-demo');
            const activeDemo = document.getElementById(`${demoId}-demo`);
            
            if (activeDemo) {
                activeDemo.classList.add('active');
                
                // Update demo description based on active demo
                if (demoDescription) {
                    updateDemoDescription(demoId);
                }
                
                // Trigger a resize event to ensure canvas is properly sized
                window.dispatchEvent(new Event('resize'));
                
                // Force redraw of canvas for the active demo
                const canvasId = `${demoId}-canvas`;
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    console.log(`Activating ${demoId} demo with canvas ${canvasId}`);
                    
                    // Special handling for specific demos
                    setTimeout(() => {
                        // Force a resize after a short delay to ensure the canvas is visible
                        canvas.width = canvas.clientWidth;
                        canvas.height = canvas.clientHeight;
                        console.log(`Resized ${canvasId} to:`, canvas.width, canvas.height);
                        
                        // Initialize specific simulations if needed
                        if (demoId === 'fusion-reactor' && window.plasmaSimulations && window.plasmaSimulations.fusionReactor) {
                            window.plasmaSimulations.fusionReactor.redraw();
                        } 
                        else if (demoId === 'cold-plasma' && window.plasmaSimulations && window.plasmaSimulations.coldPlasma) {
                            window.plasmaSimulations.coldPlasma.redraw();
                            console.log('Cold plasma simulation refreshed');
                        }
                        else if (demoId === 'solar-plasma' && window.plasmaSimulations && window.plasmaSimulations.solarPlasma) {
                            window.plasmaSimulations.solarPlasma.redraw();
                        }
                        else if (demoId === 'plasma-ball' && window.plasmaSimulations && window.plasmaSimulations.plasmaBall) {
                            window.plasmaSimulations.plasmaBall.redraw();
                        }
                    }, 100);
                }
            }
        });
    });
}

// Function to update demo description
function updateDemoDescription(demoId) {
    const descriptions = {
        'plasma-ball': {
            title: 'Plasma Ball Simulation',
            text: 'This simulation demonstrates how plasma filaments form and respond to electromagnetic fields. Adjust the energy level to see how it affects the plasma behavior, or "touch" the plasma to see how it responds to external conductors.'
        },
        'solar-plasma': {
            title: 'Solar Plasma Simulation',
            text: 'This simulation shows how plasma behaves on the surface of a star like our Sun. Observe how the magnetic field lines shape and direct the flow of plasma. Increase the magnetic field strength to see stronger effects, or trigger a solar flare to watch a dramatic eruption of plasma.'
        },
        'fusion-reactor': {
            title: 'Fusion Reactor Simulation',
            text: 'This simulation demonstrates how a tokamak fusion reactor contains super-heated plasma using powerful magnetic fields. Adjust the temperature to see how particle collisions become more energetic, and use the confinement controls to see how magnetic fields keep the plasma from touching the reactor walls.'
        },
        'plasma-waves': {
            title: 'Plasma Waves Simulation',
            text: 'This highly interactive simulation demonstrates different types of waves that propagate through plasma. Adjust the wave frequency and amplitude using the sliders to see how they affect the wave patterns. Try different wave types (transverse, longitudinal, or spiral) to observe various plasma oscillation modes. Click anywhere on the canvas or use the "Add Perturbation" button to create ripple effects and watch how they propagate through the plasma medium.'
        },
        'z-pinch': {
            title: 'Z-Pinch Simulation',
            text: 'This simulation demonstrates the Z-pinch plasma confinement method, used in fusion research. The electric current flowing through the plasma generates a magnetic field that compresses the plasma toward the central axis. Adjust the current intensity to control the strength of the pinch effect, or pulse the current to observe rapid compression followed by relaxation.'
        },
        'cold-plasma': {
            title: 'Cold Plasma Air Purification',
            text: 'This simulation shows how cold atmospheric plasma technology can purify air by breaking down contaminants. Cold plasma contains reactive species that can neutralize pollutants and pathogens without significant heating. Adjust the discharge intensity to control the plasma strength, and add contaminants to see how the plasma discharge breaks them down through chemical reactions.'
        }
    };
    
    const titleElement = document.querySelector('.demo-description h3');
    const textElement = document.querySelector('.demo-description p');

    if (titleElement && textElement && descriptions[demoId]) {
        titleElement.textContent = descriptions[demoId].title;
        textElement.textContent = descriptions[demoId].text;
    }
}

// Active menu highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Demo controls functionality - add missing controls for cold plasma
const energySlider = document.getElementById('energy-slider');
const magneticSlider = document.getElementById('magnetic-slider');
const tempSlider = document.getElementById('temp-slider');
const dischargeSlider = document.getElementById('discharge-slider');
const touchButton = document.getElementById('touch-plasma');
const flareButton = document.getElementById('trigger-flare');
const toggleEarthButton = document.getElementById('toggle-earth-field');
const confineButton = document.getElementById('confine-plasma');
const contaminantButton = document.getElementById('add-contaminant');

// Connect sliders and buttons to the simulation if they exist
if (energySlider) {
    energySlider.addEventListener('input', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.plasmaBall) {
            window.plasmaSimulations.plasmaBall.setEnergy(this.value);
        }
    });
}

if (magneticSlider) {
    magneticSlider.addEventListener('input', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.solarPlasma) {
            window.plasmaSimulations.solarPlasma.setMagneticFieldStrength(this.value);
        }
    });
}

if (tempSlider) {
    tempSlider.addEventListener('input', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.fusionReactor) {
            window.plasmaSimulations.fusionReactor.setTemperature(this.value);
        }
    });
}

if (touchButton) {
    touchButton.addEventListener('click', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.plasmaBall) {
            window.plasmaSimulations.plasmaBall.touchPlasma();
        }
    });
}

if (flareButton) {
    flareButton.addEventListener('click', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.solarPlasma) {
            window.plasmaSimulations.solarPlasma.triggerFlare();
        }
    });
}

// Add toggle Earth field button handler
if (toggleEarthButton) {
    toggleEarthButton.addEventListener('click', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.solarPlasma) {
            window.plasmaSimulations.solarPlasma.toggleEarthField();
            // Update button text based on state
            this.classList.toggle('active');
        }
    });
}

if (confineButton) {
    confineButton.addEventListener('click', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.fusionReactor) {
            window.plasmaSimulations.fusionReactor.confinePlasma();
        }
    });
}

// Add discharge slider handler
if (dischargeSlider) {
    dischargeSlider.addEventListener('input', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.coldPlasma) {
            window.plasmaSimulations.coldPlasma.setDischargeIntensity(this.value);
            console.log('Setting discharge intensity to', this.value);
        }
    });
}

// Add contaminant button handler
if (contaminantButton) {
    contaminantButton.addEventListener('click', function() {
        if (window.plasmaSimulations && window.plasmaSimulations.coldPlasma) {
            window.plasmaSimulations.coldPlasma.addContaminant();
            console.log('Adding contaminant to cold plasma simulation');
        }
    });
} 