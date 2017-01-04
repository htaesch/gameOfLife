var boardGrid = {
    size: null,
    board: null,
    element: null,
    rectList: [],
    setGrid: function (board, element, size) {
        this.board = board;
        this.element = element;
        this.size = size;
    },
    render: function () {
        var start = document.getElementById(this.element);
        var canvasSize = this.board.lines.length * this.size;
        start.width = canvasSize;
        start.height = canvasSize;
        var ctx = start.getContext("2d");
        var origin = start.getBoundingClientRect();
        this.rectList = [];


        for (var i = 1; i <= this.board.lines.length; i++) {
            for (var j = 1; j <= this.board.lines[i - 1].length; j++) {
                ctx.beginPath();
                var x = (j - 1) * this.size;
                var y = (i - 1) * this.size;
                ctx.rect(x,y,this.size, this.size);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.fillStyle= this.board.getValue(i, j) ? 'black' : 'grey';
                ctx.fill();


                this.rectList.push({"i": i, "j": j, "x": x + origin.left, "y": y + origin.top});
            }
        }
    },
    changeValue: function (x, y) {
        console.log ("legnth : " + this.rectList.length);
        console.log ("size: " + this.size);
        console.log ("x:" + x);
        console.log("y:" + y);
        for (var i = 0; i < this.rectList.length; i++) {
            if (x >= this.rectList[i].x
                && x <= (this.rectList[i].x + parseInt(this.size))
                && y >= this.rectList[i].y
                && y <= (this.rectList[i].y + parseInt(this.size))) {
                console.log ("i " + this.rectList[i].i + " j " + this.rectList[i].j + " x " + this.rectList[i].x + " y " + this.rectList[i].y);
                this.board.setValue(this.rectList[i].i, this.rectList[i].j,
                    !this.board.getValue(this.rectList[i].i, this.rectList[i].j));
                this.render();
            }
        }
    }

};


angular.module('gof', [])
    .controller('gameOfLifeController', CalculatriceController);


CalculatriceController.inject = ['gameOfLife'];
function CalculatriceController(gameOfLife) {
    var ctrl = this;

    ctrl.board = Object.create(internalBoard);
    ctrl.inputGrid = Object.create(boardGrid);
    ctrl.inputGrid.setGrid(ctrl.board, "inputBoard", 30);

    ctrl.frequency=1000;

    var state = null;

    ctrl.render = function() {
        ctrl.board.initBoard(ctrl.board.nbRows);
        ctrl.inputGrid.render();
    };

    ctrl.startGame = function () {
        var outputGrid = Object.create(boardGrid);
        outputGrid.setGrid(ctrl.inputGrid.board.copyBoard(), "resultBoard", ctrl.inputGrid.size);
        state = setInterval(function () {
            outputGrid.board = gameOfLife.getResultOfOneCycleJSON(outputGrid.board);
            outputGrid.render();
        }, ctrl.frequency);
    };

    ctrl.stopGame = function () {
        clearInterval(state);
    };

    ctrl.onMouseDown = function (event) {
        console.log(event);
        ctrl.inputGrid.changeValue(event.x, event.y);
    };
}





    
