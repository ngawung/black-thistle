const eruda = require("eruda");
const $ = require("jquery");
const particlesJS = require("particles.js/particles");
const Typed = require("typed.js");

const background = require("../json/background");
const character = require("../json/character");
const script = require("../json/script");

eruda.init();

$(async () => {
	
	await runScript(script.start);
	
});

async function runScript(data) {
	var bg = data.background;
	var actions = data.actions;
	
	$("#background").attr("class", "house");
	
	for (var i=0; i<actions.length; i++) {
		var type = actions[i].type;
		
		if (type == "dialogue") {
			var typed = await getTyped("#text", actions[i].message)
		} else if (type == "character") {
			var image = await getCharacter(actions[i].id, actions[i].position, actions[i].animation)
			await delay(500);
		}
		
	}
	
	await removeCharacter();
	await delay(500);
}

function getTyped(el, text) {
	return new Promise(function(resolve) {
		var waiting = false;
		
		var options = {
			strings: [text],
			typeSpeed: 40,
			showCursor: false,
			fadeOut: true,
			fadeOutDelay: 0,
			onComplete: (typed) => {
				waiting = true;
			}
		};
		
		var typed = new Typed(el, options);
		
		$('#dialogue-box').show()
		
		$('#skip').click(() => {
			if (waiting) {
				typed.destroy();
				$('#dialogue-box').hide();
				$('#skip').off()
				
				resolve();
			} else {
				typed.destroy();
				$('#text').html(text);
				waiting = true;
			}
		});
	});
}

function getCharacter(id, position, animation) {
	return new Promise(function(resolve) {
		if ($("#" + id).length) {
			var img = $("#" + id);
			
			var newPos = ""
			if (animation == "center") {
				newPos = (window.innerWidth/2) - (img.width()/2) + "px"
			} else if (animation == "left") {
				newPos = ((window.innerWidth/2)/2) - (img.width()/2) + "px"
			} else if (animation == "right") {
				newPos = window.innerWidth - ((window.innerWidth/2)/2) - (img.width()/2) + "px"
			} else if (animation == "remove") {
				resolve(removeCharacter(id))
			}
		
			img.animate({
				left: newPos,
			}, {
				complete: () => {
					img.off();
					resolve();
				},
				duration: 500,
				//easing: "linear"
			});
			
		} else {
			var img = $(document.createElement('img'));
			img.addClass("character");
			img.attr("id", id);
			img.attr("src", character[id].src);
			img.css({
				bottom: "-100%",
				opacity: 0
			});
			
			$("#content").append(img);
			
			img.on("load", function() {
				img.css("bottom", "0px");
				
				if (animation == "left") {
					img.css("left", -img.width()/3);
				} else {
					img.css("left", window.innerWidth + img.width()/3);
				}
				
				var newPos = ""
				if (animation == "center") {
					newPos = (window.innerWidth/2) - (img.width()/2) + "px"
				} else if (animation == "left") {
					newPos = ((window.innerWidth/2)/2) - (img.width()/2) + "px"
				} else if (animation == "right") {
					newPos = window.innerWidth - ((window.innerWidth/2)/2) - (img.width()/2) + "px"
				}
			
				img.animate({
					left: newPos,
					opacity: 1,
				}, {
					complete: () => {
						img.off();
						resolve();
					},
					duration: 500,
					//easing: "linear"
				});
				
			});
			
		}
		
	});
}

function removeCharacter(id = "") {
	return new Promise(function(resolve) {
		if (id == "") id = ".character";
		else id = "#" + id;
		$(id).animate({
			opacity: 0,
		}, {
			complete: function() {
				this.remove();
				resolve();
			},
			duration: 500,
			//easing: "linear"
		});
	});
}

function delay(ms) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, ms)
   });
}

/*

$(() => {
	
	$('#reload').click(() => {
		
		
	});
	
	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
	
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
	
	$("#shake").click(() => {
		$("#character").toggleClass("shake");
	});
	
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
*/