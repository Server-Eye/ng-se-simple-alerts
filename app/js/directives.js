(function () {
    "use strict";

    angular.module('se').directive('seList', ['NodeService', function (NodeService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/list.html',
            scope: {
                title: '@',
                list: '='
            },
            link: function (scope) {
                scope.getParent = NodeService.getParent;
                scope.getCustomer = NodeService.getCustomer;
            }
        };
    }]);
})();