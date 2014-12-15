function Board(){
	this.board = [["?", "?", "?"], ["?", "?", "?"], ["?", "?", "?"]];
	this.currentMark = 'X';
}

Board.prototype.dupBoard = function(){
	var that = this;
	var board_copy = new Board();
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			board_copy.board[i][j] = that.board[i][j];
		}
	}
	return board_copy;
}

Board.prototype.makeMove = function(x, y, mark){
	var that = this;
	if (that.isValidMove(x, y)){
		that.board[x][y] = mark || that.currentMark;
		that.currentMark = (that.currentMark === 'X' ? 'O' : 'X');
		return true;
		} else {
		return false;
	}
}

Board.prototype.isValidMove = function(x, y){
	return this.moveInRange(x, y) && this.isEmptyPosition(x, y);
}

Board.prototype.moveInRange = function(x, y){
	return (x >= 0 && x <= 2 && y >= 0 && y <= 2);
}

Board.prototype.isEmptyPosition = function(x, y){
	return (this.board[x][y] === "?");
}

Board.prototype.isGameOver = function(){
	return (this.horizontalWin(this.board) ||
					this.verticalWin(this.board) ||
					this.diagonalWin(this.board));
}

Board.prototype.allSame = function(array){
	var mark = array[0];
	if (mark === '?') { return false; }
	for (var i = 1; i < 3; i++){
		if (mark !== array[i]){
			return false;
		}
	}
	return true;
}

Board.prototype.horizontalWin = function(board){
	return this.checkRows(board);
}

Board.prototype.transpose = function(arr){
	var transposedArr = [];
	for(var i = 0; i < arr.length; i++){
		var row = [];
		for(var j = 0; j < arr[0].length; j++){
			row.push(arr[j][i]);
		}
		transposedArr.push(row);
	}
	return transposedArr;
}

Board.prototype.verticalWin = function(){
	var transposedBoard = this.transpose(this.board);
	return this.checkRows(transposedBoard);
}

Board.prototype.checkRows = function(board){
	for(var i = 0; i < 3; i++){
		if (this.allSame(board[i])){
			return true;
		}
	}
	return false;
}

Board.prototype.diagonalWin = function(board){
	var diag1 = [board[0][0], board[1][1], board[2][2]];
	var diag2 = [board[0][2], board[1][1], board[2][0]];
	return this.allSame(diag1) || this.allSame(diag2);
}

Board.prototype.isTie = function(board){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if (board[i][j] === '?'){
				return false;
			}
		}
	}
	return true;
}

function TicTacToe(n) {
	this.board = new Board();

	this.hasCompPlayer = false;
	if (n === 1){
		this.compPlayer = new ComputerPlayer('X');
		this.hasCompPlayer = true;
	}
}

TicTacToe.prototype.makeMove = function(x, y){
	this.board.makeMove(x, y);
}

function ComputerPlayer(mark) {
	this.mark = mark;
}

ComputerPlayer.prototype.findMove = function(board){
	return this.winningMove(board) || this.blockingMove(board) || this.randomMove(board);
}

ComputerPlayer.prototype.winningMove = function(board){
	var that = this;
	var dupBoard = board.dupBoard();
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if (dupBoard.board[i][j] === '?'){
				dupBoard.makeMove(i, j);
				if (dupBoard.isGameOver()){
					return [i, j];
				} else {
					dupBoard.board[i][j] = "?";
				}
			}
		}
	}
	return null;
}

ComputerPlayer.prototype.blockingMove = function(board){
	var that = this;
	var dupBoard = board.dupBoard();
	var humanMark = "O";
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			if (dupBoard.board[i][j] === '?'){
				dupBoard.makeMove(i, j, humanMark);
				if (dupBoard.isGameOver()){
					return [i, j]
				} else {
					dupBoard.board[i][j] = '?';
				}
			}
		}
	}
	return null;		
}

ComputerPlayer.prototype.randomMove = function(board){
	var x = Math.floor(Math.random() * 3);
	var y = Math.floor(Math.random() * 3);
	while (board.board[x][y] !== "?"){
		x = Math.floor(Math.random() * 3);
		y = Math.floor(Math.random() * 3);
	}

	return [x, y];
}


function TicTacToeUI(n){
	this.game = new TicTacToe(n);
	this.board = this.game.board;
}

TicTacToeUI.prototype.start = function(){
	var that = this;
	that.displayGame();
	$('.box').each(function(idx, element){
		that.moveHandler(idx + 1);
		if (that.isGameOver()){
			return;
		}
	});
};

TicTacToeUI.prototype.displayGame = function(){
	var that = this;

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			var idx = j + 1 + i * 3;
			if (that.board.board[i][j] !== "?"){
				var a = $('#' + idx).text(that.board.board[i][j]);
				if (that.board.board[i][j] === 'X'){
					a.addClass('yellow');
				} else {
					a.addClass('green');
				}
			} else {
				var a = $('#' + idx).text("");
			}
			$('#' + idx).append(a);
		}
	}
};

TicTacToeUI.prototype.moveHandler = function(id){
	var that = this;
	$('#' + id).click(function(event){
		if (that.isGameOver()){
			return;
		}
		var coords = that.returnCoordinates(id);
		if (!that.board.makeMove(coords[0], coords[1])){
			return;
		}
		that.displayGame();

		if (that.isGameOver()){
			that.board.currentMark = (that.board.currentMark === 'X') ? 'O' : 'X';
			alert(that.board.currentMark + " wins!");
			return;
		} else if (that.isTie()){
			alert("Tie!")
			return;
		}

		if (that.game.hasCompPlayer){
			var move = that.game.compPlayer.findMove(that.board);
			that.board.makeMove(move[0], move[1]);
			that.displayGame();
			if (that.isGameOver()){
				that.board.currentMark = (that.board.currentMark === 'X') ? 'O' : 'X';
				alert(that.board.currentMark + " wins!");
				return;
			} else if (that.isTie()) {
			alert("Tie!")
			return;
		}
		}
	});
};

TicTacToeUI.prototype.returnCoordinates = function(pos){
	if (pos < 4){
		return [0, pos - 1];
	} else if (pos < 7){
		return [1, pos - 4];
	} else if (pos < 10){
		return [2, pos - 7];
	}
}

TicTacToeUI.prototype.isGameOver = function(){
	if (this.board.isGameOver()){
		return true;
	}
	return false;
}

TicTacToeUI.prototype.isTie = function(){
	if (this.board.isTie(this.board.board)){
		return true;
	}
	return false;
}