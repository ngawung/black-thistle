import * as eruda from 'eruda';
import * as $ from 'jquery';
import 'particles.js/particles';
import Typed from 'typed.js';

const particlesJS = window.particlesJS;

eruda.init();

//console.log(particlesJS);

$(() => {
	
	$('#reload').click(() => {
		
		$("#character").remove();
		
		var img = $(document.createElement('img'));
		img.attr("id", "character");
		img.attr("src", "/images/melody.png");
		img.css({
			bottom: "0px",
			opacity: 0,
			left: "-10%"
		});
		
		$("#content").append(img);
			
		img.on("load", function() {
			img.animate({
				left: (window.innerWidth/2) - (img.width()/2) + "px",
				opacity: 1
			}, 400);
		});
	});
	
	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
	
	/*
	var dialogue = "im so bored so i make this shit";
	var splitText = dialogue.split("");
	
	var i = 0
	var isDone = false
	var interval = setInterval(() => {
		$("#text").text( $("#text").text() + splitText[i] )
		i++
		if (i>splitText.length - 1) {
			isDone = true;
			clearInterval(interval)
		}
	}, 200);
	*/
	
	var dialogue = [
		"im so <span class='red'>bored</span> so i make this shit",
		"here some random notes",
		"im tired, pls just work already",
		"i miss my friend"
	];
	
	var waiting = false;
	var currentPos = 0
	
	var typed = getTyped("#text", dialogue[currentPos], (typed) => {
		waiting = true;
		currentPos++
	});
	
	
	$('#skip').click(() => {
		if (waiting) {
			if (currentPos<dialogue.length) {
				waiting = false;
				typed = getTyped("#text", dialogue[currentPos], (typed) => {
					waiting = true;
					currentPos++
				});
			} else {
				$("#text").text("done");
			}
		} else {
			typed.destroy();
			$("#text").html(dialogue[currentPos]);
			waiting = true;
			currentPos++
		}
	});
	
	
	
	/*
	for (var i=0; i<splitText.length; i++) {
		((i) => { // to make sure setTimeout callback can access i variable
			setTimeout(() => {
				$("#text").text( $("#text").text() + splitText[i] )
			}, 100 * i);
		})(i);
	}
	*/
    
});

function getTyped(el, text, onComplete) {
	var options = {
		strings: [text],
		typeSpeed: 40,
		showCursor: false,
		fadeOut: true,
		fadeOutDelay: 0,
		onComplete: (typed) => {
			onComplete(typed);
		}
	};
	
	return new Typed(el, options);
}


function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}