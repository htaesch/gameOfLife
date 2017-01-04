var assert = require('assert');
var calc = require('../calculatrice.js');

describe('RPN', function () {
    describe('.compute()', function () {
        it('should return input when input is a number', function () {
            assert.equal(5, calc.compute(5));
        });

        it('should return 6 when input is 6', function () {
            assert.equal(6, calc.compute(6));
        });

        it('should return 16 when input is "2 4 + 2 5 * +"', function () {
            assert.equal(16, calc.compute('2 4 + 2 5 * +'));
        });

        it('should return 22 when input is "4 6 * 2 -"', function () {
            assert.equal(22, calc.compute('4 6 * 2 0 + -'));
        });

        it('should return 8 when input is "2 4 *"', function () {
            assert.equal(8, calc.compute('2 4 *'));
        });

        it('should return 3 when input is "6 2 /"', function () {
            assert.equal(3, calc.compute('6 2 /'));
        });

        it('should return 4 when input is "6 2 -"', function () {
            assert.equal(4, calc.compute('6 2 -'));
        });

        it('should return 2 when input is "4 sqrt"', function () {
            assert.equal(2, calc.compute('4 sqrt'));
        });
    });
    describe('.render()', function () {
        it('should return 6 - 2 when input is "6 2 -"', function () {
            assert.equal('6 - 2', calc.render('6 2 -'));
        });
        it('should return 4 + 1 - 6 * 2  when input is "4 1 + 6 2 * -"', function () {
            assert.equal('4 + 1 - 6 * 2', calc.render('4 1 + 6 2 * -'));
        });
        xit('should return 4 + 6 - 2 when input is "4 6 2 - +"', function () {
            assert.equal('4 + 6 - 2', calc.render('4 6 2 - +'));
        });
        xit('should return 4 * ( 6 - 2 ) when input is "4 6 2 - *"', function () {
            assert.equal('4 * ( 6 - 2 )', calc.render('4 6 2 - *'));
        });
        xit('should return 4 - 6 * 2  when input is "4 6 2 * -"', function () {
            assert.equal('4 - 6 * 2', calc.render('4 6 * 2 -'));
        });
    });
});

