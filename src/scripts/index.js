import * as eruda from 'eruda';
import * as $ from 'jquery';

eruda.init();

console.log('Hello!');


$(() => {
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
	
	$('button').click(() => {
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