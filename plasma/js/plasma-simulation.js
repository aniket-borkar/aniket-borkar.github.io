// Plasma Simulation Framework
window.plasmaSimulations = {};

// Initialize all simulations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, initializing simulations');
    
    // Initialize the global object first
    window.plasmaSimulations = {};
    
    try {
        // Initialize all simulations one by one with error handling
        console.log('Initializing hero particles');
        window.plasmaSimulations.heroParticles = initHeroParticles() || {};
        
        console.log('Initializing plasma ball');
        window.plasmaSimulations.plasmaBall = initPlasmaBall() || {};
        
        console.log('Initializing solar plasma');
        window.plasmaSimulations.solarPlasma = initSolarPlasma() || {};
        
        console.log('Initializing fusion reactor');
        window.plasmaSimulations.fusionReactor = initFusionReactor() || {};
        
        console.log('Initializing cold plasma');
        window.plasmaSimulations.coldPlasma = initColdPlasma() || {};
        
        console.log('Initializing z-pinch');
        window.plasmaSimulations.zPinch = initZPinch() || {};
        
        console.log('Initializing plasma waves');
        window.plasmaSimulations.plasmaWaves = initPlasmaWaves() || {};
        
        console.log('All simulations initialized');
    } catch (e) {
        console.error('Error initializing simulations:', e);
    }
    
    // Connect the controls only after successful initialization
    try {
        // Connect plasma ball controls
        document.getElementById('energy-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.plasmaBall?.setEnergyLevel) {
                window.plasmaSimulations.plasmaBall.setEnergyLevel(this.value);
            }
        });
        
        document.getElementById('touch-plasma')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.plasmaBall?.touchPlasma) {
                window.plasmaSimulations.plasmaBall.touchPlasma();
            }
        });
        
        // Connect solar plasma controls
        document.getElementById('magnetic-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.solarPlasma?.setMagneticField) {
                window.plasmaSimulations.solarPlasma.setMagneticField(this.value);
            }
        });
        
        document.getElementById('trigger-flare')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.solarPlasma?.triggerFlare) {
                window.plasmaSimulations.solarPlasma.triggerFlare();
            }
        });
        
        // Connect fusion reactor controls
        document.getElementById('temp-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.fusionReactor?.setTemperature) {
                window.plasmaSimulations.fusionReactor.setTemperature(this.value);
            }
        });
        
        document.getElementById('confine-plasma')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.fusionReactor?.confinePlasma) {
                window.plasmaSimulations.fusionReactor.confinePlasma();
            }
        });
        
        // Connect cold plasma controls
        document.getElementById('discharge-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.coldPlasma?.setDischargeIntensity) {
                window.plasmaSimulations.coldPlasma.setDischargeIntensity(this.value);
            }
        });
        
        document.getElementById('add-contaminant')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.coldPlasma?.addContaminant) {
                window.plasmaSimulations.coldPlasma.addContaminant();
            }
        });
        
        // Connect plasma waves controls
        document.getElementById('wave-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.plasmaWaves?.setWaveFrequency) {
                window.plasmaSimulations.plasmaWaves.setWaveFrequency(this.value);
            }
        });
        
        document.getElementById('amplitude-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.plasmaWaves?.setWaveAmplitude) {
                window.plasmaSimulations.plasmaWaves.setWaveAmplitude(this.value);
            }
        });
        
        document.getElementById('wave-type')?.addEventListener('change', function() {
            if (window.plasmaSimulations?.plasmaWaves?.setWaveType) {
                window.plasmaSimulations.plasmaWaves.setWaveType(this.value);
            }
        });
        
        document.getElementById('add-perturbation')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.plasmaWaves?.addPerturbation) {
                const canvas = document.getElementById('plasma-waves-canvas');
                if (canvas) {
                    window.plasmaSimulations.plasmaWaves.addPerturbation(
                        canvas.width / 2,
                        canvas.height / 2
                    );
                }
            }
        });
        
        // Connect z-pinch controls
        document.getElementById('current-slider')?.addEventListener('input', function() {
            if (window.plasmaSimulations?.zPinch?.setCurrentIntensity) {
                window.plasmaSimulations.zPinch.setCurrentIntensity(this.value);
            }
        });
        
        document.getElementById('pulse-current')?.addEventListener('click', function() {
            if (window.plasmaSimulations?.zPinch?.pulseCurrent) {
                window.plasmaSimulations.zPinch.pulseCurrent();
            }
        });
        
        console.log('All control events connected');
    } catch (e) {
        console.error('Error connecting control events:', e);
    }
    
    // Manually trigger a click on the first demo tab to ensure it's properly initialized
    setTimeout(function() {
        const firstTab = document.querySelector('.tab-btn');
        if (firstTab) {
            console.log('Auto-clicking first tab to initialize simulations');
            firstTab.click();
        }
    }, 500);
});

// Fix animation loops for all simulations to ensure they run correctly
function fixAnimationLoop(animate, canvas, isRunning) {
    return function() {
        if (isRunning && canvas && canvas.offsetParent !== null) {
            try {
                animate();
            } catch (e) {
                console.error('Animation error:', e);
            }
        }
        requestAnimationFrame(arguments.callee);
    };
}

// Hero Section Particles
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles
    const particles = [];
    const numParticles = 100;
    
    // Create particles
    function createParticles() {
        particles.length = 0;
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 1 + Math.random() * 3,
                speed: 0.2 + Math.random() * 0.8,
                vx: Math.random() * 0.2 - 0.1,
                vy: -0.1 - Math.random() * 0.3,
                color: `rgba(${150 + Math.random() * 105}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${0.3 + Math.random() * 0.4})`,
                pulse: 0.5 + Math.random() * 0.5,
                pulseSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }
    
    // Update particles
    function updateParticles() {
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Pulse size
            particle.pulse += particle.pulseSpeed;
            if (particle.pulse > 1 || particle.pulse < 0.5) {
                particle.pulseSpeed = -particle.pulseSpeed;
            }
            
            // Reset if out of bounds
            if (particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10) {
                particle.x = Math.random() * canvas.width;
                particle.y = canvas.height + 10;
                particle.vx = Math.random() * 0.2 - 0.1;
                particle.vy = -0.1 - Math.random() * 0.3;
            }
        });
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.pulse, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }
    
    // Animation loop
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createParticles();
    animate();
}

// Plasma Ball Simulation
function initPlasmaBall() {
    const canvas = document.getElementById('plasma-ball-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simulation parameters
    let energy = 50; // Default energy level
    let isTouching = false;
    let touchX = 0;
    let touchY = 0;
    
    // Plasma filaments
    const filaments = [];
    const numFilaments = 12;
    
    // Create initial filaments
    function createFilaments() {
        filaments.length = 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        
        for (let i = 0; i < numFilaments; i++) {
            const angle = (i / numFilaments) * Math.PI * 2;
            filaments.push({
                angle: angle,
                length: 0.5 + Math.random() * 0.5, // Random length between 0.5 and 1.0
                width: 1 + Math.random() * 2,
                speed: 0.5 + Math.random() * 1.5,
                color: `hsl(${280 + Math.random() * 60}, 100%, 70%)`,
                segments: []
            });
        }
    }
    
    // Update filament positions
    function updateFilaments() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        const energyFactor = energy / 50; // Scale based on energy slider
        
        filaments.forEach(filament => {
            // Clear previous segments
            filament.segments = [];
            
            // Calculate base angle with some wobble
            const wobble = Math.sin(Date.now() * 0.001 * filament.speed) * 0.2;
            let currentAngle = filament.angle + wobble;
            
            // Adjust angle if touching
            if (isTouching) {
                const touchAngle = Math.atan2(touchY - centerY, touchX - centerX);
                const angleDiff = Math.atan2(Math.sin(touchAngle - filament.angle), Math.cos(touchAngle - filament.angle));
                
                // If the touch is within a certain angle of the filament, attract it
                if (Math.abs(angleDiff) < Math.PI / 4) {
                    currentAngle = filament.angle + (angleDiff * 0.5);
                }
            }
            
            // Create segments for the filament
            let x = centerX;
            let y = centerY;
            const segmentLength = radius * 0.05;
            const maxSegments = Math.floor((radius * filament.length * energyFactor) / segmentLength);
            
            for (let i = 0; i < maxSegments; i++) {
                // Add some randomness to the path
                const segmentAngle = currentAngle + (Math.random() - 0.5) * 0.5;
                
                // Calculate next point
                const nextX = x + Math.cos(segmentAngle) * segmentLength;
                const nextY = y + Math.sin(segmentAngle) * segmentLength;
                
                // Add segment
                filament.segments.push({
                    x1: x,
                    y1: y,
                    x2: nextX,
                    y2: nextY,
                    opacity: 1 - (i / maxSegments)
                });
                
                // Update current position
                x = nextX;
                y = nextY;
            }
        });
    }
    
    // Draw the plasma ball
    function drawPlasmaBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.4;
        
        // Draw the glass sphere
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, 'rgba(30, 30, 50, 0.2)');
        gradient.addColorStop(0.8, 'rgba(20, 20, 40, 0.4)');
        gradient.addColorStop(1, 'rgba(10, 10, 30, 0.6)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw filaments
        filaments.forEach(filament => {
            filament.segments.forEach(segment => {
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.strokeStyle = filament.color.replace('70%)', `${70 * segment.opacity}%)`);
                ctx.lineWidth = filament.width * segment.opacity;
                ctx.lineCap = 'round';
                ctx.stroke();
            });
        });
        
        // Draw the central core
        const coreGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius * 0.15
        );
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, 'rgba(180, 100, 255, 0.8)');
        coreGradient.addColorStop(1, 'rgba(100, 50, 200, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
        
        // Draw glass reflection
        ctx.beginPath();
        ctx.ellipse(
            centerX - radius * 0.3,
            centerY - radius * 0.3,
            radius * 0.1,
            radius * 0.05,
            Math.PI / 4,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
    }
    
    // Animation loop
    function animate() {
        updateFilaments();
        drawPlasmaBall();
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createFilaments();
    animate();
    
    // Handle canvas interactions
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        touchX = e.clientX - rect.left;
        touchY = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mousedown', function() {
        isTouching = true;
    });
    
    canvas.addEventListener('mouseup', function() {
        isTouching = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
        isTouching = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        touchX = e.touches[0].clientX - rect.left;
        touchY = e.touches[0].clientY - rect.top;
        isTouching = true;
    });
    
    canvas.addEventListener('touchend', function() {
        isTouching = false;
    });
    
    // Handle touch plasma button
    const touchButton = document.getElementById('touch-plasma');
    if (touchButton) {
        touchButton.addEventListener('click', function() {
            isTouching = true;
            
            // Simulate a touch at a random position near the edge
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.4;
            const angle = Math.random() * Math.PI * 2;
            
            touchX = centerX + Math.cos(angle) * radius * 0.8;
            touchY = centerY + Math.sin(angle) * radius * 0.8;
            
            // Reset after a short delay
            setTimeout(() => {
                isTouching = false;
            }, 1500);
        });
    }
    
    // Expose methods to the global object
    window.plasmaSimulations.plasmaBall = {
        setEnergy: function(value) {
            energy = value;
        },
        touchPlasma: function() {
            if (touchButton) touchButton.click();
        }
    };
}

// Solar Plasma Simulation
function initSolarPlasma() {
    console.log('Initializing Solar Plasma simulation');
    
    // Get canvas and context
    const canvas = document.getElementById('solar-plasma-canvas');
    if (!canvas) {
        console.error('Solar Plasma canvas not found, initialization failed');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for Solar Plasma canvas');
        return null;
    }
    
    // Setup canvas dimensions
    let width = canvas.width = canvas.clientWidth || 800;
    let height = canvas.height = canvas.clientHeight || 350;
    console.log('Initial Solar Plasma canvas dimensions:', width, height);
    
    // Simulation variables
    let particles = [];
    let fieldLines = [];
    let earthMagneticFieldLines = [];
    let magneticFieldStrength = 50; // 1-100 scale
    let flareActive = false;
    let flareTime = 0;
    let isRunning = true;
    let showEarthField = true; // Toggle for Earth's magnetic field display
    let simulationSpeed = 0.5; // Simulation speed multiplier (lower = slower)
    
    // Solar flare parameters
    let flareAngle = Math.PI * -0.3;
    let flareParticles = [];
    
    // Earth parameters
    const earthRadius = height * 0.06;
    const earthX = width * 0.95;
    const earthY = height / 2;
    
    // Resize canvas and recreate elements
    function resizeCanvas() {
        width = canvas.width = canvas.clientWidth || 800;
        height = canvas.height = canvas.clientHeight || 350;
        console.log('Solar Plasma canvas resized to:', width, height);
        
        // Recreate simulation elements when resized
        createParticles();
        createFieldLines();
        createEarthMagneticField();
        
        // Force a redraw
        drawSolarPlasma();
    }
    
    // Create plasma particles
    function createParticles() {
        particles = [];
        const numParticles = 30; // Reduced from 150 to 30
        
        for (let i = 0; i < numParticles; i++) {
            // Create particles mostly near the surface
            const angle = Math.random() * Math.PI - (Math.PI / 2); // Mostly visible part of the sun
            
            // Distance from center (radius of sun is 30% of height)
            const sunRadius = height * 0.3;
            const distance = sunRadius * (0.9 + Math.random() * 0.3); // Slightly beyond surface
            
            // Particle velocities follow magnetic field lines
            const baseSpeed = 0.1 + Math.random() * 0.4; // Reduced speed
            
            particles.push({
                x: width * 0.25 + Math.cos(angle) * distance,
                y: height / 2 + Math.sin(angle) * distance,
                vx: Math.cos(angle + Math.PI/2) * baseSpeed, // Initially moving along surface
                vy: Math.sin(angle + Math.PI/2) * baseSpeed,
                radius: 0.5 + Math.random() * 1.5, // Smaller particles
                mass: 0.5 + Math.random(),
                temperature: 0.3 + Math.random() * 0.3, // Lower temperature (less bright)
                lifetime: 0,
                maxLifetime: 50 + Math.random() * 150, // Shorter lifetime
                fieldLineIndex: Math.floor(Math.random() * 8) // Which field line it's influenced by
            });
        }
    }
    
    // Create magnetic field lines
    function createFieldLines() {
        fieldLines = [];
        const numLines = 8 + Math.floor(magneticFieldStrength / 20);
        const sunRadius = height * 0.3;
        const sunCenterX = width * 0.25;
        const sunCenterY = height / 2;
        
        // Field line parameters
        const minHeight = sunRadius * 0.5;
        const maxHeight = sunRadius * (1 + magneticFieldStrength / 50);
        
        for (let i = 0; i < numLines; i++) {
            // Base angle for this field line
            const baseAngle = (i / numLines) * Math.PI * 1.2 - Math.PI * 0.1;
            
            // Height of this field line
            const lineHeight = minHeight + Math.random() * (maxHeight - minHeight);
            
            // Create a field line with control points for a bezier curve
            const fieldLine = {
                startX: sunCenterX + Math.cos(baseAngle) * sunRadius * 0.95,
                startY: sunCenterY + Math.sin(baseAngle) * sunRadius * 0.95,
                controlPoint1X: sunCenterX + Math.cos(baseAngle) * sunRadius * 1.2,
                controlPoint1Y: sunCenterY + Math.sin(baseAngle) * (sunRadius * 1.2 - lineHeight * 0.5),
                controlPoint2X: sunCenterX + Math.cos(baseAngle + 0.4) * sunRadius * 1.5,
                controlPoint2Y: sunCenterY + Math.sin(baseAngle) * (sunRadius - lineHeight),
                endX: sunCenterX + Math.cos(baseAngle + 0.8) * sunRadius * 1.8,
                endY: sunCenterY + Math.sin(baseAngle) * (sunRadius - lineHeight * 0.7),
                strength: 0.7 + Math.random() * 0.3,
                phase: Math.random() * Math.PI * 2
            };
            
            fieldLines.push(fieldLine);
        }
    }
    
    // Create magnetic field lines for Earth
    function createEarthMagneticField() {
        earthMagneticFieldLines = [];
        const numLines = 16; // Increased from 12 to 16 lines for more detail
        
        for (let i = 0; i < numLines; i++) {
            // Create field lines distributed around Earth
            const angle = (i / numLines) * Math.PI * 2;
            
            // Field line strength is affected by solar wind/flares
            const fieldStrength = flareActive ? 0.7 : 1.0; // Increased strength
            const fieldDistortion = flareActive ? (1 - Math.cos(angle) * 0.7) : 1;
            
            // Field line parameters based on angle
            const lineLength = earthRadius * 3.0 * fieldDistortion; // Increased from 2.5 to 3.0
            
            // Create a field line with control points for a bezier curve
            // North pole field lines
            if (i < numLines / 2) {
                const polarAngle = angle;
                earthMagneticFieldLines.push({
                    startX: earthX + Math.cos(polarAngle) * (earthRadius * 0.9),
                    startY: earthY + Math.sin(polarAngle) * (earthRadius * 0.9),
                    controlPoint1X: earthX + Math.cos(polarAngle) * (earthRadius * 1.8), // Increased from 1.6
                    controlPoint1Y: earthY + Math.sin(polarAngle) * (earthRadius * 1.8), // Increased from 1.6
                    controlPoint2X: earthX + Math.cos(polarAngle + Math.PI) * (earthRadius * 1.8), // Increased from 1.6
                    controlPoint2Y: earthY + Math.sin(polarAngle + Math.PI) * (earthRadius * 1.8), // Increased from 1.6
                    endX: earthX + Math.cos(polarAngle + Math.PI) * (earthRadius * 0.9),
                    endY: earthY + Math.sin(polarAngle + Math.PI) * (earthRadius * 0.9),
                    strength: fieldStrength,
                    phase: Math.random() * Math.PI * 2
                });
            } 
            // Additional field lines for the side facing the sun - compressed by solar wind
            else {
                const solarDirection = Math.atan2(earthY - height/2, earthX - width * 0.25);
                const compression = flareActive ? 0.4 : 0.6; // More compression (was 0.5/0.7)
                const expansionBack = 1.5; // More expansion on the night side (was 1.2)
                
                // Get angle relative to sun
                const relativeAngle = angle - solarDirection;
                
                // More compression on sun-facing side
                const distortionFactor = Math.cos(relativeAngle) < 0 ? 
                    compression + (1 - compression) * Math.abs(Math.cos(relativeAngle)) : 
                    expansionBack;
                
                const lineStart = {
                    x: earthX + Math.cos(angle) * earthRadius,
                    y: earthY + Math.sin(angle) * earthRadius
                };
                
                const lineEnd = {
                    x: earthX + Math.cos(angle) * (earthRadius * 3.0 * distortionFactor), // Increased from 2.5 to 3.0
                    y: earthY + Math.sin(angle) * (earthRadius * 3.0 * distortionFactor)  // Increased from 2.5 to 3.0
                };
                
                earthMagneticFieldLines.push({
                    startX: lineStart.x,
                    startY: lineStart.y,
                    controlPoint1X: earthX + Math.cos(angle) * (earthRadius * 1.5 * distortionFactor), // Increased from 1.3
                    controlPoint1Y: earthY + Math.sin(angle) * (earthRadius * 1.5 * distortionFactor), // Increased from 1.3
                    controlPoint2X: earthX + Math.cos(angle) * (earthRadius * 2.2 * distortionFactor), // Increased from 1.8
                    controlPoint2Y: earthY + Math.sin(angle) * (earthRadius * 2.2 * distortionFactor), // Increased from 1.8
                    endX: lineEnd.x,
                    endY: lineEnd.y,
                    strength: fieldStrength * 0.8, // Increased from 0.7
                    phase: Math.random() * Math.PI * 2,
                    isMagnetosphere: true
                });
            }
        }
    }
    
    // Update Earth's magnetic field lines (add some movement and respond to solar flares)
    function updateEarthMagneticField() {
        const time = Date.now() / 1000;
        const sunCenterX = width * 0.25;
        const sunCenterY = height / 2;
        const sunToEarthAngle = Math.atan2(earthY - sunCenterY, earthX - sunCenterX);
        
        earthMagneticFieldLines.forEach((line, index) => {
            // Add some subtle oscillation
            const oscillation = Math.sin(time * 0.5 + line.phase) * 2 * simulationSpeed;
            
            // Different behavior for magnetosphere lines vs polar field lines
            if (line.isMagnetosphere) {
                // Adjust field lines based on flare presence
                if (flareActive) {
                    // Calculate angle between line and sun-earth line
                    const lineAngle = Math.atan2(line.endY - earthY, line.endX - earthX);
                    const angleDiff = Math.abs(normalizeAngle(lineAngle - sunToEarthAngle));
                    
                    // Lines facing sun are pushed back more
                    const compressionFactor = angleDiff < Math.PI/2 ? 
                        5 * (1 - angleDiff/(Math.PI/2)) * flareTime/10 * simulationSpeed : 0;
                    
                    // Add compression effect
                    line.controlPoint1X += oscillation * 0.05;
                    line.controlPoint1Y += oscillation * 0.05;
                    line.controlPoint2X += oscillation * 0.05;
                    line.controlPoint2Y += oscillation * 0.05;
                    
                    // Compress the field in direction of solar flare
                    if (angleDiff < Math.PI/2) {
                        const pushDirection = sunToEarthAngle + Math.PI; // Away from sun
                        line.controlPoint1X += Math.cos(pushDirection) * compressionFactor;
                        line.controlPoint1Y += Math.sin(pushDirection) * compressionFactor;
                        line.controlPoint2X += Math.cos(pushDirection) * compressionFactor * 0.7;
                        line.controlPoint2Y += Math.sin(pushDirection) * compressionFactor * 0.7;
                        line.endX += Math.cos(pushDirection) * compressionFactor * 0.4;
                        line.endY += Math.sin(pushDirection) * compressionFactor * 0.4;
                    }
                } else {
                    // Normal oscillation when no flare
                    line.controlPoint1X += oscillation * 0.05;
                    line.controlPoint1Y += oscillation * 0.05;
                    line.controlPoint2X += oscillation * 0.03;
                    line.controlPoint2Y += oscillation * 0.03;
                    line.endX += oscillation * 0.02;
                    line.endY += oscillation * 0.02;
                }
            } else {
                // Update polar field lines with subtle movement
                line.controlPoint1X += oscillation * 0.05;
                line.controlPoint1Y += oscillation * 0.05;
                line.controlPoint2X += oscillation * 0.05;
                line.controlPoint2Y += oscillation * 0.05;
            }
        });
    }
    
    // Helper function to normalize angle between -PI and PI
    function normalizeAngle(angle) {
        return angle - Math.floor((angle + Math.PI) / (Math.PI * 2)) * Math.PI * 2;
    }
    
    // Trigger a solar flare
    function triggerFlare() {
        if (flareActive) return;
        
        flareActive = true;
        flareTime = 0;
        
        // Calculate angle from Sun to Earth for directed flare
        const sunCenterX = width * 0.25;
        const sunCenterY = height / 2;
        flareAngle = Math.atan2(earthY - sunCenterY, earthX - sunCenterX);
        
        flareParticles = [];
        
        // Create flare particles traveling toward Earth
        const numFlareParticles = 40 + Math.floor(Math.random() * 20);
        const sunRadius = height * 0.3;
        
        for (let i = 0; i < numFlareParticles; i++) {
            // Angle variation within a narrower cone directed at Earth
            const particleAngle = flareAngle + (Math.random() - 0.5) * Math.PI * 0.15; // Narrower spread
            const speed = (1 + Math.random() * 2) * simulationSpeed; // Apply simulation speed to initial velocity
            
            flareParticles.push({
                x: sunCenterX + Math.cos(particleAngle) * sunRadius,
                y: sunCenterY + Math.sin(particleAngle) * sunRadius,
                vx: Math.cos(particleAngle) * speed,
                vy: Math.sin(particleAngle) * speed,
                size: 1 + Math.random() * 3,
                alpha: 0.7 + Math.random() * 0.3,
                energy: 0.8 + Math.random() * 0.2,
                lifetime: 0,
                maxLifetime: (100 + Math.random() * 150) / simulationSpeed // Increase lifetime to account for slower movement
            });
        }
        
        console.log('Solar flare triggered toward Earth');
        
        // Recreate Earth's magnetic field to show compression
        createEarthMagneticField();
    }
    
    // Update field lines (add some movement)
    function updateFieldLines() {
        const time = Date.now() / 1000;
        
        fieldLines.forEach((line, index) => {
            // Add some oscillation to field lines
            const oscillation = Math.sin(time * 0.5 + line.phase) * 5 * simulationSpeed;
            
            line.controlPoint1Y += oscillation * 0.05;
            line.controlPoint2Y += oscillation * 0.03;
            line.endY += oscillation * 0.02;
            
            // During flares, make field lines more chaotic
            if (flareActive) {
                const flareEffect = Math.sin(flareTime * 0.2 + index) * (flareTime < 10 ? flareTime : 20 - flareTime) * simulationSpeed;
                
                line.controlPoint1X += Math.sin(time + line.phase) * flareEffect * 0.3;
                line.controlPoint1Y += Math.cos(time + line.phase) * flareEffect * 0.3;
                line.controlPoint2X += Math.sin(time * 1.1 + line.phase) * flareEffect * 0.4;
                line.controlPoint2Y += Math.cos(time * 1.1 + line.phase) * flareEffect * 0.4;
                line.endX += Math.sin(time * 1.2 + line.phase) * flareEffect * 0.5;
                line.endY += Math.cos(time * 1.2 + line.phase) * flareEffect * 0.5;
            }
            
            // Keep values within reasonable ranges
            const sunCenterY = height / 2;
            const maxDeviation = height * 0.3;
            
            line.controlPoint1Y = Math.max(sunCenterY - maxDeviation, Math.min(sunCenterY + maxDeviation, line.controlPoint1Y));
            line.controlPoint2Y = Math.max(sunCenterY - maxDeviation, Math.min(sunCenterY + maxDeviation, line.controlPoint2Y));
            line.endY = Math.max(sunCenterY - maxDeviation, Math.min(sunCenterY + maxDeviation, line.endY));
        });
    }
    
    // Update particles
    function updateParticles() {
        const sunCenterX = width * 0.25;
        const sunCenterY = height / 2;
        const sunRadius = height * 0.3;
        
        // Update flare state if active
        if (flareActive) {
            flareTime += 0.1 * simulationSpeed;
            if (flareTime > 20) {
                flareActive = false;
            }
        }
        
        // Update each particle
        particles.forEach((particle, index) => {
            // Calculate distance from sun center
            const dx = particle.x - sunCenterX;
            const dy = particle.y - sunCenterY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            
            // Gravitational pull towards sun (stronger when closer)
            const gravityStrength = 0.01 * (1 + 5 / (distanceFromCenter / sunRadius)) * simulationSpeed;
            const gravityAngle = Math.atan2(sunCenterY - particle.y, sunCenterX - particle.x);
            
            particle.vx += Math.cos(gravityAngle) * gravityStrength;
            particle.vy += Math.sin(gravityAngle) * gravityStrength;
            
            // Influence from magnetic field lines
            if (particle.fieldLineIndex < fieldLines.length) {
                const fieldLine = fieldLines[particle.fieldLineIndex];
                
                // Calculate closest point on the field line (simplified)
                const fieldDir = {
                    x: fieldLine.endX - fieldLine.startX,
                    y: fieldLine.endY - fieldLine.startY
                };
                const particleToFieldStart = {
                    x: particle.x - fieldLine.startX,
                    y: particle.y - fieldLine.startY
                };
                
                // Dot product for projection
                const dotProduct = fieldDir.x * particleToFieldStart.x + fieldDir.y * particleToFieldStart.y;
                const fieldLengthSq = fieldDir.x * fieldDir.x + fieldDir.y * fieldDir.y;
                const projection = Math.max(0, Math.min(1, dotProduct / fieldLengthSq));
                
                // Point on field line
                const fieldX = fieldLine.startX + projection * fieldDir.x;
                const fieldY = fieldLine.startY + projection * fieldDir.y;
                
                // Direction from particle to field line
                const toFieldX = fieldX - particle.x;
                const toFieldY = fieldY - particle.y;
                const distToField = Math.sqrt(toFieldX * toFieldX + toFieldY * toFieldY);
                
                // Apply force towards field line (stronger when close to sun)
                const fieldStrength = 0.01 * fieldLine.strength * (sunRadius / distanceFromCenter) * simulationSpeed;
                
                if (distToField > 1) {
                    particle.vx += (toFieldX / distToField) * fieldStrength;
                    particle.vy += (toFieldY / distToField) * fieldStrength;
                }
                
                // Add some movement along the field line
                const tangentX = fieldDir.x;
                const tangentY = fieldDir.y;
                const tangentLength = Math.sqrt(tangentX * tangentX + tangentY * tangentY);
                
                if (tangentLength > 0) {
                    particle.vx += (tangentX / tangentLength) * 0.01 * simulationSpeed;
                    particle.vy += (tangentY / tangentLength) * 0.01 * simulationSpeed;
                }
            }
            
            // During solar flares, add explosive forces
            if (flareActive && flareTime < 10 && Math.random() < 0.1 * simulationSpeed) {
                const flareAngle = Math.random() * Math.PI - Math.PI/2;
                const flareForce = 0.2 * (10 - flareTime) / 10 * simulationSpeed;
                
                particle.vx += Math.cos(flareAngle) * flareForce;
                particle.vy += Math.sin(flareAngle) * flareForce;
                
                // Heat up particles during flare
                particle.temperature = Math.min(1.0, particle.temperature + 0.01 * simulationSpeed);
            }
            
            // Apply some drag/damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Update position
            particle.x += particle.vx * simulationSpeed;
            particle.y += particle.vy * simulationSpeed;
            
            // Particles that go too far get recycled
            if (distanceFromCenter > sunRadius * 3 || particle.lifetime > particle.maxLifetime) {
                // Reset particle near sun surface
                const angle = Math.random() * Math.PI - (Math.PI / 2);
                particle.x = sunCenterX + Math.cos(angle) * sunRadius * 0.9;
                particle.y = sunCenterY + Math.sin(angle) * sunRadius * 0.9;
                particle.vx = Math.cos(angle + Math.PI/2) * (0.1 + Math.random() * 0.4); // Reduced speed
                particle.vy = Math.sin(angle + Math.PI/2) * (0.1 + Math.random() * 0.4); // Reduced speed
                particle.lifetime = 0;
                particle.maxLifetime = 50 + Math.random() * 150; // Shorter lifetime
                particle.temperature = 0.3 + Math.random() * 0.3; // Lower temperature (less bright)
                particle.radius = 0.5 + Math.random() * 1.5; // Smaller particles
                particle.fieldLineIndex = Math.floor(Math.random() * fieldLines.length);
            } else {
                particle.lifetime += simulationSpeed;
            }
        });
    }
    
    // Draw the solar plasma
    function drawSolarPlasma() {
        ctx.clearRect(0, 0, width, height);
        
        const sunCenterX = width * 0.25;
        const sunCenterY = height / 2;
        const sunRadius = height * 0.3;
        
        // Draw background gradient with more rich colors
        const bgGradient = ctx.createLinearGradient(0, 0, width, height);
        bgGradient.addColorStop(0, '#050510');
        bgGradient.addColorStop(0.5, '#101030');
        bgGradient.addColorStop(1, '#151525');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw distant nebula for atmosphere
        ctx.globalAlpha = 0.15;
        for (let i = 0; i < 3; i++) {
            const nebulaX = width * (0.3 + Math.random() * 0.6);
            const nebulaY = height * (0.2 + Math.random() * 0.6);
            const nebulaRadius = height * (0.1 + Math.random() * 0.3);
            
            const nebulaGradient = ctx.createRadialGradient(
                nebulaX, nebulaY, 0,
                nebulaX, nebulaY, nebulaRadius
            );
            
            // Random nebula colors
            const hue = 180 + Math.random() * 60;
            nebulaGradient.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.2)`);
            nebulaGradient.addColorStop(1, `hsla(${hue}, 80%, 30%, 0)`);
            
            ctx.fillStyle = nebulaGradient;
            ctx.beginPath();
            ctx.arc(nebulaX, nebulaY, nebulaRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        
        // Draw stars in background with virtually no movement (effectively static)
        for (let i = 0; i < 100; i++) {  // Reduced from 150 to 100 stars
            const starX = Math.random() * width;
            const starY = Math.random() * height;
            const starSize = Math.random() * 1.5;  // Slightly smaller stars
            
            // Stars are now essentially fixed - divisor made extremely large
            // This removes almost all noticeable twinkling/movement
            const brightness = 0.5 + Math.random() * 0.2;  // Fixed brightness without sine variation
            
            // Avoid drawing stars too close to the sun
            const distToSun = Math.sqrt(Math.pow(starX - sunCenterX, 2) + Math.pow(starY - sunCenterY, 2));
            if (distToSun < sunRadius * 1.5) continue;
            
            // Different star colors
            const colorValue = Math.floor(200 + Math.random() * 55);
            ctx.fillStyle = `rgba(${colorValue}, ${colorValue}, ${255}, ${brightness})`;
            
            ctx.beginPath();
            ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw faint glow around sun with more intense corona
        const glowGradient = ctx.createRadialGradient(
            sunCenterX, sunCenterY, sunRadius * 0.8,
            sunCenterX, sunCenterY, sunRadius * 2.5
        );
        glowGradient.addColorStop(0, 'rgba(255, 200, 50, 0.4)');
        glowGradient.addColorStop(0.3, 'rgba(255, 150, 30, 0.2)');
        glowGradient.addColorStop(0.7, 'rgba(255, 100, 30, 0.1)');
        glowGradient.addColorStop(1, 'rgba(255, 50, 30, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(sunCenterX, sunCenterY, sunRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sun with more dynamic gradient
        const sunGradient = ctx.createRadialGradient(
            sunCenterX - sunRadius * 0.2, sunCenterY - sunRadius * 0.2, 0,
            sunCenterX, sunCenterY, sunRadius
        );
        
        // Base sun colors
        sunGradient.addColorStop(0, 'rgba(255, 255, 220, 1)');
        sunGradient.addColorStop(0.5, 'rgba(255, 200, 50, 1)');
        sunGradient.addColorStop(0.8, 'rgba(255, 140, 30, 1)');
        sunGradient.addColorStop(1, 'rgba(200, 60, 20, 1)');
        
        // During flares, make sun brighter and more dramatic
        if (flareActive) {
            sunGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            sunGradient.addColorStop(0.3, 'rgba(255, 230, 150, 1)');
            sunGradient.addColorStop(0.6, 'rgba(255, 180, 50, 1)');
            sunGradient.addColorStop(1, 'rgba(255, 80, 30, 1)');
        }
        
        ctx.fillStyle = sunGradient;
        ctx.beginPath();
        ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw magnetic field lines with better visibility
        ctx.lineWidth = 1.5;
        fieldLines.forEach((line, index) => {
            // Gradient for field lines
            const fieldGradient = ctx.createLinearGradient(
                line.startX, line.startY,
                line.endX, line.endY
            );
            
            fieldGradient.addColorStop(0, 'rgba(255, 200, 100, 0.5)');
            fieldGradient.addColorStop(0.5, 'rgba(255, 150, 100, 0.3)');
            fieldGradient.addColorStop(1, 'rgba(255, 100, 100, 0.1)');
            
            // If magnetic field is strong, make lines more vibrant
            if (magneticFieldStrength > 75) {
                fieldGradient.addColorStop(0, 'rgba(255, 220, 150, 0.7)');
                fieldGradient.addColorStop(1, 'rgba(255, 150, 150, 0.3)');
            }
            
            ctx.strokeStyle = fieldGradient;
            ctx.globalAlpha = 0.7 * line.strength;
            
            // Draw magnetic field arc
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.bezierCurveTo(
                line.controlPoint1X, line.controlPoint1Y,
                line.controlPoint2X, line.controlPoint2Y,
                line.endX, line.endY
            );
            ctx.stroke();
        });
        ctx.globalAlpha = 1.0;
        
        // Draw solar prominences (loops extending from sun surface)
        if (magneticFieldStrength > 30) {
            const numProminences = Math.floor(3 + magneticFieldStrength / 20);
            
            for (let i = 0; i < numProminences; i++) {
                const angle = (i / numProminences) * Math.PI - Math.PI/2;
                const prominenceHeight = sunRadius * (0.3 + (magneticFieldStrength / 100) * 0.4);
                
                const startX = sunCenterX + Math.cos(angle - 0.1) * sunRadius;
                const startY = sunCenterY + Math.sin(angle - 0.1) * sunRadius;
                const peakX = sunCenterX + Math.cos(angle) * (sunRadius + prominenceHeight);
                const peakY = sunCenterY + Math.sin(angle) * (sunRadius + prominenceHeight);
                const endX = sunCenterX + Math.cos(angle + 0.1) * sunRadius;
                const endY = sunCenterY + Math.sin(angle + 0.1) * sunRadius;
                
                // Control points for the loop
                const ctrl1X = sunCenterX + Math.cos(angle - 0.05) * (sunRadius + prominenceHeight * 0.8);
                const ctrl1Y = sunCenterY + Math.sin(angle - 0.05) * (sunRadius + prominenceHeight * 0.8);
                const ctrl2X = sunCenterX + Math.cos(angle + 0.05) * (sunRadius + prominenceHeight * 0.8);
                const ctrl2Y = sunCenterY + Math.sin(angle + 0.05) * (sunRadius + prominenceHeight * 0.8);
                
                // Add some randomization for dynamic effect
                const jitter = Math.sin(Date.now() / 1000 + i * 10) * 5;
                
                // Draw the prominence
            ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.bezierCurveTo(
                    ctrl1X, ctrl1Y + jitter,
                    ctrl2X, ctrl2Y + jitter,
                    endX, endY
                );
                
                // Use a gradient for the prominence
                const promGradient = ctx.createLinearGradient(startX, startY, peakX, peakY);
                promGradient.addColorStop(0, 'rgba(255, 150, 50, 0.7)');
                promGradient.addColorStop(0.5, 'rgba(255, 100, 50, 0.5)');
                promGradient.addColorStop(1, 'rgba(255, 50, 50, 0.7)');
                
                ctx.strokeStyle = promGradient;
                ctx.lineWidth = 2 + Math.random() * 2;
                ctx.stroke();
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            // Particles glow based on temperature and lifetime
            const particleOpacity = Math.min(0.4, (particle.maxLifetime - particle.lifetime) / particle.maxLifetime * 0.6); // Reduced opacity
            
            // Color based on temperature (white-yellow-orange-red)
            let particleColor;
            if (particle.temperature > 0.8) {
                particleColor = `rgba(255, 255, ${Math.floor(220 * (particle.temperature - 0.8) * 5)}, ${particleOpacity})`;
            } else if (particle.temperature > 0.6) {
                particleColor = `rgba(255, ${Math.floor(200 + 55 * (particle.temperature - 0.6) * 5)}, 50, ${particleOpacity})`;
            } else {
                particleColor = `rgba(255, ${Math.floor(120 + 80 * particle.temperature)}, 30, ${particleOpacity})`;
            }
            
            // Draw glow around particle
            const glowSize = particle.radius * (0.8 + particle.temperature); // Reduced glow size
            const glow = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowSize
            );
            
            glow.addColorStop(0, particleColor);
            glow.addColorStop(1, 'rgba(255, 100, 50, 0)');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw particle core
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw solar flare effect
        if (flareActive) {
            const flareIntensity = flareTime < 10 ? flareTime / 10 : (20 - flareTime) / 10;
            const flareWidth = Math.PI * 0.15; // Narrower angular width matching the particle spread
            const flareLength = sunRadius * (1.5 + flareIntensity);
            
            // Draw the main flare cone directed toward Earth
            ctx.beginPath();
            ctx.moveTo(sunCenterX, sunCenterY);
            ctx.arc(sunCenterX, sunCenterY, sunRadius, 
                    flareAngle - flareWidth/2, 
                    flareAngle + flareWidth/2);
            ctx.closePath();
            
            const flareGradient = ctx.createRadialGradient(
                sunCenterX, sunCenterY, sunRadius,
                sunCenterX, sunCenterY, sunRadius + flareLength
            );
            
            flareGradient.addColorStop(0, 'rgba(255, 255, 220, 0.8)');
            flareGradient.addColorStop(0.3, 'rgba(255, 200, 50, 0.6)');
            flareGradient.addColorStop(0.6, 'rgba(255, 150, 50, 0.4)');
            flareGradient.addColorStop(1, 'rgba(255, 100, 50, 0)');
            
            
            ctx.fillStyle = flareGradient;
            ctx.fill();
            
            // Draw flare particles
            const numFlareParticles = 20 + flareIntensity * 30;
            
            for (let i = 0; i < numFlareParticles; i++) {
                const particleAngle = flareAngle + (Math.random() - 0.5) * flareWidth;
                const distance = sunRadius + Math.random() * flareLength;
                const particleSize = 1 + Math.random() * 3 * flareIntensity;
                
                const px = sunCenterX + Math.cos(particleAngle) * distance;
                const py = sunCenterY + Math.sin(particleAngle) * distance;
                
                const particleGradient = ctx.createRadialGradient(
                    px, py, 0,
                    px, py, particleSize * 2
                );
                
                particleGradient.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
                particleGradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
                
                ctx.fillStyle = particleGradient;
                ctx.beginPath();
                ctx.arc(px, py, particleSize * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Draw Earth and its magnetic field
        if (showEarthField) {
            // Draw Earth's magnetosphere field lines
            earthMagneticFieldLines.forEach((line, index) => {
                // Create gradient for field lines
                const fieldGradient = ctx.createLinearGradient(
                    line.startX, line.startY, 
                    line.endX, line.endY
                );
                
                // Different colors for different types of field lines - more vivid colors
                if (line.isMagnetosphere) {
                    fieldGradient.addColorStop(0, 'rgba(140, 200, 255, 0.8)'); // Brighter blue and more opaque
                    fieldGradient.addColorStop(1, 'rgba(100, 150, 255, 0.25)'); // More visible at the ends
                } else {
                    fieldGradient.addColorStop(0, 'rgba(120, 180, 255, 0.7)'); // Brighter and more opaque
                    fieldGradient.addColorStop(0.5, 'rgba(90, 150, 255, 0.5)'); // More visible in the middle
                    fieldGradient.addColorStop(1, 'rgba(120, 180, 255, 0.7)'); // Brighter and more opaque
                }
                
                ctx.strokeStyle = fieldGradient;
                ctx.lineWidth = 2.5 * line.strength; // Increased from 1.5 to 2.5
                
                // Draw field line
                ctx.beginPath();
                ctx.moveTo(line.startX, line.startY);
                ctx.bezierCurveTo(
                    line.controlPoint1X, line.controlPoint1Y,
                    line.controlPoint2X, line.controlPoint2Y,
                    line.endX, line.endY
                );
                ctx.stroke();
                
                // Add a subtle glow effect to the field lines
                ctx.strokeStyle = 'rgba(80, 130, 255, 0.2)';
                ctx.lineWidth = 4.0 * line.strength; // Wider for glow effect
                ctx.beginPath();
                ctx.moveTo(line.startX, line.startY);
                ctx.bezierCurveTo(
                    line.controlPoint1X, line.controlPoint1Y,
                    line.controlPoint2X, line.controlPoint2Y,
                    line.endX, line.endY
                );
                ctx.stroke();
            });
            
            // Draw flare particles traveling from sun to Earth
            flareParticles.forEach(particle => {
                // Calculate opacity based on lifetime
                const opacity = Math.min(1, (particle.maxLifetime - particle.lifetime) / particle.maxLifetime);
                
                // Gradient for particle glow
                const particleGradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                
                // Color based on energy and interaction with Earth's field
                const distanceToEarth = Math.sqrt(Math.pow(particle.x - earthX, 2) + Math.pow(particle.y - earthY, 2));
                const earthInfluence = Math.max(0, (earthRadius * 3 - distanceToEarth) / (earthRadius * 3));
                
                let r = 255;
                let g = 200 + Math.floor(particle.energy * 55);
                let b = 100 + Math.floor(earthInfluence * 155);
                
                particleGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * particle.alpha})`);
                particleGradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
                
                // Draw particle glow
                ctx.fillStyle = particleGradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw particle core
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * particle.alpha})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw particle trail if in Earth's magnetic field
                if (earthInfluence > 0.1) {
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
            ctx.stroke();
                }
            });
            
            // Draw Earth
            // Earth atmosphere glow
            const earthGlow = ctx.createRadialGradient(
                earthX, earthY, earthRadius * 0.9,
                earthX, earthY, earthRadius * 1.2
            );
            earthGlow.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
            earthGlow.addColorStop(1, 'rgba(70, 120, 255, 0)');
            
            ctx.fillStyle = earthGlow;
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthRadius * 1.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Earth body
            // Calculate the direction to the sun to determine day/night sides
            const sunDirection = Math.atan2(sunCenterY - earthY, sunCenterX - earthX);
            
            // Create a gradient for day-night transition
            const earthGradient = ctx.createRadialGradient(
                earthX - earthRadius * 0.2, earthY - earthRadius * 0.2, 0,
                earthX, earthY, earthRadius
            );
            
            // Day side of Earth
            earthGradient.addColorStop(0, 'rgba(70, 140, 220, 1)');
            earthGradient.addColorStop(0.5, 'rgba(50, 120, 200, 1)');
            earthGradient.addColorStop(0.85, 'rgba(40, 90, 180, 1)');
            earthGradient.addColorStop(1, 'rgba(30, 70, 160, 1)');
            
            ctx.fillStyle = earthGradient;
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw night side as an overlay
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthRadius, sunDirection - Math.PI/2, sunDirection + Math.PI/2);
            ctx.lineTo(earthX, earthY);
            ctx.closePath();
            
            ctx.fillStyle = 'rgba(10, 20, 40, 0.7)';
            ctx.fill();
            
            // Add some land features (continents)
            ctx.fillStyle = 'rgba(40, 180, 100, 0.7)';
            for (let i = 0; i < 7; i++) {
                const continentAngle = i * (Math.PI * 2 / 7) + Date.now() / 10000; // Slow rotation
                const continentDistance = earthRadius * 0.7;
                const continentX = earthX + Math.cos(continentAngle) * continentDistance;
                const continentY = earthY + Math.sin(continentAngle) * continentDistance;
                const continentSize = earthRadius * (0.2 + Math.random() * 0.2);
                
                ctx.beginPath();
                // Create irregular shape for continent
                ctx.moveTo(continentX, continentY);
                
                for (let j = 0; j < 8; j++) {
                    const angle = j * (Math.PI * 2 / 8);
                    const radius = continentSize * (0.6 + Math.random() * 0.4);
                    const x = continentX + Math.cos(angle) * radius;
                    const y = continentY + Math.sin(angle) * radius;
                    
                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.closePath();
                
                // Only draw if within Earth's circle
                ctx.save();
                ctx.globalCompositeOperation = 'source-atop';
                ctx.clip();
                ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            // Add Earth glow effects
            if (flareActive) {
                // Aurora effect when flare is active
                const auroraIntensity = Math.min(1, flareTime/10);
                
                // Draw auroras near the poles
                for (let i = 0; i < 2; i++) {
                    const poleY = earthY + (i === 0 ? -0.7 : 0.7) * earthRadius;
                    
                    const auroraGradient = ctx.createRadialGradient(
                        earthX, poleY, earthRadius * 0.3,
                        earthX, poleY, earthRadius * 0.7
                    );
                    
                    const auroraColor = i === 0 ? 
                        `rgba(50, 200, 100, ${0.3 * auroraIntensity})` : 
                        `rgba(70, 150, 255, ${0.3 * auroraIntensity})`;
                        
                    auroraGradient.addColorStop(0, auroraColor);
                    auroraGradient.addColorStop(1, 'rgba(50, 100, 255, 0)');
                    
                    ctx.fillStyle = auroraGradient;
                ctx.beginPath();
                    ctx.ellipse(
                        earthX, poleY,
                        earthRadius * 0.7, earthRadius * 0.3,
                        0, 0, Math.PI * 2
                    );
                ctx.fill();
            }
        }
        
            // Add a subtle shine/reflection on top of Earth
            const shineGradient = ctx.createRadialGradient(
                earthX - earthRadius * 0.3, earthY - earthRadius * 0.3, 0,
                earthX - earthRadius * 0.3, earthY - earthRadius * 0.3, earthRadius * 0.5
            );
            
            shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = shineGradient;
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw Earth-Sun connection label
        if (showEarthField) {
            // Draw connection line
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sunCenterX + sunRadius, sunCenterY);
            ctx.lineTo(earthX - earthRadius, earthY);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Add distance label
            ctx.fillStyle = 'rgba(200, 230, 255, 0.8)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            const midX = sunCenterX + (earthX - sunCenterX) * 0.6;
            const midY = (sunCenterY + earthY) / 2 - 15;
            ctx.fillText('~150 million km', midX, midY);
            
            // Add flare travel time label if flare is active
            if (flareActive) {
                ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
                ctx.fillText('Solar flare travel time: ~8 minutes', midX, midY + 20);
            }
        }
        
        // Draw HUD-style magnetic field strength indicator
        const indicatorX = width - 30;
        const indicatorY = 20;
        const indicatorWidth = 15;
        const indicatorHeight = 100;
        
        // Background for indicator
        ctx.fillStyle = 'rgba(0, 20, 40, 0.5)';
        ctx.fillRect(indicatorX - 5, indicatorY - 5, indicatorWidth + 10, indicatorHeight + 10);
        
        // Fill level based on magnetic field strength
        const fillHeight = indicatorHeight * (magneticFieldStrength / 100);
        
        // Gradient fill for better visualization
        const fillGradient = ctx.createLinearGradient(
            indicatorX, indicatorY + indicatorHeight,
            indicatorX, indicatorY
        );
        
        fillGradient.addColorStop(0, 'rgba(50, 120, 255, 0.7)');
        fillGradient.addColorStop(0.5, 'rgba(80, 160, 255, 0.7)');
        fillGradient.addColorStop(1, 'rgba(120, 200, 255, 0.7)');
        
        ctx.fillStyle = fillGradient;
        ctx.fillRect(indicatorX, indicatorY + indicatorHeight - fillHeight, indicatorWidth, fillHeight);
        
        // Border for indicator
        ctx.strokeStyle = 'rgba(150, 200, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(indicatorX, indicatorY, indicatorWidth, indicatorHeight);
        
        // Draw scale markers
        ctx.strokeStyle = 'rgba(150, 200, 255, 0.6)';
        for (let i = 0; i <= 10; i++) {
            const y = indicatorY + indicatorHeight * (1 - i/10);
            const tickLength = (i % 5 === 0) ? 8 : 4;
            
            ctx.beginPath();
            ctx.moveTo(indicatorX - tickLength, y);
            ctx.lineTo(indicatorX, y);
            ctx.stroke();
            
            // Add labels for major ticks
            if (i % 5 === 0) {
                ctx.fillStyle = 'rgba(200, 230, 255, 0.9)';
                ctx.font = '10px Arial';
                ctx.textAlign = 'right';
                ctx.fillText(`${i*10}`, indicatorX - 12, y + 3);
            }
        }
        
        // Labels
        ctx.fillStyle = 'rgba(200, 230, 255, 0.9)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Field Strength', indicatorX - 40, indicatorY - 10);
        
        // Add current value
        ctx.fillStyle = 'rgba(220, 255, 255, 1)';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${magneticFieldStrength}%`, indicatorX - 25, indicatorY + indicatorHeight + 20);
        
        // Add data display for solar activity
        ctx.fillStyle = 'rgba(0, 20, 40, 0.5)';
        ctx.fillRect(20, 20, 180, 90);
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.6)';
        ctx.strokeRect(20, 20, 180, 90);
        
        ctx.fillStyle = 'rgba(200, 230, 255, 0.9)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('SOLAR ACTIVITY MONITOR', 30, 40);
        
        ctx.font = '11px Arial';
        ctx.fillText(`Magnetic Flux: ${Math.floor(magneticFieldStrength * 1.2)} μT`, 30, 60);
        ctx.fillText(`Corona Temp: ${Math.floor(1.2 + magneticFieldStrength/100 * 0.8)} MK`, 30, 80);
        
        // Flare status indicator
        const flareStatus = flareActive ? 'ACTIVE' : 'INACTIVE';
        const flareColor = flareActive ? 'rgba(255, 100, 50, 1)' : 'rgba(100, 200, 100, 1)';
        
        ctx.fillStyle = flareColor;
        ctx.fillText(`Flare Status: ${flareStatus}`, 30, 100);
        
        // Add Earth magnetic field information box if showing Earth
        if (showEarthField) {
            ctx.fillStyle = 'rgba(0, 20, 40, 0.5)';
            ctx.fillRect(20, height - 110, 200, 90);
            ctx.strokeStyle = 'rgba(100, 180, 255, 0.6)';
            ctx.strokeRect(20, height - 110, 200, 90);
            
            ctx.fillStyle = 'rgba(200, 230, 255, 0.9)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('EARTH MAGNETOSPHERE', 30, height - 90);
            
            ctx.font = '11px Arial';
            ctx.fillText(`Field Strength: ${Math.floor(30 + Math.random() * 5)} μT`, 30, height - 70);
            
            // Show magnetosphere status
            let magnetosphereStatus = 'NORMAL';
            let statusColor = 'rgba(100, 200, 100, 1)';
            
            if (flareActive) {
                const compressionLevel = Math.min(1, flareTime/10);
                if (compressionLevel > 0.7) {
                    magnetosphereStatus = 'HEAVILY COMPRESSED';
                    statusColor = 'rgba(255, 50, 50, 1)';
                } else if (compressionLevel > 0.3) {
                    magnetosphereStatus = 'COMPRESSED';
                    statusColor = 'rgba(255, 150, 50, 1)';
                } else {
                    magnetosphereStatus = 'SLIGHT COMPRESSION';
                    statusColor = 'rgba(255, 200, 50, 1)';
                }
            }
            
            ctx.fillStyle = statusColor;
            ctx.fillText(`Status: ${magnetosphereStatus}`, 30, height - 50);
            
            // Show aurora status
            if (flareActive && flareTime > 5) {
                ctx.fillStyle = 'rgba(100, 255, 150, 1)';
                ctx.fillText('Aurora Activity: VISIBLE', 30, height - 30);
            } else {
                ctx.fillStyle = 'rgba(150, 200, 255, 1)';
                ctx.fillText('Aurora Activity: MINIMAL', 30, height - 30);
            }
        }
    }
    
    // Update flare particles (the ones traveling toward Earth)
    function updateFlareParticles() {
        if (!flareActive || flareParticles.length === 0) return;
        
        const particlesToRemove = [];
        
        flareParticles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx * simulationSpeed;
            particle.y += particle.vy * simulationSpeed;
            
            // Calculate distance to Earth
            const dx = particle.x - earthX;
            const dy = particle.y - earthY;
            const distanceToEarth = Math.sqrt(dx * dx + dy * dy);
            
            // Interaction with Earth's magnetic field
            if (distanceToEarth < earthRadius * 3) {
                // Deflection effect based on angle
                const angleToEarth = Math.atan2(dy, dx);
                const earthMagneticEffect = Math.max(0, (earthRadius * 3 - distanceToEarth) / (earthRadius * 3));
                
                // Deflect particles around Earth's magnetic field
                const deflectionAngle = angleToEarth + Math.PI/2; // Perpendicular to Earth direction
                
                // Apply deflection force
                particle.vx += Math.cos(deflectionAngle) * 0.05 * earthMagneticEffect * simulationSpeed;
                particle.vy += Math.sin(deflectionAngle) * 0.05 * earthMagneticEffect * simulationSpeed;
                
                // Slow down particles in the magnetosphere
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                
                // Make particles glow more in the magnetosphere
                particle.energy = Math.min(1.0, particle.energy + 0.01 * simulationSpeed);
            }
            
            // Remove particles that hit Earth or exceed lifetime
            if (distanceToEarth < earthRadius || particle.lifetime > particle.maxLifetime) {
                particlesToRemove.push(index);
            }
            
            particle.lifetime += simulationSpeed;
        });
        
        // Remove particles from array (from end to start to avoid index issues)
        for (let i = particlesToRemove.length - 1; i >= 0; i--) {
            flareParticles.splice(particlesToRemove[i], 1);
        }
    }
    
    // Animation loop
    let lastFrame = 0;
    const frameDelay = 40; // ms between frames (25 FPS)
    
    function animate(timestamp) {
        if (!isRunning) return;
        
        // Limit frame rate for smoother slower animation
        if (timestamp - lastFrame < frameDelay) {
            requestAnimationFrame(animate);
            return;
        }
        lastFrame = timestamp;
        
        // Only animate if canvas is visible
        if (canvas.offsetParent !== null) {
            updateFieldLines();
            updateParticles();
            if (showEarthField) {
                updateEarthMagneticField();
                updateFlareParticles();
            }
            drawSolarPlasma();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start
    createParticles();
    createFieldLines();
    createEarthMagneticField();
    animate();
    
    // Return methods for external control
    return {
        setMagneticFieldStrength: function(value) {
            magneticFieldStrength = parseFloat(value);
            // Recreate field lines when strength changes
            createFieldLines();
        },
        triggerFlare: function() {
            triggerFlare();
        },
        resize: function() {
            resizeCanvas();
        },
        redraw: function() {
            if (canvas.offsetParent !== null) {
                resizeCanvas();
                drawSolarPlasma();
            }
        },
        start: function() {
            isRunning = true;
            animate();
        },
        stop: function() {
            isRunning = false;
        },
        toggleEarthField: function() {
            showEarthField = !showEarthField;
        }
    };
}

// Fusion Reactor Simulation
function initFusionReactor() {
    console.log('Initializing Fusion Reactor simulation');
    
    // Get canvas and context
    const canvas = document.getElementById('fusion-reactor-canvas');
    if (!canvas) {
        console.error('Fusion Reactor canvas not found, initialization failed');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for Fusion Reactor canvas');
        return null;
    }
    
    // Setup canvas dimensions
    let width = canvas.width = canvas.clientWidth || 800;
    let height = canvas.height = canvas.clientHeight || 350;
    console.log('Initial Fusion Reactor canvas dimensions:', width, height);
    
    // Simulation variables
    let particles = [];
    let temperature = 50; // 1-150 scale
    let confinementActive = false;
    let confinementStrength = 0;
    let fusionEvents = [];
    let isRunning = true;
    
    // Resize canvas and recreate particles
    function resizeCanvas() {
        width = canvas.width = canvas.clientWidth || 800;
        height = canvas.height = canvas.clientHeight || 350;
        console.log('Fusion Reactor canvas resized to:', width, height);
        
        // Recreate particles when resized
        createParticles();
        
        // Force a redraw
        drawFusionReactor();
    }
    
    // Create plasma particles
    function createParticles() {
        particles = [];
        const numParticles = 100 + Math.floor(temperature / 2);
        
        for (let i = 0; i < numParticles; i++) {
            // Random position within a circular area
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * Math.min(width, height) * 0.3;
            
            // More energetic particles at higher temperatures
            const speed = 0.5 + (temperature / 50) * (1 + Math.random());
            const direction = Math.random() * Math.PI * 2;
            
            particles.push({
                x: width / 2 + Math.cos(angle) * radius,
                y: height / 2 + Math.sin(angle) * radius,
                vx: Math.cos(direction) * speed,
                vy: Math.sin(direction) * speed,
                radius: 2 + Math.random() * 3,
                mass: 0.5 + Math.random(),
                type: Math.random() < 0.5 ? 'deuterium' : 'tritium',
                color: Math.random() < 0.5 ? 
                    `rgba(50, 150, ${200 + Math.floor(Math.random() * 55)}, 0.8)` : 
                    `rgba(100, ${150 + Math.floor(Math.random() * 55)}, 255, 0.8)`
            });
        }
    }
    
    // Simulate magnetic confinement
    function confinePlasma() {
        confinementActive = true;
        confinementStrength = 0;
        
        // Schedule deactivation after 5 seconds
        setTimeout(() => {
            confinementActive = false;
        }, 5000);
    }
    
    // Update particle positions and handle collisions
    function updateParticles() {
        const centerX = width / 2;
        const centerY = height / 2;
        const reactorRadius = Math.min(width, height) * 0.4;
        
        // Update confinement strength (ramp up and down smoothly)
        if (confinementActive && confinementStrength < 1) {
            confinementStrength += 0.05;
        } else if (!confinementActive && confinementStrength > 0) {
            confinementStrength -= 0.05;
        }
        
        // Update each particle
        particles.forEach(particle => {
            // Add random motion based on temperature
            const randomForce = temperature / 150;
            particle.vx += (Math.random() - 0.5) * randomForce;
            particle.vy += (Math.random() - 0.5) * randomForce;
            
            // Apply magnetic confinement if active
            if (confinementStrength > 0) {
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
                
                // Only apply confinement if outside safe zone
                if (distanceFromCenter > reactorRadius * 0.6) {
                    // Calculate confinement force (stronger near the walls)
                    const confinementForce = confinementStrength * 
                        Math.max(0, (distanceFromCenter - reactorRadius * 0.6) / (reactorRadius * 0.4));
                    
                    // Apply force towards center
                    particle.vx -= (dx / distanceFromCenter) * confinementForce;
                    particle.vy -= (dy / distanceFromCenter) * confinementForce;
                    
                    // Apply a rotational force (simulate helical path in magnetic field)
                    const tangentialFactor = confinementStrength * 0.2;
                    particle.vx += dy / distanceFromCenter * tangentialFactor;
                    particle.vy -= dx / distanceFromCenter * tangentialFactor;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bouncing off the reactor walls with energy loss
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            
            if (distanceFromCenter + particle.radius > reactorRadius) {
                // Calculate new position on the boundary
                const newX = centerX + dx / distanceFromCenter * (reactorRadius - particle.radius);
                const newY = centerY + dy / distanceFromCenter * (reactorRadius - particle.radius);
                
                // Calculate new velocity (reflection)
                const dotProduct = (particle.vx * dx + particle.vy * dy) / (distanceFromCenter * distanceFromCenter);
                const reflectionVx = particle.vx - 2 * dotProduct * dx;
                const reflectionVy = particle.vy - 2 * dotProduct * dy;
                
                // Apply energy loss
                const dampingFactor = 0.8;
                particle.vx = reflectionVx * dampingFactor;
                particle.vy = reflectionVy * dampingFactor;
                
                // Set new position
                particle.x = newX;
                particle.y = newY;
            }
        });
        
        // Check for collisions between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Collision detected
                if (distance < p1.radius + p2.radius) {
                    // Check for fusion conditions
                    if (temperature > 80 && 
                        p1.type !== p2.type && 
                        Math.random() < temperature / 1000) {
                        
                        // Create fusion event
                        fusionEvents.push({
                            x: (p1.x + p2.x) / 2,
                            y: (p1.y + p2.y) / 2,
                            radius: 1,
                            maxRadius: 20 + Math.random() * 20,
                            alpha: 1
                        });
                        
                        // Change particle directions dramatically
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 1 + Math.random() * 3;
                        
                        p1.vx = Math.cos(angle) * speed;
                        p1.vy = Math.sin(angle) * speed;
                        
                        p2.vx = -p1.vx;
                        p2.vy = -p1.vy;
                    } else {
                        // Handle collision physics
                        const nx = dx / distance;
                        const ny = dy / distance;
                        
                        const relativeVelocityX = p2.vx - p1.vx;
                        const relativeVelocityY = p2.vy - p1.vy;
                        
                        const dotProduct = nx * relativeVelocityX + ny * relativeVelocityY;
                        
                        // Only collide if particles are moving towards each other
                        if (dotProduct > 0) {
                            const impulse = 2 * dotProduct / (p1.mass + p2.mass);
                            
                            p1.vx += impulse * p2.mass * nx;
                            p1.vy += impulse * p2.mass * ny;
                            
                            p2.vx -= impulse * p1.mass * nx;
                            p2.vy -= impulse * p1.mass * ny;
                        }
                        
                        // Separate particles to prevent sticking
                        const overlap = (p1.radius + p2.radius - distance) * 0.5;
                        p1.x -= overlap * nx;
                        p1.y -= overlap * ny;
                        p2.x += overlap * nx;
                        p2.y += overlap * ny;
                    }
                }
            }
        }
        
        // Update fusion events
        fusionEvents.forEach((event, index) => {
            event.radius += 2;
            event.alpha -= 0.02;
            
            if (event.radius > event.maxRadius || event.alpha <= 0) {
                fusionEvents.splice(index, 1);
            }
        });
    }
    
    // Draw the reactor and particles
    function drawFusionReactor() {
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const reactorRadius = Math.min(width, height) * 0.4;
        
        // Background gradient
        const bgGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, reactorRadius * 1.5
        );
        bgGradient.addColorStop(0, '#080820');
        bgGradient.addColorStop(1, '#000010');
        
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw reactor chamber
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, reactorRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw magnetic field coils
        const numCoils = 8;
        for (let i = 0; i < numCoils; i++) {
            const angle = (i / numCoils) * Math.PI * 2;
            const coilX = centerX + Math.cos(angle) * reactorRadius;
            const coilY = centerY + Math.sin(angle) * reactorRadius;
            const coilSize = 10 + 5 * confinementStrength;
            
            ctx.beginPath();
            ctx.arc(coilX, coilY, coilSize, 0, Math.PI * 2);
            
            const gradient = ctx.createRadialGradient(
                coilX, coilY, 0,
                coilX, coilY, coilSize
            );
            gradient.addColorStop(0, `rgba(60, 100, 255, ${0.7 * confinementStrength})`);
            gradient.addColorStop(0.6, `rgba(40, 80, 220, ${0.5 * confinementStrength})`);
            gradient.addColorStop(1, 'rgba(20, 40, 200, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        // Draw confinement field if active
        if (confinementStrength > 0) {
            const fieldGradient = ctx.createRadialGradient(
                centerX, centerY, reactorRadius * 0.6,
                centerX, centerY, reactorRadius
            );
            fieldGradient.addColorStop(0, `rgba(100, 180, 255, 0)`);
            fieldGradient.addColorStop(1, `rgba(100, 180, 255, ${0.2 * confinementStrength})`);
            
            ctx.fillStyle = fieldGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, reactorRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw field lines
            ctx.strokeStyle = `rgba(150, 200, 255, ${0.3 * confinementStrength})`;
            ctx.lineWidth = 1;
            
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, reactorRadius * 0.7, angle, angle + Math.PI, false);
                ctx.stroke();
            }
        }
        
        // Draw plasma particles with glow
        ctx.globalCompositeOperation = 'lighter';
        particles.forEach(particle => {
            const glow = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            glow.addColorStop(0, particle.color);
            glow.addColorStop(1, 'rgba(255, 100, 0, 0)');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw fusion events
        fusionEvents.forEach(event => {
            const glow = ctx.createRadialGradient(
                event.x, event.y, 0,
                event.x, event.y, event.radius
            );
            glow.addColorStop(0, `rgba(255, 255, 200, ${event.alpha})`);
            glow.addColorStop(0.5, `rgba(255, 200, 100, ${event.alpha * 0.7})`);
            glow.addColorStop(1, `rgba(255, 100, 50, 0)`);
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(event.x, event.y, event.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';
        
        // Draw temperature indicator
        const tempHeight = height * 0.8;
        const tempWidth = 15;
        const tempX = width - 30;
        const tempY = height / 2 - tempHeight / 2;
        const tempLevel = temperature / 150 * tempHeight;
        
        // Temperature gauge background
        ctx.fillStyle = 'rgba(30, 30, 60, 0.5)';
        ctx.fillRect(tempX, tempY, tempWidth, tempHeight);
        
        // Temperature level
        const tempGradient = ctx.createLinearGradient(
            0, tempY + tempHeight, 
            0, tempY
        );
        tempGradient.addColorStop(0, '#3080ff');   // cool
        tempGradient.addColorStop(0.5, '#ff8030');  // medium
        tempGradient.addColorStop(1, '#ffff80');   // hot
        
        ctx.fillStyle = tempGradient;
        ctx.fillRect(tempX, tempY + tempHeight - tempLevel, tempWidth, tempLevel);
        
        // Temperature gauge border
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tempX, tempY, tempWidth, tempHeight);
        
        // Temperature labels
        ctx.fillStyle = 'rgba(200, 220, 255, 0.8)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('150M°', tempX - 5, tempY + 15);
        ctx.fillText('75M°', tempX - 5, tempY + tempHeight / 2 + 5);
        ctx.fillText('0M°', tempX - 5, tempY + tempHeight - 5);
        
        // Draw current temperature
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${temperature}M°C`, tempX + tempWidth / 2, tempY + tempHeight + 15);
    }
    
    // Animation loop
    function animate() {
        if (!isRunning) return;
        
        // Only animate if canvas is visible
        if (canvas.offsetParent !== null) {
            updateParticles();
            drawFusionReactor();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start
    createParticles();
    animate();
    
    // Return methods for external control
    return {
        setTemperature: function(value) {
            temperature = parseFloat(value);
            // Recreate particles when temperature changes significantly
            if (Math.abs(temperature - particles.length / 100 * 50) > 20) {
                createParticles();
            }
        },
        confinePlasma: function() {
            confinePlasma();
        },
        resize: function() {
            resizeCanvas();
        },
        redraw: function() {
            if (canvas.offsetParent !== null) {
                resizeCanvas();
                drawFusionReactor();
            }
        },
        start: function() {
            isRunning = true;
            animate();
        },
        stop: function() {
            isRunning = false;
        }
    };
}

function initColdPlasma() {
    console.log('Initializing Cold Plasma Air Purification simulation');
    
    // Get canvas and context
    const canvas = document.getElementById('cold-plasma-canvas');
    if (!canvas) {
        console.error('Cold plasma canvas not found, initialization failed');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for cold plasma canvas');
        return null;
    }
    
    // Log canvas dimensions for debugging
    console.log('Initial canvas dimensions:', canvas.width, canvas.height);
    
    // Simulation variables
    let particles = [];
    let contaminants = [];
    let dischargeIntensity = 50;
    let addingContaminant = false;
    let lastContaminantTime = 0;
    let isRunning = true; // Changed to true to ensure animation runs
    
    // Canvas dimensions
    let width = canvas.width;
    let height = canvas.height;
    
    function resizeCanvas() {
        // Ensure the canvas has proper dimensions
        width = canvas.clientWidth || 800;
        height = canvas.clientHeight || 350;
        
        // Only update if dimensions have changed
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            console.log(`Cold plasma canvas resized to: ${width}x${height}`);
        }
        
        return {width, height}; // Return dimensions for use elsewhere
    }
    
    // Force initial resize
    resizeCanvas();
    
    // Create plasma discharge particles
    function createDischargeParticles() {
        particles = [];
        const numParticles = Math.floor(dischargeIntensity * 1.5);
        
        // Create electrodes positions (top and bottom of canvas)
        const electrodes = [
            { x: width * 0.25, y: 30, width: width * 0.5, height: 5 },
            { x: width * 0.25, y: height - 30, width: width * 0.5, height: 5 }
        ];
        
        for (let i = 0; i < numParticles; i++) {
            // Start particles at random positions along the electrodes
            const sourceElectrode = Math.random() < 0.5 ? 0 : 1;
            const targetElectrode = sourceElectrode === 0 ? 1 : 0;
            
            // Create particles at random positions within the electrodes
            const x = Math.random() * electrodes[sourceElectrode].width + electrodes[sourceElectrode].x;
            const y = electrodes[sourceElectrode].y + (Math.random() * 2 - 1) * 5;
            
            // Direction toward the other electrode
            const targetY = electrodes[targetElectrode].y;
            const dirY = y < targetY ? 1 : -1;
            
            // Random angle from electrode with bias toward the center
            const angleBias = (x - width/2) / width; // -0.5 to 0.5
            
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5 - angleBias * 0.3) * 2,
                vy: dirY * (Math.random() * 1.5 + 2),
                targetY: targetY,
                color: `hsl(${200 + Math.random() * 60}, 100%, ${70 + Math.random() * 30}%)`,
                size: 1.5 + Math.random() * 2,
                lifespan: 100 + Math.random() * 100,
                age: 0,
                active: true
            });
        }
    }
    
    // Add a contaminant particle
    function createContaminant() {
        addingContaminant = true;
        lastContaminantTime = Date.now();
        
        // Add 5-10 contaminant particles
        const numContaminants = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < numContaminants; i++) {
            // Random position on the screen
            const x = Math.random() * width;
            const y = height * 0.2 + Math.random() * height * 0.6; // Middle 60% of screen
            
            contaminants.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: 3 + Math.random() * 4,
                color: `rgba(${50 + Math.random() * 30}, ${50 + Math.random() * 20}, ${50 + Math.random() * 20}, 0.7)`,
                health: 100
            });
        }
    }
    
    // Update particles and contaminants
    function updateParticles() {
        // Update plasma particles
        particles.forEach(particle => {
            particle.age++;
            
            // Apply some drift and randomness to movement
            particle.vx += (Math.random() - 0.5) * 0.2;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(width, particle.x));
            }
            
            // Check if particle has reached target or exceeded lifespan
            if ((particle.vy > 0 && particle.y > particle.targetY) || 
                (particle.vy < 0 && particle.y < particle.targetY) ||
                particle.age > particle.lifespan) {
                particle.active = false;
            }
        });
        
        // Remove inactive particles
        particles = particles.filter(p => p.active);
        
        // Update contaminants
        contaminants.forEach(contaminant => {
            // Apply slow drift
            contaminant.x += contaminant.vx;
            contaminant.y += contaminant.vy;
            
            // Bound checking with bounce
            if (contaminant.x < 0 || contaminant.x > width) {
                contaminant.vx *= -1;
                contaminant.x = Math.max(0, Math.min(width, contaminant.x));
            }
            if (contaminant.y < 0 || contaminant.y > height) {
                contaminant.vy *= -1;
                contaminant.y = Math.max(0, Math.min(height, contaminant.y));
            }
            
            // Check for collisions with plasma particles
            particles.forEach(particle => {
                const dx = contaminant.x - particle.x;
                const dy = contaminant.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If collision, reduce contaminant health
                if (distance < contaminant.size + particle.size * 2) {
                    contaminant.health -= 1 + (dischargeIntensity / 30);
                    
                    // Add visual effect to show interaction
                    particles.push({
                        x: (contaminant.x + particle.x) / 2,
                        y: (contaminant.y + particle.y) / 2,
                        vx: (Math.random() - 0.5) * 3,
                        vy: (Math.random() - 0.5) * 3,
                        size: 1 + Math.random(),
                        color: 'rgba(255, 255, 255, 0.8)',
                        lifespan: 20 + Math.random() * 20,
                        age: 0,
                        active: true,
                        targetY: particle.targetY
                    });
                }
            });
        });
        
        // Remove "destroyed" contaminants
        contaminants = contaminants.filter(c => c.health > 0);
        
        // Add new plasma particles if needed
        if (particles.length < dischargeIntensity) {
            const newParticles = Math.min(5, dischargeIntensity - particles.length);
            for (let i = 0; i < newParticles; i++) {
                // Create particles at electrodes
                const sourceElectrode = Math.random() < 0.5 ? 0 : 1;
                const targetElectrode = sourceElectrode === 0 ? 1 : 0;
                
                const electrodes = [
                    { x: width * 0.25, y: 30, width: width * 0.5, height: 5 },
                    { x: width * 0.25, y: height - 30, width: width * 0.5, height: 5 }
                ];
                
                const x = Math.random() * electrodes[sourceElectrode].width + electrodes[sourceElectrode].x;
                const y = electrodes[sourceElectrode].y;
                const targetY = electrodes[targetElectrode].y;
                const dirY = y < targetY ? 1 : -1;
                
                particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 2,
                    vy: dirY * (Math.random() * 2 + 2),
                    targetY: targetY,
                    color: `hsl(${200 + Math.random() * 60}, 100%, ${70 + Math.random() * 30}%)`,
                    size: 1.5 + Math.random() * 2,
                    lifespan: 100 + Math.random() * 100,
                    age: 0,
                    active: true
                });
            }
        }
    }
    
    // Draw cold plasma simulation
    function drawColdPlasma() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#101020');
        gradient.addColorStop(1, '#0a0a15');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw electrodes
        const electrodes = [
            { x: width * 0.25, y: 30, width: width * 0.5, height: 5 },
            { x: width * 0.25, y: height - 30, width: width * 0.5, height: 5 }
        ];
        
        electrodes.forEach(electrode => {
            // Draw electrode glow
            const glowGradient = ctx.createRadialGradient(
                electrode.x + electrode.width/2, electrode.y + electrode.height/2, 1,
                electrode.x + electrode.width/2, electrode.y + electrode.height/2, 20
            );
            glowGradient.addColorStop(0, `rgba(100, 180, 255, ${dischargeIntensity / 200})`);
            glowGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
            
            ctx.fillStyle = glowGradient;
            ctx.fillRect(electrode.x - 20, electrode.y - 20, electrode.width + 40, electrode.height + 40);
            
            // Draw electrode body
            ctx.fillStyle = '#4080a0';
            ctx.fillRect(electrode.x, electrode.y, electrode.width, electrode.height);
        });
        
        // Draw contaminants
        ctx.globalAlpha = 1;
        contaminants.forEach(contaminant => {
            // Draw contaminant with health-based opacity
            ctx.globalAlpha = Math.max(0.2, contaminant.health / 100);
            ctx.beginPath();
            ctx.arc(contaminant.x, contaminant.y, contaminant.size, 0, Math.PI * 2);
            ctx.fillStyle = contaminant.color;
            ctx.fill();
            
            // Optionally draw health indicator
            if (contaminant.health < 80) {
                ctx.beginPath();
                ctx.arc(contaminant.x, contaminant.y, contaminant.size * 1.2, 0, Math.PI * 2 * (contaminant.health / 100));
                ctx.strokeStyle = `rgba(255, 100, 50, ${1 - contaminant.health / 100})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
        
        // Draw plasma particles
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 10;
        particles.forEach(particle => {
            const alpha = Math.max(0, 1 - particle.age / particle.lifespan);
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
            ctx.fill();
            
            // Draw a faint line connecting to the target electrode
            if (Math.random() < 0.3) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle.x + particle.vx * 5, particle.y + particle.vy * 5);
                ctx.strokeStyle = particle.color.replace('hsl', 'hsla').replace(')', `, ${alpha * 0.3})`);
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
        ctx.shadowBlur = 0;
        
        // Draw discharge lines between electrodes occasionally
        if (dischargeIntensity > 30 && Math.random() < 0.08) {
            const points = [];
            const startX = width * 0.25 + Math.random() * width * 0.5;
            const startY = 30;
            const endX = width * 0.25 + Math.random() * width * 0.5;
            const endY = height - 30;
            
            // Create a zigzag path
            points.push({x: startX, y: startY});
            
            const numSegments = 5 + Math.floor(Math.random() * 5);
            for (let i = 1; i < numSegments; i++) {
                const t = i / numSegments;
                points.push({
                    x: startX + (endX - startX) * t + (Math.random() - 0.5) * width * 0.4,
                    y: startY + (endY - startY) * t
                });
            }
            points.push({x: endX, y: endY});
            
            // Draw the path
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            
            ctx.strokeStyle = `rgba(150, 220, 255, ${0.3 + dischargeIntensity/300})`;
            ctx.lineWidth = 1 + Math.random() * 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(100, 180, 255, 0.8)';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
        
        // Draw discharge intensity indicator
        ctx.fillStyle = 'rgba(200, 220, 255, 0.7)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Discharge: ${Math.round(dischargeIntensity)}%`, width - 20, 30);
        ctx.fillText(`Contaminants: ${contaminants.length}`, width - 20, 55);
    }
    
    // Animation loop
    function animate() {
        if (!isRunning) return;
        
        // Only animate if canvas is visible
        if (canvas.offsetParent !== null) {
            updateParticles();
            drawColdPlasma();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createDischargeParticles();
    animate();
    
    // Return methods for external control
    return {
        setDischargeIntensity: function(value) {
            dischargeIntensity = parseFloat(value);
            console.log('Setting discharge intensity to:', dischargeIntensity);
        },
        addContaminant: function() {
            createContaminant();
            console.log('Adding contaminants');
        },
        resize: function() {
            resizeCanvas();
            createDischargeParticles();
        },
        redraw: function() {
            if (canvas.offsetParent !== null) {
                resizeCanvas();
                drawColdPlasma();
            }
        },
        start: function() {
            isRunning = true;
            animate();
        },
        stop: function() {
            isRunning = false;
        }
    };
}

function initZPinch() {
    console.log('Initializing Z-Pinch simulation');
    
    // Get canvas and context
    const canvas = document.getElementById('z-pinch-canvas');
    if (!canvas) {
        console.error('Z-Pinch canvas not found, initialization failed');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for Z-Pinch canvas');
        return null;
    }
    
    // Setup canvas dimensions
    let width = canvas.width = canvas.clientWidth || 800;
    let height = canvas.height = canvas.clientHeight || 350;
    console.log('Initial Z-Pinch canvas dimensions:', width, height);
    
    // Simulation variables
    let particles = [];
    let currentIntensity = 50;
    let pulseActive = false;
    let pulseTime = 0;
    let compression = 1.0;
    let isRunning = true;
    
    // Resize canvas and recreate particles
    function resizeCanvas() {
        width = canvas.width = canvas.clientWidth || 800;
        height = canvas.height = canvas.clientHeight || 350;
        console.log('Z-Pinch canvas resized to:', width, height);
        
        // Recreate particles when resized
        createParticles();
        
        // Force a redraw
        drawZPinch();
    }
    
    // Create plasma particles
    function createParticles() {
        particles = [];
        const numParticles = 200 + Math.floor(currentIntensity * 2);
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = radius * (0.8 + Math.random() * 0.2) * compression;
            
            particles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 1 + Math.random() * 3,
                color: `hsl(${200 + Math.random() * 40}, 80%, 60%)`,
                charge: Math.random() < 0.5 ? -1 : 1,
                mass: 1 + Math.random() * 2
            });
        }
    }
    
    // Simulate a current pulse
    function pulseCurrent() {
        if (pulseActive) return;
        
        pulseActive = true;
        pulseTime = 0;
        compression = 1.0;
        console.log('Z-Pinch current pulse activated');
    }
    
    // Update particle positions and physics
    function updateParticles() {
        // Update pulse state
        if (pulseActive) {
            pulseTime += 0.01;
            
            // Compress the plasma column during pulse
            if (pulseTime < 2.0) {
                compression = Math.max(0.2, 1.0 - pulseTime * 0.4);
            } else {
                // Expansion after pulse
                compression = 0.2 + (pulseTime - 2.0) * 0.1;
                if (compression >= 1.0) {
                    pulseActive = false;
                    compression = 1.0;
                }
            }
        }
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        particles.forEach(particle => {
            // Calculate distance from center (axis)
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Magnetic force (directed towards the center during pulse, strength based on current intensity)
            let magneticForceStrength = pulseActive ? 
                0.05 * currentIntensity / 50 * (2.0 - pulseTime) : 
                0.001 * currentIntensity / 50;
            
            // Direction towards center
            const fx = distance > 0 ? -dx / distance * magneticForceStrength : 0;
            const fy = distance > 0 ? -dy / distance * magneticForceStrength : 0;
            
            // Add some randomness
            const randomForce = 0.05 * (Math.random() - 0.5);
            
            // Update velocity with forces
            particle.vx += fx + randomForce;
            particle.vy += fy + randomForce;
            
            // Add boundary repulsion when very close to edges
            if (particle.x < 50) particle.vx += 0.1;
            if (particle.x > width - 50) particle.vx -= 0.1;
            if (particle.y < 50) particle.vy += 0.1;
            if (particle.y > height - 50) particle.vy -= 0.1;
            
            // Damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check with bounce
            if (particle.x < 0) {
                particle.x = 0;
                particle.vx *= -0.8;
            } else if (particle.x > width) {
                particle.x = width;
                particle.vx *= -0.8;
            }
            
            if (particle.y < 0) {
                particle.y = 0;
                particle.vy *= -0.8;
            } else if (particle.y > height) {
                particle.y = height;
                particle.vy *= -0.8;
            }
        });
    }
    
    // Draw the Z-Pinch simulation
    function drawZPinch() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#060620');
        gradient.addColorStop(1, '#10102a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw z-axis (conductor)
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw current glow around the axis
        const glowIntensity = pulseActive ? 
            Math.min(1.0, 0.3 + (pulseTime < 1.0 ? pulseTime : 2.0 - pulseTime)) : 
            0.3 * currentIntensity / 100;
        
        ctx.beginPath();
        const gradient2 = ctx.createRadialGradient(
            width / 2, height / 2, 1,
            width / 2, height / 2, 100
        );
        gradient2.addColorStop(0, `rgba(100, 200, 255, ${glowIntensity})`);
        gradient2.addColorStop(1, 'rgba(100, 200, 255, 0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);
        
        // Draw connecting lines between particles that are close together
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(100, 180, 255, ${0.5 * (1 - distance / 30)})`; 
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1.0;
        
        // Draw particles
        ctx.shadowBlur = 10;
        particles.forEach(particle => {
            ctx.shadowColor = particle.color;
            ctx.fillStyle = particle.color;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
        
        // Draw pulse effect
        if (pulseActive && pulseTime < 1.0) {
            ctx.globalAlpha = 0.7 * (1 - pulseTime);
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 100 * (1 + pulseTime), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(150, 220, 255, 0.3)';
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }
    
    // Animation loop
    function animate() {
        if (!isRunning) return;
        
        // Only animate if canvas is visible
        if (canvas.offsetParent !== null) {
            updateParticles();
            drawZPinch();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createParticles();
    animate();
    
    // Return methods for external control
    return {
        setCurrentIntensity: function(value) {
            currentIntensity = parseFloat(value);
        },
        pulseCurrent: function() {
            pulseCurrent();
        },
        resize: function() {
            resizeCanvas();
        },
        redraw: function() {
            if (canvas.offsetParent !== null) {
                resizeCanvas();
                drawZPinch();
            }
        },
        start: function() {
            isRunning = true;
            animate();
        },
        stop: function() {
            isRunning = false;
        }
    };
}

function initPlasmaWaves() {
    console.log('Initializing Plasma Waves simulation');
    
    // Get canvas and context
    const canvas = document.getElementById('plasma-waves-canvas');
    if (!canvas) {
        console.error('Plasma Waves canvas not found, initialization failed');
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for Plasma Waves canvas');
        return null;
    }
    
    // Setup canvas dimensions
    let width = canvas.width = canvas.clientWidth || 800;
    let height = canvas.height = canvas.clientHeight || 350;
    console.log('Initial Plasma Waves canvas dimensions:', width, height);
    
    // Simulation variables
    let particles = [];
    let waveFrequency = 0.05;
    let waveAmplitude = 15;
    let perturbationActive = false;
    let perturbationTime = 0;
    let perturbationX = width / 2;
    let perturbationY = height / 2;
    let wavePhase = 0;
    let isRunning = true;
    let waveType = 'transverse'; // Can be 'transverse', 'longitudinal', or 'spiral'
    
    // Grid settings
    const gridSize = 20;
    const rows = Math.floor(height / gridSize);
    const cols = Math.floor(width / gridSize);
    
    // Show click instruction
    let instructionElement = document.createElement('div');
    instructionElement.className = 'canvas-instruction';
    instructionElement.textContent = 'Click on canvas to add perturbation';
    canvas.parentNode.appendChild(instructionElement);
    
    // Enable canvas click to add perturbation
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        perturbationX = event.clientX - rect.left;
        perturbationY = event.clientY - rect.top;
        addPerturbation(perturbationX, perturbationY);
    });
    
    // Resize canvas and recreate particles
    function resizeCanvas() {
        width = canvas.width = canvas.clientWidth || 800;
        height = canvas.height = canvas.clientHeight || 350;
        console.log('Plasma Waves canvas resized to:', width, height);
        
        // Recreate particles with new dimensions
        createParticles();
        
        // Force a redraw
        drawPlasmaWaves();
    }
    
    // Create plasma particles in a grid
    function createParticles() {
        particles = [];
        const rows = Math.floor(height / gridSize);
        const cols = Math.floor(width / gridSize);
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                particles.push({
                    originX: x * gridSize + gridSize / 2,
                    originY: y * gridSize + gridSize / 2,
                    x: x * gridSize + gridSize / 2,
                    y: y * gridSize + gridSize / 2,
                    vx: 0,
                    vy: 0,
                    amplitude: 0,
                    phase: 0,
                    color: `rgba(${150 + Math.random() * 50}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.8)`
                });
            }
        }
    }
    
    // Add a perturbation at a specific location
    function addPerturbation(x = width / 2, y = height / 2) {
        perturbationActive = true;
        perturbationTime = 0;
        perturbationX = x;
        perturbationY = y;
        
        // Reset particles to enhance the perturbation effect
        particles.forEach(particle => {
            particle.amplitude = 0;
            particle.phase = Math.random() * Math.PI * 2;
        });
    }
    
    // Update particle positions based on waves and perturbations
    function updateParticles() {
        wavePhase += waveFrequency;
        
        if (perturbationActive) {
            perturbationTime += 0.05;
            if (perturbationTime > 10) {
                perturbationActive = false;
            }
        }
        
        particles.forEach(particle => {
            const dx = particle.originX - perturbationX;
            const dy = particle.originY - perturbationY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = Math.sqrt(width * width + height * height) / 2;
            
            // Update particle position based on wave type
            if (waveType === 'transverse') {
                // Transverse waves move perpendicular to the direction of propagation
                const angle = Math.atan2(dy, dx);
                const perpAngle = angle + Math.PI / 2;
                const waveEffect = Math.sin(wavePhase + distance / 20) * waveAmplitude;
                
                particle.x = particle.originX + (perturbationActive ? Math.sin(perpAngle) * Math.max(0, (maxDist - distance) / maxDist) * 
                             Math.sin(perturbationTime * 2 - distance / 50) * waveAmplitude * 1.5 : 0);
                             
                particle.y = particle.originY + (perturbationActive ? Math.cos(perpAngle) * Math.max(0, (maxDist - distance) / maxDist) * 
                             Math.sin(perturbationTime * 2 - distance / 50) * waveAmplitude * 1.5 : 0);
                
                // Add the base wave effect
                particle.x += Math.sin(perpAngle) * waveEffect * (1 - distance / maxDist);
                particle.y += Math.cos(perpAngle) * waveEffect * (1 - distance / maxDist);
                
            } else if (waveType === 'longitudinal') {
                // Longitudinal waves move parallel to the direction of propagation
                const angle = Math.atan2(dy, dx);
                const waveEffect = Math.sin(wavePhase + distance / 20) * waveAmplitude;
                
                particle.x = particle.originX + (perturbationActive ? Math.cos(angle) * Math.max(0, (maxDist - distance) / maxDist) * 
                             Math.sin(perturbationTime * 2 - distance / 50) * waveAmplitude : 0);
                             
                particle.y = particle.originY + (perturbationActive ? Math.sin(angle) * Math.max(0, (maxDist - distance) / maxDist) * 
                             Math.sin(perturbationTime * 2 - distance / 50) * waveAmplitude : 0);
                
                // Add the base wave effect
                particle.x += Math.cos(angle) * waveEffect * (1 - distance / maxDist) * 0.5;
                particle.y += Math.sin(angle) * waveEffect * (1 - distance / maxDist) * 0.5;
                
            } else if (waveType === 'spiral') {
                // Spiral waves combine longitudinal and transverse motion
                const angle = Math.atan2(dy, dx);
                const waveEffect = Math.sin(wavePhase + distance / 20) * waveAmplitude;
                
                // Spiral effect
                particle.x = particle.originX + Math.cos(angle + wavePhase) * Math.sin(distance / 30 - wavePhase) * waveAmplitude * 0.8;
                particle.y = particle.originY + Math.sin(angle + wavePhase) * Math.sin(distance / 30 - wavePhase) * waveAmplitude * 0.8;
                
                // Add perturbation
                if (perturbationActive) {
                    const perturbEffect = Math.sin(perturbationTime * 3 - distance / 30) * Math.max(0, (maxDist - distance) / maxDist);
                    particle.x += Math.cos(angle * 2) * perturbEffect * waveAmplitude;
                    particle.y += Math.sin(angle * 2) * perturbEffect * waveAmplitude;
                }
            }
        });
    }
    
    // Draw the plasma waves simulation
    function drawPlasmaWaves() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw background
        const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0f0f1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(60, 30, 120, 0.15)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Vertical lines
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw connections between particles
        ctx.lineWidth = 1.5;
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            
            // Connect horizontally and vertically to adjacent particles
            const neighbors = [
                particles[i + 1], // right
                particles[i + cols], // below
                particles[i + cols + 1], // below-right
                particles[i + cols - 1] // below-left
            ];
            
            for (const p2 of neighbors) {
                if (!p2) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < gridSize * 2) {
                    const opacity = Math.max(0, 1 - distance / (gridSize * 2));
                    ctx.strokeStyle = `rgba(150, 100, 255, ${opacity * 0.8})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            const glow = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, gridSize / 2
            );
            glow.addColorStop(0, particle.color);
            glow.addColorStop(1, 'rgba(100, 50, 200, 0)');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, gridSize / 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw perturbation effect
        if (perturbationActive) {
            const radius = perturbationTime * 100;
            const opacity = Math.max(0, 1 - perturbationTime / 10);
            
            const glow = ctx.createRadialGradient(
                perturbationX, perturbationY, 0,
                perturbationX, perturbationY, radius
            );
            glow.addColorStop(0, `rgba(200, 100, 255, ${opacity * 0.1})`);
            glow.addColorStop(0.7, `rgba(150, 80, 255, ${opacity * 0.05})`);
            glow.addColorStop(1, 'rgba(100, 50, 200, 0)');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(perturbationX, perturbationY, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw ripple rings
            ctx.strokeStyle = `rgba(180, 100, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 2;
            
            for (let i = 0; i < 3; i++) {
                const ringRadius = radius * (0.3 + i * 0.2);
                ctx.beginPath();
                ctx.arc(perturbationX, perturbationY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }
    
    // Animation loop
    function animate() {
        if (!isRunning) return;
        
        // Only animate if canvas is visible
        if (canvas.offsetParent !== null) {
            updateParticles();
            drawPlasmaWaves();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createParticles();
    animate();
    
    // Return methods for external control
    return {
        setWaveFrequency: function(value) {
            waveFrequency = value / 1000; // Convert 1-100 to 0.001-0.1
        },
        setWaveAmplitude: function(value) {
            waveAmplitude = value / 5; // Convert 1-100 to 0.2-20
        },
        setWaveType: function(type) {
            waveType = type;
        },
        addPerturbation: function() {
            addPerturbation(width/2, height/2);
        },
        resize: function() {
            resizeCanvas();
        },
        redraw: function() {
            if (canvas.offsetParent !== null) {
                resizeCanvas();
                drawPlasmaWaves();
            }
        },
        start: function() {
            isRunning = true;
            animate();
        },
        stop: function() {
            isRunning = false;
        }
    };
}
