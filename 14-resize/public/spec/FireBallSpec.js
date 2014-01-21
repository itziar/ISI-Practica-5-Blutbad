/*
 * FireBallSpec
 */

//----------Especificación----------------------
//Comprobar si se borra cuando esta fuera del rango
//Comprobar si sigue una trayectoria parabolica
//Comprobar si se añade al tablero?
//
describe("09 - FireBall", function() {  

    var canvas, ctx;

    beforeEach(function() {
        loadFixtures('index.html');

        canvas = $('#game')[0];
        expect(canvas).toExist();

        ctx = canvas.getContext('2d');
        expect(ctx).toBeDefined();

        SpriteSheet.map = {
            explosion: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
        }
        x = 140;
        y = 428;
        fireb = new FireBall(x, y, 1);
        fireb.board = new GameBoard(); 
        fireb.board.remove = function(obj) {};
    });
 
    it("Add to board", function() {  
        fireb.board.add(fireb);
        expect(_.contains(fireb.board.objects, fireb)).toBe(true);
    }); 

    it("Method step: Comprobar posición", function() { 
        x = x - fireb.w / 20;
        y = y - fireb.h / 10;
        expect(fireb.x).toBe(x);
        expect(fireb.y).toBe(y); 

        dt = 25;
        x += dt * fireb.vx; 
        desplazX = fireb.desplazX + dt * Math.abs(fireb.vx); 
        x += dt * fireb.vx; 
        y = fireb.desplazY + Math.pow(desplazX, 2);

        fireb.step(dt);
        expect(fireb.x).toBe(x);
        expect(fireb.y).toBe(y);
    });

    it("Method step: Comprobar fuera del tablero", function() {
        spyOn(fireb.board, "remove");

        dt = 1000;
        fireb.step(dt); 
        expect(fireb.board.remove).toHaveBeenCalled();
    });

    it("Method draw de fireball", function() {
        spyOn(SpriteSheet, 'draw');
        fireb.draw(ctx);
        expect(SpriteSheet.draw).toHaveBeenCalledWith(ctx, 'explosion', fireb.x, fireb.y, 1, 40, 40);
    });
});