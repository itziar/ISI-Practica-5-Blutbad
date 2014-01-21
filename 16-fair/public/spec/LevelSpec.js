/*

	Requisitos:

		El objetivo de este prototipo es a�adir niveles al juego. En cada
		nivel deber�n ir apareciendo bater�as de enemigos seg�n avanza el
		tiempo.

		Cada nivel termina cuando no quedan enemigos por crear en ninguno
		de sus niveles, y cuando todos los enemigos del nivel han
		desaparecido del tablero de juegos (eliminados por misiles/bolas
		de fuego o desaparecidos por la parte de abajo de la pantalla).

		Cuando terminan todos los niveles sin que la nave haya colisionado
		termina el juego, ganando el jugador.

		Cuando la nave del jugador colisiona con un enemigo debe terminar
		el juego, perdiendo el jugador.


	Especificaci�n:

		El constructor Level() recibir� como argumentos la definici�n del
		nivel y la funci�n callback a la que llamar cuando termine el
		nivel.

		La definici�n del nivel tiene este formato:
			[ 
				[ parametros de bateria de enemigos ] , 
				[ parametros de bateria de enemigos ] , 
				... 
			]


			Los par�metros de cada bater�a de enemigos son estos:
						 Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
	 Ejemplo:
					 [ 0,              4000,       500,              'step',  { x: 100 } ]


		Cada vez que se llame al m�todo step() del nivel �ste comprobar�:

			- si ha llegado ya el momento de a�adir nuevos sprites de alguna
				de las bater�as de enemigos.
		
			- si hay que eliminar alguna bater�a del nivel porque ya ha
				pasado la ventana de tiempo durante la que hay tiene que crear
				enemigos

			- si hay que terminar porque no quedan bater�as de enemigos en
				el nivel ni enemigos en el tablero de juegos.

*/
describe("12 - Levels", function() {
	var canvas;
	var ctx;
	var enemies;
	var callbackd;
	var bateria;
	var SpriteSheetd, Gamed, level1d, level2d;

	beforeEach(function(){
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		bateria =[
			[0,400,500,'step'],
			[600, 500, 600, 'ltr']
		];		
		callbackd=function(){};
		SpriteSheetd = SpriteSheet;
		Gamed = Game;
		level1d = level1;
	});

	it("constructor Level", function() {
		var cl=new Level(bateria, callbackd);
		expect(cl).toBeDefined();
		expect(cl.levelData.length).toBe(bateria.length);
	});

	it ("step", function(){
	});
});