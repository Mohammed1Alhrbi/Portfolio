document.addEventListener('DOMContentLoaded', () => {
    // 1. Three.js 3D Background Setup (Premium Blue Grid)
    const canvas = document.querySelector('#three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Digital Grid Geometry (Blue)
    const gridHelper = new THREE.GridHelper(30, 60, '#00f2fe', '#001133');
    gridHelper.position.y = -6;
    gridHelper.rotation.x = Math.PI * 0.05;
    scene.add(gridHelper);

    // Particle Geometry (Sapphire Sparks)
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: '#0066cc',
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 10;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    const animate = () => {
        const time = Date.now() * 0.0003;
        
        particlesMesh.rotation.y = time * 0.1;
        gridHelper.position.z = (time * 10) % 1 - 0.5; // Infinite forward motion effect
        
        gridHelper.rotation.y = mouseX * 0.15;
        gridHelper.rotation.x = Math.PI * 0.05 - (mouseY * 0.1);

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    // 2. Terminal Typing Effect (Luxury Pace)
    const terminalText = document.querySelector('.hero-description');
    if (terminalText) {
        const content = terminalText.innerHTML;
        terminalText.innerHTML = '';
        terminalText.style.opacity = '1';
        let i = 0;
        const type = () => {
            if (i < content.length) {
                if (content.charAt(i) === '<') {
                    const end = content.indexOf('>', i);
                    terminalText.innerHTML += content.substring(i, end + 1);
                    i = end + 1;
                } else {
                    terminalText.innerHTML += content.charAt(i);
                    i++;
                }
                setTimeout(type, 20);
            }
        };
        setTimeout(type, 500); // Slight delay for entrance
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 3. Scroll Reveal for Modules
    const revealElements = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });
});

    // 2. Smooth Reveal for Sections
    const revealElements = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Floating image animation
    const heroImg = document.querySelector('.hero-image-container img');
    if (heroImg) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroImg.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
        });
    }
});
