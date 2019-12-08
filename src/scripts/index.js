import * as eruda from 'eruda';
import * as $ from 'jquery';
import 'particles.js/particles';

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
	
	$('#skip').click(() => {
		if(!isDone) {
			clearInterval(interval)
			$("#text").text( dialogue );
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

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}