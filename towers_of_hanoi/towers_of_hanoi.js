function TowersOfHanoi(){
	this.stacks = new Array([], [], []);
}

TowersOfHanoi.prototype.createStacks = function(number){
		for(var i=1;i<=number;i++){
			this.stacks[0].push(i);
		}
		this.numDiscs = number;
}

TowersOfHanoi.prototype.showBoard = function(){
	for(var i=0;i<this.stacks.length;i++){
		console.log(this.stacks[i]);
	}
}

TowersOfHanoi.prototype.select = function(from, to){
	if (this.validateMove(from, to) === true){
		this.stacks[to].unshift(this.stacks[from].shift());
		return true;
	} else {
		return false;
	}
}

TowersOfHanoi.prototype.validateMove = function(from, to){
	if (this.stacks[to].length === 0){
		return true
	}
	return (this.stacks[from][0] < this.stacks[to][0]);
}

TowersOfHanoi.prototype.gameOver = function(){
	if (this.stacks[1].length === this.numDiscs || this.stacks[2].length === 				 this.numDiscs){
		return true;
	}
	return false;
}

function TowersOfHanoiUI(){
	this.game = new TowersOfHanoi();
	this.game.createStacks(2);
}

TowersOfHanoiUI.prototype.getBoard = function(){
	var that = this;

	$('pre').each(function(index, element){
		var tower = $(element).text("Tower " + index + ": " + that.game.stacks[index]);
		$('pre').append(tower);
	});
};

TowersOfHanoiUI.prototype.submitHandler = function(){
	var move = $('.input').val();
	var from = parseInt(move[0]);
	var to = parseInt(move[2]);

	this.game.select(from, to);
};

TowersOfHanoiUI.prototype.isGameOver = function(){
	return this.game.gameOver();
};

TowersOfHanoiUI.prototype.start = function(){
	var that = this;

	that.getBoard();

	$('.submit').click(function(){
		that.submitHandler();
		that.getBoard();

		if (that.isGameOver()){
			alert("You won!");
		}
	});
};

$(function(){
	var g = new TowersOfHanoiUI();
	g.start();
});
