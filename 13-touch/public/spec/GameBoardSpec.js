/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.

 
  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("09 - Clase GameBoard", function() {
    var canvas, ctx;


    beforeEach(function() {
        board = new GameBoard();
        expect(board).toBeDefined();

    });

    it("step + draw", function() {
        var pDummy = function() {
            this.step = function(dt) {};
            this.draw = function(ctx) {};
        };

        var dummy = new pDummy;
        board.add(dummy);
        spyOn(dummy, 'step');
        spyOn(dummy, 'draw');

        board.draw(ctx);
        board.step(1);

        expect(dummy.step).toHaveBeenCalled();
        expect(dummy.draw).toHaveBeenCalled();
    });



    it("add", function() {
        playerShip = 8;
        board.add(playerShip);

        expect(board.objects.length).toEqual(1);
    });

    it("iterate", function() {
        var ob = function() {
            this.method = function() {}
        };
        ob1 = new ob();
        ob2 = new ob();
        board.add(ob1);
        board.add(ob2);

        spyOn(ob1, 'method');
        spyOn(ob2, 'method');
        board.iterate('method');

        expect(ob1.method).toHaveBeenCalled();
        expect(ob2.method).toHaveBeenCalled();
    });


    it("resetRemove", function() {
        board.resetRemoved();
        expect(board.removed).toBeDefined();
    });



    it("remove", function() {

        var pDummy = function() {
            this.step = function(dt) {
                board.remove(this);
            };
            this.draw = function(ctx) {};
        };
        var playerDummy = new pDummy();

        playerDummy = board.add(playerDummy);
        expect(board.objects.length).toEqual(1);

        board.resetRemoved();
        board.remove(playerDummy);


        board.finalizeRemoved();
        expect(board.removed.length).toEqual(1);
        expect(board.objects.length).toEqual(0);

    });

    it("overlap", function() {
        var ob = function() {
            this.x = 10;
            this.y = 10;
            this.w = 20;
            this.h = 20;
        }
        var ob1 = new ob();
        var ob2 = new ob();
        var ob3 = new ob();
        ob3.x = 40;
        ob3.y = 40;

        expect(board.overlap(ob1, ob2)).toBe(true);
        expect(board.overlap(ob1, ob3)).toBe(false);
    });

    it("collide", function() {

        var ob = function() {
            this.x = 10;
            this.y = 10;
            this.w = 20;
            this.h = 20;
        }
        var ob1 = new ob();
        var ob2 = new ob();
        var ob3 = new ob();
        ob3.x = 40;
        ob3.y = 40;
        board.add(ob1);
        board.add(ob2);
        board.add(ob3);
        expect(board.collide(ob1)).toEqual(ob2);
        expect(board.collide(ob3)).toBe(false);
    });

});