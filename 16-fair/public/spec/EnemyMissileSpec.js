describe("16- Missile", function(){

	var canvas, ctx, enemies;
	var dSpriteSheet, dGame, dctx;

	beforeEach(function(){
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		dctx = ctx;
		dSpriteSheet = SpriteSheet;
		dGame = Game;
	});

	afterEach(function() {
		ctx = dctx;
		SpriteSheet = dSpriteSheet;
		Game = dGame;
	});
		
	it("Constructor", function(){
		SpriteSheet = {
			map :  { 
				enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1 }}
		};
		var nemico_missile=new EnemyMissile(10,10)
		expect(nemico_missile).toBeDefined();
	});
//falta la pruebas con la nave y la bola de fuego

});