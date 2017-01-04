var assert = require('assert');
var gol = require('../gameOfLife.js');

describe('gameOfLife', function () {
    describe('.decideWhoMustLiveOrDie()', function () {
        it('should kill cell when number of live neighbours is less than 2', function () {
            assert.equal(gol.decideWhoMustLiveOrDie(true, 1), false);
            assert.equal(gol.decideWhoMustLiveOrDie(true, 0), false);
        });
        it('should not kill cell when number of live neighbours is 2 or 3', function () {
            assert.equal(gol.decideWhoMustLiveOrDie(true, 2), true);
            assert.equal(gol.decideWhoMustLiveOrDie(true, 3), true);
        });
        it('should kill cell when number of live neighbours is more than 3', function () {
            assert.equal(gol.decideWhoMustLiveOrDie(true, 4), false);
            assert.equal(gol.decideWhoMustLiveOrDie(true, 8), false);
        });
        it('should resurrect cell when number of live neighbours is exactly 3', function () {
            assert.equal(gol.decideWhoMustLiveOrDie(false, 3), true);
            assert.equal(gol.decideWhoMustLiveOrDie(false, 2), false);
            assert.equal(gol.decideWhoMustLiveOrDie(false, 4), false);
        });
    });
    describe('.getNumberOfLiveNeighbours()', function () {
        it('should return number of live neighbours of a cell', function () {
            const board = "" +
                " O \n" +
                "O  \n" +
                "OOO";
            assert.equal(gol.getNumberOfLiveNeighbours(gol.parseBoard(board), 2, 2), 5);
            assert.equal(gol.getNumberOfLiveNeighbours(gol.parseBoard(board), 1, 1), 2);
            assert.equal(gol.getNumberOfLiveNeighbours(gol.parseBoard(board), 3, 3), 1);

        });
    });
    describe('.getResultOfOneCycle()', function () {
        it('should oscillate on each cycle for blinker example', function () {
            const boardStateOne = "" +
                "   \n" +
                "OOO\n" +
                "   ";
            const boardStateTwo = "" +
                    " O \n" +
                    " O \n" +
                    " O ";
            assert.equal(gol.getResultOfOneCycle(boardStateOne), boardStateTwo);
            assert.equal(gol.getResultOfOneCycle(boardStateTwo), boardStateOne);
        });
        it('should oscillate on each cycle for toad example', function () {
            const boardStateOne = "" +
                "    \n" +
                " OOO\n" +
                "OOO \n" +
                "    ";
            const boardStateTwo = "" +
                "  O \n" +
                "O  O\n" +
                "O  O\n" +
                " O  ";
            assert.equal(gol.getResultOfOneCycle(boardStateOne), boardStateTwo);
            assert.equal(gol.getResultOfOneCycle(boardStateTwo), boardStateOne);
        });
    });

});