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
            "type": "polygon",
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
            "enable": false,
            "distance": 200,
            "color": "#ff5722",
            "opacity": 0.3,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom",
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
                "enable": true,
                "mode": [
                    "grab",
                    "bubble"
                ]
            },
            "onclick": {
                "enable": true,
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

var viewable = [true, true, true, true, true];

var textViewable = [false, false, false];

var pdfState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

var showSubMenu = false;

// document.onreadystatechange = function(e)
// {
//     if (document.readyState === 'complete')
//     {
//         determineMenu();
//     }
// };

window.onload = function()  {
    if(window.innerWidth < 950) {
        document.getElementById("defaultPhoneOpen").click();
    }
    else {
        document.getElementById("defaultOpen").click();
    }
    
    sphereAnimation();
    // particlesJS("particles-js", particlesJSON);
};

window.onscroll = function() {scrollFunction()};

window.onresize = function() {
    determineMenu();
}

function determineMenu() {

    if(window.innerWidth < 950) {
        document.getElementById("navbar-right").classList.add('noShow');
        document.getElementById("navbar-right-small").classList.remove('noShow');
    }
    else {
        document.getElementById("navbar-right").classList.remove('noShow');
        document.getElementById("navbar-right-small").classList.add('noShow');
    }
}

function showMenu() {
    this.showSubMenu = !this.showSubMenu;
    var x = document.getElementById("navbar-right-small-menu");
    if (showSubMenu) {
        x.style.display = "block"
    } else {
         x.style.display = "none";
    }
}

function scrollFunction() {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		document.getElementById("navbar").style.padding = "30px 10px";
		document.getElementById("logo").style.fontSize = "25px";
		document.getElementById("navbar").style.backgroundColor = "rgba(245,245,245,0.8)";
	} else {
		document.getElementById("navbar").style.padding = "50px 10px";
		document.getElementById("logo").style.fontSize = "35px";
		document.getElementById("navbar").style.backgroundColor = "rgba(245,245,245,1)";
	}
}

function flipCard(id) {
    var viewBack, viewFront, dir;
    if(viewable[id]) {
        viewBack = 'block';
        viewFront = 'none';
        dir = 'rotateX(180deg)'
    } else {
        viewBack = 'none';
        viewFront = 'block';
        dir = 'rotateX(0deg)'
    }
    cardId = 'card-inner-' + id.toString();
    cardFront = 'card-front-' + id.toString();
    cardBack = 'card-back-' + id.toString();
    expand = 'expand-' + id.toString();
    document.getElementById(cardId).style.transform = dir;
    document.getElementById(cardId).style.transform = dir;
    function styleChange() {
        document.getElementById(expand).style.transform = dir;
        document.getElementById(cardFront).style.display = viewFront;
        document.getElementById(cardBack).style.display = viewBack;
    }
    setTimeout(styleChange, 225);
    viewable[id] = !viewable[id];
}

function showPage(event, tab) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

function showText(event, tab) {
    if(tab === 'web') {
        var text = document.getElementById('web-text');
        var rectangle = document.getElementsByClassName('rectangle-web')[0];
        textViewable[0] = !textViewable[0];
        if(textViewable[0]){
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (185) + "px)";
            text.style.display = 'block';
        } else {
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (-25) + "px)";
            text.style.display = 'none';
        }
    }
    if(tab === 'neuro') {
        var text = document.getElementById('neuro-text');
        var rectangle = document.getElementsByClassName('rectangle-neuro')[0];
        textViewable[1] = !textViewable[1];
        if(textViewable[1]){
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (-225) + "px)";
            text.style.display = 'block';
        } else {
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (-5) + "px)";
            text.style.display = 'none';
        }
    }
    if(tab === 'robotics') {
        var text = document.getElementById('robotics-text');
        var rectangle = document.getElementsByClassName('rectangle-robot')[0];
        textViewable[2] = !textViewable[2];
        if(textViewable[2]){
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (225) + "px)";
            text.style.display = 'block';
        } else {
            rectangle.style.transform = "rotateZ(" + (-15) + "deg) translateX(" + (25) + "px)";
            text.style.display = 'none';
        }
    }
}


function download(file) {
    var link = document.createElement('a');
    link.href = './assets/pdfs/'+file.toString();
    link.download = file;
    link.dispatchEvent(new MouseEvent('click')); 
}

function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
  }
  resize();
  window.addEventListener('resize', resize);
}

function sphereAnimation() {

  var sphereEl = document.querySelector('.sphere-animation');
  var sphereElSVG = document.querySelector('.sphere');
  console.log(sphereElSVG)
  var spherePathEls = sphereElSVG.querySelectorAll('path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: ['rgba(0,72,38,1)', 'rgba(255,255,255,1)'], duration: 500},
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
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
      delay: anime.stagger(190, {direction: 'reverse'})
    },
    duration: 2000,
    delay: anime.stagger(60, {direction: 'reverse'}),
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
