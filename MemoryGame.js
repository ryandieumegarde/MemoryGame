var memory_array_all = [];
for (var i = 1; i <= 12; i++ ) {
	memory_array_all.push("Images/" + i + ".jpg");
}
var memory_array = [];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var time= 0;
var timer;
var timeToComplete;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	if (timer != null) {
		clearInterval(timer);
	}
	var end = document.getElementById('picNum');
	tiles_flipped = 0;
	var output = '';
	memory_array = [];
	var horizontalTiles;
	var numOfTiles = parseInt(end.options[end.selectedIndex].innerHTML);
	if (numOfTiles == 8) {
		horizontalTiles = 4;
		timeToComplete = 60;
	}
	if (numOfTiles == 10) {
		horizontalTiles = 5;
		timeToComplete = 75;
	}
	if (numOfTiles == 12) {
		horizontalTiles = 6;
		timeToComplete = 100;
	}
	document.getElementById("memory_board").style.width = (horizontalTiles * 124) + 'px';
	document.getElementById("memory_board").style.height = 500 + 'px';
	for (var i = 0; i < numOfTiles; i++) {
		memory_array.push(memory_array_all[i]);
		memory_array.push(memory_array_all[i]);
	}
    memory_array.memory_tile_shuffle();
	var level = document.getElementById("difLevel").selectedIndex;
	if (level == 0) time = 8;
	if (level == 1) time = 5;
	if (level == 2) time = 3;
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" style="background: url('+memory_array[i]+') no-repeat" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
	setTimeout(function() {flip_All(memory_array);}, 1000 * time);
}

function countDown() {
	timeToComplete--;
	if (timeToComplete > 50) {
		document.getElementById('timeLeft').style.color = "#00aa00";
		document.getElementById('timeLeft').innerHTML = timeToComplete;
	} else if (timeToComplete > 15) {
		document.getElementById('timeLeft').style.color = "#4400ff";
		document.getElementById('timeLeft').innerHTML = timeToComplete;
	} else if (timeToComplete > 0) {
		document.getElementById('timeLeft').style.color = "#ff0000";
		document.getElementById('timeLeft').innerHTML = timeToComplete;
	}
	if (timeToComplete == 0) {
		document.getElementById('timeLeft').innerHTML = '';
		displayLoss();
		clearInterval(timer);
	}
}

function displayLoss () {
	var audioLoss = new Audio("lose.mp3");
	audioLoss.currentTime = 72.7;
	audioLoss.play();
	alert("You have failed! Better luck next time!");
	document.getElementById('memory_board').innerHTML = "";
	clearInterval(timer);
	location.reload();
}

function flip_All (mem) {
	for (var i = 0; i < mem.length; i++) {
		document.getElementById("tile_"+i).style.background ='url("Images/carpet.jpg") no-repeat';
	}
	timer = setInterval(function() {countDown();}, 1000);
}

function memoryFlipTile(tile,val){
	if(tile.style.background == 'url("Images/carpet.jpg") no-repeat' && memory_values.length < 2 ){
		tile.style.background = 'url('+val+') no-repeat';
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					var audioWin = new Audio("champion.mp3");
					audioWin.currentTime = 34.5;
					audioWin.play();
					alert("WE ARE THE CHAMPIONS!!!");
					document.getElementById('memory_board').innerHTML = "";
					clearInterval(timer);
					location.reload();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(Images/carpet.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(Images/carpet.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 500);
			}
		}
	}
}