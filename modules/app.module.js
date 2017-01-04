angular.module('app', [])
    .controller('calculatriceController', CalculatriceController);


CalculatriceController.inject = ['calculatrice'];
function CalculatriceController(calculatrice) {
    var ctrl = this;
    ctrl.input = '';
    ctrl.compute = function() {
        ctrl.outputCompute = calculatrice.compute(ctrl.input);
    };
    ctrl.render = function() {
        ctrl.outputRender =calculatrice.render(ctrl.input);
    }

};



    
