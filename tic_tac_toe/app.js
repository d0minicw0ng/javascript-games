$(function(){
	$(".humanvhuman").click(function(){
		new TicTacToeUI(0).start();
	});

	$(".humanvcomp").click(function(){
		new TicTacToeUI(1).start();
	});
});