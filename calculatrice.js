Array.prototype.contains = function (input) {
    return this.indexOf(input) > -1;
};

var operationTree = {
    left: 0,
    right: 0,
    operator: "+",

    accept: function (visitor) {
        return visitor[this.operator].call(null,
            this.left && isNaN(this.left) ? this.left.accept(visitor): this.left,
            this.right && isNaN(this.right) ? this.right.accept(visitor): this.right);
    }
};

const operatorsCompute = {
    '+': (a, b)=>Number(a) + Number(b),
    '*': (a, b)=>Number(a) * Number(b),
    '-': (a, b)=>Number(a) - Number(b),
    '/': (a, b)=>Number(a) / Number(b),
    'sqrt': (a)=>Math.sqrt(a)
};

const operatorsRender = {
    '+': (a, b)=>a + ' + ' + b,
    '-': (a, b)=>a + ' - ' + b,
    '*': (a, b)=>a + ' * ' + b,
    'sqrt': (a)=>'sqrt (' + a + ')'
};


var manageParenthesis = function (operatorRender, result) {
    return "( " + operatorRender() + " )";
};

var compute = function (input) {
    return isNaN(input) ? reduceRecur(operatorsCompute, input) : input;
};

var render = function (input) {
    return isNaN(input) ? reduceRecur(operatorsRender, input) : input;
};

var reduceRecur = function (operators, input) {
    var returnTree = createTreeOperator(operators, input);
    return returnTree.accept(operators);

};

var createTreeOperator = function (operators, input) {
    const inputArray = String(input).split(" ");
    var result = [];
    inputArray.forEach(function (item) {
        var operator = operators[item];
        if (operator) {
            const arity = operator.length;
            var args = result.splice(result.length - arity, arity);
            var tree = Object.create(operationTree);
            tree.operator = item;
            tree.left = args[0];
            tree.right = args[1] ? args[1] : null;
            result.push(tree);
        } else {
            result.push(parseFloat(item));
        }
    });
    return result.pop();
};

(function(isNode, isAngular) {

// This wrapper function returns the contents of your module,
// with dependencies
    var SilverBulletModule = function(Bullet, Silver) {
        var SilverBullet = function() {
            // something awesome happens here
        };
        return SilverBullet;
    };

    if (isAngular) {
        // AngularJS module definition
        angular.module('app')
            .service('calculatrice', function() {
                var service = this;
                service.compute = function (input) {
                    return compute(input);
                }
                service.render = function (input) {
                    return render(input);
                }
            });

    } else if (isNode) {
        module.exports.compute = compute;
        module.exports.render = render;
    }

})(typeof module !== 'undefined' && module.exports,
    typeof angular !== 'undefined');
