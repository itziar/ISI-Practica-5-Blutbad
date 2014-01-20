/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el da�o (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligir� un da�o de cierta
    cuant�a a la nave enemiga con la que impacta, y desaparecer�.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El da�o ocasionado a una nave enemiga por un misil har�
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecer�.

  - cuando una nave enemiga colisione con la nave del jugador, deber� 
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificaci�n:

  En el prototipo 07-gameboard se a�adi� el constructor GameBoard. El
  m�todo overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rect�ngulos que circunscriben a
  los sprites que se le pasan como par�metros tienen intersecci�n no
  nula. El m�todo collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer par�metro ha
  colisionado con alg�n objeto del tipo que se le pasa como segundo
  par�metro.

  En este prototipo se utilizar� el m�todo collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el m�todo step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posici�n calculada, se comprobar�
  si han colisionado con alg�n objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino s�lo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al m�todo
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como par�metro el da�o que provoca
  para que la nave enemiga pueda calcular la reducci�n de salud que
  conlleva la colisi�n.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisi�n, recalcula su salud reduci�ndola
  en tantas unidades como el da�o del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produci�ndose en su
  lugar la animaci�n de una explosi�n.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisi�n, desaparece.

  El misil, tras informar llamando al m�tod hit() de la nave enemiga
  con la que ha detectado colisi�n, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.
  
  **********************************************************
   - que un misil con el da�o suficiente que colisiona con una nave
     enemiga la destruye, elimin�ndose la nave y el misil del tablero
     de juegos

   - que un misil con da�o insuficiente que colisiona con una nave
     enemiga no la destruye, reduce la salud de la nave enemiga, y
     desaparece del tablero de juegos sin que desaparezca la nave
     enemiga

   - que una bola de fuego que colisiona con una nave la destruye
     siempre, desapareciendo del tablero de juegos la nave enemiga, y
     no desapareciendo la bola de fuego

   - que una nave enemiga que colisiona con la nave del jugador la
     destruye, elimin�ndose tanto la nave enemiga como la nave del
     jugador tras aparecer la explosi�n en la pantalla

   En estas pruebas de integraci�n queremos comprobar que el c�digo
   real de GameBoard, PlayerShip, PlayerMissile, Enemy y FireBall
   interacciona correctamente, por lo que no deber�s crear objetos
   dummy para ellos. Sin embargo, no queremos probar el c�digo del
   resto de objetos (Game, SpriteSheet,...), por lo que estos �ltimos
   s� deben ser substituidos por dobles.
*/

describe("11 - Colisiones", function() {

  beforeEach(function() { 
    var sprites = {
      ship: {
        sx: 0,
        sy: 0,
        w: 37,
        h: 42,
        frames: 1
      },
      missile: {
        sx: 0,
        sy: 30,
        w: 2,
        h: 10,
        frames: 1
      },
      enemy_purple: {
        sx: 37,
        sy: 0,
        w: 42,
        h: 43,
        frames: 1
      },
      explosion: {
        sx: 0,
        sy: 64,
        w: 64,
        h: 64,
        frames: 12
      }
    };

    SpriteSheet.map = sprites;
    board = new GameBoard();
    enemy = new Enemy({ 
          x: 0,   
          y: -50, 
          sprite: 'explosion', 
          health: 10, 
          E: 100 
    }); 
    board.add(enemy);
  });

  // que un misil con el da�o suficiente que colisiona con una nave
  //  enemiga la destruye, elimin�ndose la nave y el misil del tablero
  //  de juegos
  it("Colisi�n del misil y nave enemiga, damage > health", function() {
    //Para que haya colision entre estos dos objetos
    misil = new PlayerMissile(1,1); 
    misil.x = enemy.x;
    misil.y = enemy.y;
    // Misil tiene de propiedad el damage a 10 y la salud del enemigo la reducimos a 10.
    enemy.health = 10;

    board.add(misil);
    expect(board.objects.length).toBe(2);

    board.step(0.0001);
    expect(_.contains(board.objects, enemy)).toBe(false);
    expect(_.contains(board.objects, misil)).toBe(false);
  });


  //    que un misil con da�o insuficiente que colisiona con una nave
  //    enemiga no la destruye, reduce la salud de la nave enemiga, y
  //    desaparece del tablero de juegos sin que desaparezca la nave
  //    enemiga
  it("Colisi�n del misil y nave enemiga, damage < health", function() { 
    //Para que haya colision entre estos dos objetoss
    misil = new PlayerMissile(1, 1);
    misil.x = enemy.x;
    misil.y = enemy.y;
 
    enemy.health = 100;

    board.add(misil); 
    expect(board.objects.length).toBe(2);
 
    board.step(0.0001); 
    expect(enemy.health).toBe(100-misil.damage);
    expect(_.contains(board.objects, enemy)).toBe(true);
    expect(_.contains(board.objects, misil)).toBe(false);
    //Misil se elimina pero la nave enemiga no
  });

  //    que una bola de fuego que colisiona con una nave la destruye
  //    siempre, desapareciendo del tablero de juegos la nave enemiga, y
  //    no desapareciendo la bola de fuego
  it("Colisi�n del FireBall y nave enemiga", function() { 
      //Para que haya colision entre estos dos objetoss
      ball = new FireBall(); 

      board.add(ball); 
      expect(board.objects.length).toBe(2);

      for (var dt = 0; dt <= 2; dt += 0.1) {
        board.step(dt); 
      }
      expect(_.contains(board.objects, enemy)).toBe(false);  
      expect(_.contains(board.objects, ball)).toBe(true);
      //Ball no se elimina pero la nave si
  });


//     que una nave enemiga que colisiona con la nave del jugador la
//     destruye, elimin�ndose tanto la nave enemiga como la nave del
//     jugador tras aparecer la explosi�n en la pantalla

  it("Colisi�n de PlayerShip y nave enemiga", function() {  
    ship = new PlayerShip();
    ship.x = enemy.x;
    ship.y = enemy.y; 
 
    board.add(ship);
    expect(board.objects.length).toBe(2);
  
    board.step(0.0001);
    expect(_.contains(board.objects, ship)).toBe(false);
    expect(_.contains(board.objects, enemy)).toBe(false);
    //Se han eliminado player y el enemigo
    expect(board.objects.length).toBe(1);
    //Se ha a�adido la explosion
  });
});