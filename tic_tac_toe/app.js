$(function(){
	$(".humanvhuman").click(function(){
		$('.box').removeClass('green');
		$('.box').removeClass('yellow');
		new TicTacToeUI(0).start();
	});

	$(".humanvcomp").click(function(){
		$('.box').removeClass('green');
		$('.box').removeClass('yellow');
		new TicTacToeUI(1).start();
	});
});