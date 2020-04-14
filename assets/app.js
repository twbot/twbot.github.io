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
window.onload = function()  {particlesJS("particles-js", particlesJSON)};

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		document.getElementById("navbar").style.padding = "30px 10px";
		document.getElementById("logo").style.fontSize = "25px";
		document.getElementById("profile").style.marginTop = "180px";
		document.getElementById("navbar").style.backgroundColor = "rgba(245,245,245,0.8)";
	} else {
		document.getElementById("navbar").style.padding = "50px 10px";
		document.getElementById("logo").style.fontSize = "35px";
		document.getElementById("profile").style.marginTop = "180px";
		document.getElementById("navbar").style.backgroundColor = "rgba(245,245,245,1)";
	}
}

function showPage(id, text) {
    var i, tabcontent, links;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}