function Game(canvasWidth, canvasHeight){
	this.board = new Board(canvasWidth, canvasHeight);
}

Game.prototype.drawBoard = function(){ 	
	var that = this;
	
	for(var i = 0; i < that.board.dimension.cHeight ; i++){
		var row = $("<div></div>").addClass("row").attr('id', 'row' + i);
		$('#board').append(row);
		
		for(var j = 0; j < that.board.dimension.cWidth; j++){
			var box = $("<span></span>").addClass("box").attr('id', 'col' + j);
			$('#row' + i).append(box);
		}
	}
}

Game.prototype.renderSnake = function(){
	var that = this;
	that.board.snake.cuerpo.forEach(function(element, index){
		var x = that.board.snake.cuerpo[index][0];
		var y = that.board.snake.cuerpo[index][1];
		$('#row' + x).find('#col' + y).removeClass("red").addClass("green");
	})	
}

Game.prototype.clearBoard = function(){
	var that = this;
	
	for(var i = 0; i < that.board.dimension.cHeight ; i++){
		$('div').find('#row' + i).remove();
	}
}

Game.prototype.renderApple = function(){
	var x = this.board.appleLocation[0];
	var y = this.board.appleLocation[1];
	
	$('#row' + x).find('#col' + y).addClass("red");
}

Game.prototype.step = function(){
	var appleEaten = this.board.eatsApple();
	this.getUserInput();
	this.board.snake.step(appleEaten);
		
	if (this.board.hitsWall() || this.board.hitsSelf()){
		return false;
	} else {
		return true;
	}
}

Game.prototype.play = function(){
	var that = this;
	
	var interval = window.setInterval(function(){
		if (!that.step()){
			var c = confirm("Game Over, Play again?");
			if (c === true){
				var game = new Game(30, 30);

				$(function(){
					game.play();
				})
			}
			
			window.clearInterval(interval);
		};
		
		that.clearBoard();
		that.drawBoard();
		that.renderApple();
		that.renderSnake();
	}, 50)
}

Game.prototype.getUserInput = function() {
  var that = this;
	
  $('html').keydown(function (event) {
    switch(event.keyCode)
    {
      case 38: 
        that.board.snake.turn("north");
        break;
      case 40: 
        that.board.snake.turn("south");
        break;
      case 37: 
        that.board.snake.turn("west");
        break;
      case 39:
        that.board.snake.turn("east");
        break;
    }
  });
}

var game = new Game(30, 30);

$(function(){
	game.play();
})