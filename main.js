var app = angular.module('app', ['ui.bootstrap']);

app.controller('turing-machine', function($scope) {
    var DIRECTION_LEFT = 'Left';
    var DIRECTION_RIGHT = 'Right';
    $scope.symbols = {'∅': '∅', 'A': 'A', 'B': 'B'};
    $scope.states = [
        {
            name: "MyState",
            rules: [
                {
                    on: 'A',
                    write: 'B',
                    move: DIRECTION_RIGHT
                }
            ]
        },
        {
            name: "HisState"
        },
    ];
    $scope.addSymbol = function() {
        $scope.symbols[$scope.new_symbol] = $scope.new_symbol
    };
});
