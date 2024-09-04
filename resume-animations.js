document.addEventListener("DOMContentLoaded", function() {
    function createOrbitAnimation(planetId, textId, maxRadius) {
        const planet = document.getElementById(planetId);
        const text = document.getElementById(textId);

        let angle = 0;
        let animationFrameId;

        planet.addEventListener("mouseenter", function() {
            text.style.display = "block";

            const animate = () => {
                angle += 0.005; 

                //calculate the radius based on screen size
                const radius = Math.min(window.innerWidth * 0.1, maxRadius); 
                const planetRect = planet.getBoundingClientRect();

                const planetCenterX = planetRect.left + planetRect.width / 2;
                const planetCenterY = planetRect.top + planetRect.height / 2;

                const x = planetCenterX + radius * Math.cos(angle);
                const y = planetCenterY + radius * Math.sin(angle);

                text.style.left = `${x}px`;
                text.style.top = `${y}px`;

                // Rotate the text so it faces the planet
                const rotationAngle = angle * (180 / Math.PI) + 90; 
                text.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

                animationFrameId = requestAnimationFrame(animate);
            };

            animate(); // Start the animation
        });

        planet.addEventListener("mouseleave", function() {
            text.style.display = "none";
            cancelAnimationFrame(animationFrameId); // Stop the animation
        });
    }

    // Create orbit animations for each planet and section
    createOrbitAnimation("sun", "experience-text", 150); 
    createOrbitAnimation("earth", "skills-text", 100); 
    createOrbitAnimation("jupiter", "education-text", 100); 
    createOrbitAnimation("mars", "awards-text", 100);

    // open the section context 
    function openModal(modalId, color) {
        const overlay = document.getElementById("fade-overlay");
        overlay.style.backgroundColor = color; 
        overlay.style.opacity = "1";
        

        setTimeout(() => {
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
            setTimeout(() => {
                modal.classList.add("show-modal");
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.add("show-modal-content");
            }, 10); 
            overlay.style.pointerEvents = "auto"; 
        }, 1000); 
    }

    // close the context
    function closeModal(modalId) {
        const overlay = document.getElementById("fade-overlay");
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.remove("show-modal-content");

        setTimeout(() => {
            modal.classList.remove("show-modal");
            setTimeout(() => {
                modal.style.display = "none";
            }, 500); 
            overlay.style.opacity = "0"; 
            overlay.style.pointerEvents = "none"; 
        }, 1000);
    }

    // Close if the user clicks outside of it
    window.onclick = function(event) {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            if (event.target == modals[i]) {
                closeModal(modals[i].id);
            }
        }
    }

    
    document.getElementById('earth').addEventListener('click', function() {
        openModal('skills-modal', '#020f30'); 
    });

    document.getElementById('jupiter').addEventListener('click', function() {
        openModal('education-modal', '#041900'); 
    });

    document.getElementById('mars').addEventListener('click', function() {
        openModal('awards-modal', '#57060d'); 
    });

    document.getElementById('sun').addEventListener('click', function() {
        openModal('experience-modal', '#a04000'); 
    });

    
    document.getElementById('rocket').addEventListener('click', function() {
        openModal('rocket-modal', '#0f0d10'); 
    });
    document.querySelectorAll('.planets').forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            const instructions = document.getElementById('hover-instructions');
            if (instructions) {
                instructions.style.opacity = '0';
                setTimeout(() => {
                    instructions.remove();
                }, 2000); // Remove after fading out
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function() {
    const hoverInstructions = document.getElementById('hover-instructions');
    const blackholeInstructions = document.getElementById('blackhole-instructions');
    const blackhole = document.getElementById('blackhole');

    // Fade out the hover instructions when any planet is hovered
    document.querySelectorAll('.planets').forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            hoverInstructions.style.opacity = '0';
            setTimeout(() => {
                hoverInstructions.remove(); // Remove from DOM after fade
            }, 1000); // Wait for the fade to complete
        });
    });

    // Fade out the black hole instructions when the black hole is clicked
    blackhole.addEventListener('click', function() {
        console.log('Black hole clicked!'); // Debugging message to ensure the click event is firing
        blackholeInstructions.style.opacity = '0';
        setTimeout(() => {
            blackholeInstructions.remove(); // Remove from DOM after fade
        }, 1000); // Wait for the fade to complete
    });
});



    //black hole to suck up planets and rocket
    document.getElementById('blackhole').addEventListener('click', function() {
        // Get black hole position
        const blackhole = document.getElementById('blackhole');
        const blackholeRect = blackhole.getBoundingClientRect();
        const blackholeCenterX = blackholeRect.left + blackholeRect.width / 2;
        const blackholeCenterY = blackholeRect.top + blackholeRect.height / 2;

        // Suck up planets and rocket
        const planets = document.querySelectorAll('.planets');
        const rocket = document.getElementById('rocket');
        planets.forEach(planet => {
            const planetRect = planet.getBoundingClientRect();
            const planetCenterX = planetRect.left + planetRect.width / 2;
            const planetCenterY = planetRect.top + planetRect.height / 2;

            // get distance to move
            const deltaX = blackholeCenterX - planetCenterX;
            const deltaY = blackholeCenterY - planetCenterY;

            
            planet.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
            planet.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(720deg) scale(0)`;
            planet.style.opacity = "0";
        });

        // Suck the rocket
        const rocketRect = rocket.getBoundingClientRect();
        const rocketCenterX = rocketRect.left + rocketRect.width / 2;
        const rocketCenterY = rocketRect.top + rocketRect.height / 2;
        const deltaX = blackholeCenterX - rocketCenterX;
        const deltaY = blackholeCenterY - rocketCenterY;

        rocket.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
        rocket.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(720deg) scale(0)`;
        rocket.style.opacity = "0";

        // Wait for the sucking animation to complete, then reveal the normal resume
        setTimeout(() => {
            document.getElementById('planets-section').style.display = 'none';
            document.getElementById('rocket').style.display = 'none';
            document.getElementById('resume-normal').style.display = 'block';
            setTimeout(() => {
                document.getElementById('resume-normal').style.opacity = '1';
            }, 100); 
        }, 2000); 
    });
    document.addEventListener("mousemove", function(event) {
        const customCursor = document.getElementById("custom-cursor");
        customCursor.style.left = event.pageX + "px";
        customCursor.style.top = event.pageY + "px";
    });
    
    document.addEventListener("mousedown", function() {
        const customCursor = document.getElementById("custom-cursor");
        customCursor.classList.add("clicked"); 
    });
    
    document.addEventListener("mouseup", function() {
        const customCursor = document.getElementById("custom-cursor");
        customCursor.classList.remove("clicked"); 
    });
    
    document.addEventListener("DOMContentLoaded", function() {
    const hoverInstructions = document.getElementById('hover-instructions');
    const blackholeInstructions = document.getElementById('blackhole-instructions');

    // Fade out the hover instructions when any planet is hovered
    document.querySelectorAll('.planets').forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            hoverInstructions.style.opacity = '0';
            setTimeout(() => {
                hoverInstructions.remove(); // Remove from DOM after fade
            }, 1000); // Wait for the fade to complete
        });
    });

    // Fade out the black hole instructions when the black hole is clicked
    document.getElementById('blackhole').addEventListener('click', function() {
        blackholeInstructions.style.opacity = '0';
        setTimeout(() => {
            blackholeInstructions.remove(); // Remove from DOM after fade
        }, 1000); // Wait for the fade to complete
    });
});





 
    document.getElementById('resume-close').addEventListener('click', function() {
        document.getElementById('resume-normal').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('resume-normal').style.display = 'none';
            const blackhole = document.getElementById('blackhole');
            document.getElementById('planets-section').style.display = 'flex';
            document.getElementById('rocket').style.display = 'block';
            
            const blackholeRect = blackhole.getBoundingClientRect();
            const blackholeCenterX = blackholeRect.left + blackholeRect.width / 2;
            const blackholeCenterY = blackholeRect.top + blackholeRect.height / 2;

            const planets = document.querySelectorAll('.planets');
            const rocket = document.getElementById('rocket');
            planets.forEach(planet => {
                const planetRect = planet.getBoundingClientRect();
                const planetCenterX = planetRect.left + planetRect.width / 2;
                const planetCenterY = planetRect.top + planetRect.height / 2;

                const deltaX = blackholeCenterX - planetCenterX;
                const deltaY = blackholeCenterY - planetCenterY;

                //make planets come out from the black hole
                planet.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
                planet.style.transform = `translate(${-deltaX}px, ${-deltaY}px) rotate(-720deg) scale(1)`;
                planet.style.opacity = "1";
            });

            const rocketRect = rocket.getBoundingClientRect();
            const rocketCenterX = rocketRect.left + rocketRect.width / 2;
            const rocketCenterY = rocketRect.top + rocketRect.height / 2;
            const deltaX = blackholeCenterX - rocketCenterX;
            const deltaY = blackholeCenterY - rocketCenterY;

            
            rocket.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out";
            rocket.style.transform = `translate(${-deltaX}px, ${-deltaY}px) rotate(-0deg) scale(1)`;
            rocket.style.opacity = "1";

            // Reset effects after the animation 
            setTimeout(() => {
                planets.forEach(planet => {
                    planet.style.transition = ""; 
                    planet.style.transform = ''; 
                });
                rocket.style.transition = ""; 
                rocket.style.transform = ''; 
            }, 2000); 
        }, 2000); 
    });

    
    window.closeModal = closeModal;
});