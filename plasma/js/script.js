// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
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
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements to be animated
    document.querySelectorAll('.section-header, .card, .resource-item, .content-columns, .interactive-container').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Demo controls functionality - add missing controls for cold plasma
    const energySlider = document.getElementById('energy-slider');
    const magneticSlider = document.getElementById('magnetic-slider');
    const tempSlider = document.getElementById('temp-slider');
    const dischargeSlider = document.getElementById('discharge-slider');
    const touchButton = document.getElementById('touch-plasma');
    const flareButton = document.getElementById('trigger-flare');
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
                window.plasmaSimulations.solarPlasma.setMagneticField(this.value);
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
}); 