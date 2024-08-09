var pdfState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

var currentActiveTab = "about";
var currentActiveProjectCard = null;

window.onload = function () {
    sphereAnimation();
    // particleBuilders();
    // static();
};

window.onscroll = function () { scrollFunction() };

function showPage(event, tab) {
    if (tab === currentActiveTab) {
        return;
    }
    const element = document.getElementById(tab);
    if (currentActiveTab) {
        const priorElement = document.getElementById(currentActiveTab);
        priorElement.classList.add('hidden');
        priorElement.classList.remove('block');
    }
    element.classList.remove('hidden');
    element.classList.add('block');
    currentActiveTab = tab;
}

function download(file) {
    var link = document.createElement('a');
    link.href = './assets/pdfs/' + file.toString();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dispatchEvent(new MouseEvent('click'));
}

function onClickProjectCard(cardName) {
    var id = cardName + '-card';
    currentActiveProjectCard = id
    const projectCardContainer = document.getElementById('project-card-container');
    projectCardContainer.classList.remove('hidden');
    projectCardContainer.classList.add('block');
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.classList.add('hidden');
    projectsContainer.classList.remove('block');
    const projectCard = document.getElementById(id);
    projectCard.classList.add('block');
    projectCard.classList.remove('hidden');
}

function closeProjectCard() {
    const projectCardContainer = document.getElementById('project-card-container');
    projectCardContainer.classList.remove('block');
    projectCardContainer.classList.add('hidden');
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.classList.add('block');
    projectsContainer.classList.remove('hidden');
    const projectCard = document.getElementById(currentActiveProjectCard);
    projectCard.classList.add('hidden');
    projectCard.classList.remove('block');
    currentActiveProjectCard = null;
    return null;
}

function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        var pad = padding || 0;
        var parentEl = el.parentNode;
        var elOffsetWidth = el.offsetWidth - pad;
        var parentOffsetWidth = parentEl.offsetWidth;
        var ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

function sphereAnimation() {

    var sphereEl = document.querySelector('#sphere-animation');
    var sphereElSVG = document.querySelector('#sphere');
    var spherePathEls = sphereElSVG.querySelectorAll('path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
        begin: function () {
            for (var i = 0; i < pathLength; i++) {
                aimations.push(anime({
                    targets: spherePathEls[i],
                    stroke: { value: ['rgba(0,72,38,1)', 'rgba(255,255,255,1)'], duration: 500 },
                    translateX: [2, -4],
                    translateY: [2, -4],
                    easing: 'easeOutQuad',
                    autoplay: false
                }));
            }
        },
        update: function (ins) {
            aimations.forEach(function (animation, i) {
                var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                animation.seek(animation.duration * percent);
            });
        },
        duration: Infinity,
        autoplay: false
    });

    var introAnimation = anime.timeline({
        autoplay: false
    })
        .add({
            targets: spherePathEls,
            strokeDashoffset: {
                value: [anime.setDashoffset, 0],
                duration: 3900,
                easing: 'easeInOutCirc',
                delay: anime.stagger(190, { direction: 'reverse' })
            },
            duration: 2000,
            delay: anime.stagger(60, { direction: 'reverse' }),
            easing: 'linear'
        }, 0);

    var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
    }, 0);

    function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
    }

    init();

}

function particleBuilders() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    class Particle {
        constructor(x, y, radius, angle) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angle = angle;
            this.targetX = x;
            this.targetY = y;
            this.originalX = x;
            this.originalY = y;
            this.breatheDepth = Math.random() * 20 + 10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 72, 38, 1)';
            ctx.fill();
            ctx.closePath();
        }

        update(time, state) {
            if (state === 'initial' || state === 'return') {
                const breathe = Math.sin(time / 1000) * this.breatheDepth;
                this.targetX = this.originalX + Math.cos(this.angle) * breathe;
                this.targetY = this.originalY + Math.sin(this.angle) * breathe;
            }

            this.x += (this.targetX - this.x) * 0.1;
            this.y += (this.targetY - this.y) * 0.1;

            this.draw();
        }
    }

    let particles = [];
    let animationState = 'initial';
    const numParticles = 200;

    function createParticles() {
        particles = [];
        const centerX = 200;
        const centerY = (canvas.height / 2) + 100; // Position above the bottom div
        const donutRadius = 60;

        for (let i = 0; i < numParticles; i++) {
            const angle = (i / numParticles) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * donutRadius;
            const y = centerY + Math.sin(angle) * donutRadius;
            particles.push(new Particle(x, y, 4, angle));
        }
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => particle.update(time, animationState));

        requestAnimationFrame(animate);
    }

    function moveToBorder() {
        const container = document.getElementById('project-card-container');
        const blogRect = container.getBoundingClientRect();
        const centerX = blogRect.left + blogRect.width / 2;
        const centerY = blogRect.top + blogRect.height / 2;
        const width = blogRect.width;
        const height = blogRect.height;
        const cornerRadius = 10;

        particles.forEach((particle, index) => {
            const t = index / particles.length;
            let x, y;

            if (t < 0.25) { // Top edge
                x = centerX - width / 2 + cornerRadius + t * 4 * (width - 2 * cornerRadius);
                y = centerY - height / 2;
            } else if (t < 0.5) { // Right edge
                x = centerX + width / 2;
                y = centerY - height / 2 + cornerRadius + (t - 0.25) * 4 * (height - 2 * cornerRadius);
            } else if (t < 0.75) { // Bottom edge
                x = centerX + width / 2 - cornerRadius - (t - 0.5) * 4 * (width - 2 * cornerRadius);
                y = centerY + height / 2;
            } else { // Left edge
                x = centerX - width / 2;
                y = centerY + height / 2 - cornerRadius - (t - 0.75) * 4 * (height - 2 * cornerRadius);
            }

            // Adjust for rounded corners
            if (t < 0.0625 || (t >= 0.25 && t < 0.3125) ||
                (t >= 0.5 && t < 0.5625) || (t >= 0.75 && t < 0.8125)) {
                const cornerT = (t % 0.25) * 4;
                const cornerAngle = cornerT * Math.PI / 2;
                x += cornerRadius * Math.sin(cornerAngle);
                y -= cornerRadius * (1 - Math.cos(cornerAngle));
            } else if (t < 0.25 || (t >= 0.3125 && t < 0.5) ||
                (t >= 0.5625 && t < 0.75) || t >= 0.8125) {
                const cornerT = ((t + 0.1875) % 0.25) * 4;
                const cornerAngle = cornerT * Math.PI / 2;
                x += cornerRadius * Math.cos(cornerAngle);
                y += cornerRadius * Math.sin(cornerAngle);
            }

            particle.targetX = x;
            particle.targetY = y;
        });
    }

    // Add click event to the card
    document.getElementById('project-card').addEventListener('click', () => {
        animationState = 'move';
        moveToBorder();

        setTimeout(() => {
            animationState = 'return';
            particles.forEach(particle => {
                particle.targetX = particle.originalX;
                particle.targetY = particle.originalY;
            });
        }, 1000); // Wait for 3 seconds before returning
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate(0);
}