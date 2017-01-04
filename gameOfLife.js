var internalBoard = {
    lines: null,
    nbRows:3,
    numberOfLines: function () {
        return this.lines.length
    },
    numberOfColumns: function () {
        return this.lines[0].length;
    },
    getValue: function (row, column) {
        if (row <= 0 || column <= 0) {
            return false;
        }
        if (row > this.numberOfLines() || column > this.numberOfColumns()) {
            return false;
        }
        return this.lines[row - 1][column - 1] == "O"
    },
    setValue: function (row, column, value) {
        this.lines[row - 1][column - 1] = value ? "O" : " ";
    },
    render: function () {
        return this.lines.join("\n").replace(/,/g,"");
    },
    copyBoard: function() {
        var resultBoard = Object.create(internalBoard);
        resultBoard.lines = new Array(this.numberOfLines());
        for (var i = 0; i < this.numberOfLines(); i++) {
            resultBoard.lines[i] = new Array(this.numberOfColumns());
            for (var j = 0; j < this.numberOfColumns(); j++) {
                resultBoard.lines[i][j] = this.lines[i][j];
            }

        }
        return resultBoard;
    },
    initBoard: function() {
        this.lines = new Array(this.nbRows);
        for (var i = 0; i < this.nbRows; i++) {
            this.lines[i] = new Array(this.nbRows);
            for (var j = 0; j < this.nbRows; j++) {
                this.lines[i][j] = " ";
            }
        }
    }
};


var decideWhoMustLiveOrDie = function (cellState, numberOfLivingNeighbours) {
    if (cellState) {
        if (numberOfLivingNeighbours < 2) {
            return false;
        } else return numberOfLivingNeighbours < 4;
    } else {
        return numberOfLivingNeighbours == 3;
    }
};

function parseBoard(externalBoard) {
    var board = Object.create(internalBoard);
    var lines = externalBoard.split("\n");
    lines.forEach(function(item, i) {
        lines[i] = item.split("");
    });
    board.lines = lines;
    return board;
}


var getNumberOfLiveNeighbours = function (board, row, column) {
    var numberOfLiveNeighbours = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i != 0 || j != 0) {
                numberOfLiveNeighbours += board.getValue(row + i, column + j) ? 1 : 0;
            }
        }
    }
    return numberOfLiveNeighbours;

};

var getResultOfOneCycle = function (externalBoard) {
    var board = parseBoard(externalBoard);
    return getResultOfOneCycleJSON(board).render();
};

var getResultOfOneCycleJSON = function (board) {
    var resultBoard = board.copyBoard();
    var numberOfLines = board.numberOfLines();
    var numberOfColumns = board.numberOfColumns();
    for (var i = 1; i <= numberOfLines; i++) {
        for (var j = 1; j <= numberOfColumns; j++) {
            var numberOfLiveNeighbours = getNumberOfLiveNeighbours(board, i, j);
            var nextState = decideWhoMustLiveOrDie(board.getValue(i, j), numberOfLiveNeighbours);
            resultBoard.setValue(i, j, nextState);
        }
    }
    return resultBoard;
};

(function (isNode, isAngular) {

// This wrapper function returns the contents of your module,
// with dependencies
    var SilverBulletModule = function (Bullet, Silver) {
        var SilverBullet = function () {
            // something awesome happens here
        };
        return SilverBullet;
    };

    if (isAngular) {
        // AngularJS module definition
        angular.module('gof')
            .service('gameOfLife', function () {
                var service = this;
                service.parseBoard = function(board) {
                    return parseBoard(board);
                };
                service.getResultOfOneCycleJSON = function (externalBoard) {
                    return getResultOfOneCycleJSON(externalBoard);
                }
            });

    } else if (isNode) {
        module.exports.decideWhoMustLiveOrDie = decideWhoMustLiveOrDie;
        module.exports.getNumberOfLiveNeighbours = getNumberOfLiveNeighbours;
        module.exports.getResultOfOneCycle = getResultOfOneCycle;
        module.exports.getResultOfOneCycleJSON = getResultOfOneCycleJSON;
        module.exports.parseBoard = parseBoard;
    }

})(typeof module !== 'undefined' && module.exports,
    typeof angular !== 'undefined');
