function Snake(canvasWidth, canvasHeight){
	this.cuerpo = [[Math.floor(canvasWidth / 2), Math.floor(canvasHeight / 2)]];
	this.directions = {
		north: [-1, 0],
		south: [1, 0],
		east: [0, 1],
		west: [0, -1]
	};
	this.currentDirection = "north";
}

Snake.prototype.turn = function(dir){
	if (this.currentDirection === "north" && dir === "south"){
		this.currentDirection === this.currentDirection;
	} else if (this.currentDirection === "east" && dir === "west"){
		this.currentDirection === this.currentDirection;
	} else {
		this.currentDirection = dir; 
	}
}

Snake.prototype.step = function(ate){
	var direction = this.directions[this.currentDirection];

	var x = this.cuerpo[0][0] + direction[0];
	var y = this.cuerpo[0][1] + direction[1];
	this.cuerpo.unshift([x, y]);
	
	if (!ate){
		this.cuerpo.pop();
	} 
}
	
function Board(canvasWidth, canvasHeight){
	this.snake = new Snake(canvasWidth, canvasHeight);
	this.appleLocation = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
	this.canvas = Board.createBoard(canvasWidth, canvasHeight);
	this.dimension = { cWidth: canvasWidth, cHeight: canvasHeight }
	
}

Board.createBoard = function(canvasWidth, canvasHeight){
	canvas = [];
	for (var i = 0; i < canvasWidth; i++){
		canvas[i] = [];
		for (var j = 0; j < canvasHeight; j++){
			canvas[i][j] = " ";
		}
	}		
	return canvas;
}

Board.prototype.eatsApple = function(){
	var that = this;
	if ((that.snake.cuerpo[0][0] === that.appleLocation[0]) 
				&& (that.snake.cuerpo[0][1] === that.appleLocation[1])){
					that.appleLocation = [Math.floor(Math.random() * that.dimension.cWidth),
																Math.floor(Math.random() * that.dimension.cHeight)];
																
					return true;
				}
	return false;
}

Board.prototype.hitsWall = function(){
	var x = this.snake.cuerpo[0][0];
	var y = this.snake.cuerpo[0][1];
	var c = this.canvas.length - 1;
	
	return (x < 0 || x > c || y < 0 || y > c);
}

Board.prototype.hitsSelf = function(){
  var x = this.snake.cuerpo[0][0];
	var y = this.snake.cuerpo[0][1];
  var that = this;
	
  return _.filter(that.snake.cuerpo, function(body){
          return x == body[0] && y == body[1]}).length > 1;
};