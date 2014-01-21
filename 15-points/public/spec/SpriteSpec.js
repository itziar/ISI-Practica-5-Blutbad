describe("10 - SpriteSpec", function() {

    beforeEach(function() {
        SpriteSheet.map = {
            ship: { 
                sx: 0,
                sy: 0,
                w: 37,
                h: 42,
                frames: 1
            }
        }
        var spro = function() {
            this.setup("ship", {
                var1: 1,
                var2: 2
            });
        }
        spro.prototype = new Sprite();
        sp = new spro();
    });

    it("Sprite defined & set", function() {
        expect(SpriteSheet.map[sp.sprite]).toBeDefined();
        expect(sp.sprite).toEqual('ship');
    });

    it("Method setup", function() {
        expect(sp.var1).toBeDefined();
        expect(sp.var2).toBeDefined();
        expect(sp.var1).toBe(1);
        expect(sp.var2).toBe(2);
    });

    it("Method merge", function() {
        sp.merge({
            var1: 5,
            var2: 6
        });
        expect(sp.var1).toBe(5);
        expect(sp.var2).toBe(6);
    });
});