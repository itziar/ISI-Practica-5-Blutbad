describe("15- Puntuaciones", function(){

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
		
	it("draw", function(){
		var puntos = new GamePoints();        
		expect(puntos).toBeDefined();
		Game.points = 10;
		spyOn(ctx, "fillText");
		puntos.draw(ctx);
		expect(ctx.fillText.calls[0].args[0]).toEqual("00000010");
	});
	it("puntuacion", function(){
		var puntos = new GamePoints();
		SpriteSheet = {
			map :  { ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
				missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
				enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
				enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
				enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
				enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
				explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }}
		};
		var enemies = {
			basic: { x: 0, y: -50, sprite: 'enemy_purple', health: 10, E: 100 }
		};
		var dEnemigo = new Enemy(enemies.basic);
		dEnemigo.board = {
			add: function(){},
			remove: function(){}
		};
		dEnemigo.hit(10);
		expect(Game.points).toBe(100);
	});

});