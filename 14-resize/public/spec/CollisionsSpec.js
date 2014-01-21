/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el daño (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligirá un daño de cierta
    cuantía a la nave enemiga con la que impacta, y desaparecerá.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El daño ocasionado a una nave enemiga por un misil hará
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecerá.

  - cuando una nave enemiga colisione con la nave del jugador, deberá 
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificación:

  En el prototipo 07-gameboard se añadió el constructor GameBoard. El
  método overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rectángulos que circunscriben a
  los sprites que se le pasan como parámetros tienen intersección no
  nula. El método collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer parámetro ha
  colisionado con algún objeto del tipo que se le pasa como segundo
  parámetro.

  En este prototipo se utilizará el método collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el método step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posición calculada, se comprobará
  si han colisionado con algún objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino sólo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al método
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como parámetro el daño que provoca
  para que la nave enemiga pueda calcular la reducción de salud que
  conlleva la colisión.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisión, recalcula su salud reduciéndola
  en tantas unidades como el daño del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produciéndose en su
  lugar la animación de una explosión.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisión, desaparece.

  El misil, tras informar llamando al métod hit() de la nave enemiga
  con la que ha detectado colisión, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.
  
  **********************************************************
   - que un misil con el daño suficiente que colisiona con una nave
     enemiga la destruye, eliminándose la nave y el misil del tablero
     de juegos

   - que un misil con daño insuficiente que colisiona con una nave
     enemiga no la destruye, reduce la salud de la nave enemiga, y
     desaparece del tablero de juegos sin que desaparezca la nave
     enemiga

   - que una bola de fuego que colisiona con una nave la destruye
     siempre, desapareciendo del tablero de juegos la nave enemiga, y
     no desapareciendo la bola de fuego

   - que una nave enemiga que colisiona con la nave del jugador la
     destruye, eliminándose tanto la nave enemiga como la nave del
     jugador tras aparecer la explosión en la pantalla

   En estas pruebas de integración queremos comprobar que el código
   real de GameBoard, PlayerShip, PlayerMissile, Enemy y FireBall
   interacciona correctamente, por lo que no deberás crear objetos
   dummy para ellos. Sin embargo, no queremos probar el código del
   resto de objetos (Game, SpriteSheet,...), por lo que estos últimos
   sí deben ser substituidos por dobles.
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

  // que un misil con el daño suficiente que colisiona con una nave
  //  enemiga la destruye, eliminándose la nave y el misil del tablero
  //  de juegos
  it("Colisión del misil y nave enemiga, damage > health", function() {
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


  //    que un misil con daño insuficiente que colisiona con una nave
  //    enemiga no la destruye, reduce la salud de la nave enemiga, y
  //    desaparece del tablero de juegos sin que desaparezca la nave
  //    enemiga
  it("Colisión del misil y nave enemiga, damage < health", function() { 
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
  it("Colisión del FireBall y nave enemiga", function() { 
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
//     destruye, eliminándose tanto la nave enemiga como la nave del
//     jugador tras aparecer la explosión en la pantalla

  // it("Colisión de PlayerShip y nave enemiga", function() {  
  //   ship = new PlayerShip();
  //   ship.x = enemy.x;
  //   ship.y = enemy.y; 
 
  //   board.add(ship);
  //   expect(board.objects.length).toBe(2);
  
  //   board.step(0.0001);
  //   expect(_.contains(board.objects, ship)).toBe(false);
  //   expect(_.contains(board.objects, enemy)).toBe(false);
  //   //Se han eliminado player y el enemigo
  //   expect(board.objects.length).toBe(1);
  //   //Se ha añadido la explosion
  // });
});