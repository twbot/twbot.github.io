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

var pdfState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

window.onload = function()  {
    document.getElementById("defaultOpen").click();
    particlesJS("particles-js", particlesJSON);
};

window.onscroll = function() {scrollFunction()};

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


function download(file) {
    var link = document.createElement('a');
    link.href = './assets/pdfs/'+file.toString();
    link.download = file;
    link.dispatchEvent(new MouseEvent('click')); 
}
