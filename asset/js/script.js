// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dots-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dot class
    class Dot {
        constructor(color) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2; // Increased movement speed
            this.vy = (Math.random() - 0.5) * 2; // Increased movement speed
            this.radius = 4;
            this.baseRadius = 4;
            this.maxRadius = 6;
            this.density = (Math.random() * 40) + 1;
            this.color = color;
            this.originalColor = color;
            this.willChangeColor = true;
            this.isRed = Math.random() < 0.5; // Randomly start with red or white
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            // Continuous movement
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = 120;
            let force = (maxDistance - distance) / maxDistance;

            if (force < 0) force = 0;

            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < maxDistance) {
                this.x -= directionX * 1.5;
                this.y -= directionY * 1.5;
                this.radius = this.baseRadius + (force * 2);
            } else {
                this.radius = this.baseRadius;
            }
        }
    }

    // Mouse object
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    // Handle mouse movement
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Create dots with different colors
    const dots = [];
    const numberOfDots = 150;

    // Create 60 red dots (40%)
    for (let i = 0; i < 60; i++) {
        dots.push(new Dot('rgba(255, 0, 0, 0.6)')); // Red
    }

    // Create 90 white dots (60%)
    for (let i = 0; i < 90; i++) {
        dots.push(new Dot('rgba(255, 255, 255, 0.6)')); // White
    }

    // Function to change colors after delay
    setTimeout(() => {
        // Get all white dots
        const whiteDots = dots.filter(dot => dot.originalColor === 'rgba(255, 255, 255, 0.6)');
        
        // Calculate 25% for alternating dots
        const alternatingDots = Math.floor(whiteDots.length * 0.25);
        
        // Set up 25% for alternating colors
        for (let i = 0; i < alternatingDots; i++) {
            const randomIndex = Math.floor(Math.random() * whiteDots.length);
            const dot = whiteDots[randomIndex];
            dot.willChangeColor = true;
            dot.isRed = Math.random() < 0.5; // Randomly start with red or white
            dot.color = dot.isRed ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
            whiteDots.splice(randomIndex, 1);
        }
    }, 1000);

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw dots
        dots.forEach(dot => {
            dot.update();
            dot.draw();
            
            // Handle alternating colors
            if (dot.willChangeColor) {
                if (Math.random() < 0.005) { // Changed from 0.01 to 0.005 for slower color changes
                    dot.isRed = !dot.isRed;
                    dot.color = dot.isRed ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
                }
            }
        });

        // Draw lines between dots
        dots.forEach((dot1, i) => {
            dots.slice(i + 1).forEach(dot2 => {
                let dx = dot1.x - dot2.x;
                let dy = dot1.y - dot2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 180) {
                    ctx.beginPath();
                    // Match line color to the dots it's connecting
                    let lineColor;
                    if (dot1.color === dot2.color) {
                        lineColor = dot1.color;
                    } else {
                        lineColor = 'rgba(255, 255, 255, 0.3)';
                    }
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.moveTo(dot1.x, dot1.y);
                    ctx.lineTo(dot2.x, dot2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}); 

  if (window.location.pathname.endsWith("index.html")) {
    window.location.replace(window.location.pathname.replace("index.html", ""));
  }

  
