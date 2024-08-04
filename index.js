const particlesJSON = {
    "particles": {
        "number": {
            "value": 12,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#2d7254"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 2,
                "color": "#2d7254"
            },
            "polygon": {
                "nb_sides": 7
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 10,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#2d7254",
            "opacity": 0.3,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "random",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": [
                    "grab",
                    "bubble"
                ]
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.7
                }
            },
            "bubble": {
                "distance": 600,
                "size": 12,
                "duration": 1,
                "opacity": 0.8,
                "speed": 2
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 20
            },
            "remove": {
                "particles_nb": 10
            }
        }
    },
    "retina_detect": true
}

var pdfState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

var currentActiveTab = "projects";

window.onload = function () {
    sphereAnimation();
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

function static() {
    const canvas = document.getElementById('staticCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStatic() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const randomValue = Math.floor(Math.random() * 256);
            data[i] = randomValue; // Red
            data[i + 1] = randomValue; // Green
            data[i + 2] = randomValue; // Blue
            data[i + 3] = 255; // Alpha
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function animate() {
        createStatic();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}
