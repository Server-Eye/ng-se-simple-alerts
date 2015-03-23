(function () {
    "use strict";

    /* 
     * Status definition
     * ------------------------------
     * NOT_INITIALIZED: 0
     * SHUTDOWN: 1
     * OK: 2
     * ERROR: 3
     * NO_HEARTBEAT: 4
     * WORKING: 6
    */
    
    angular.module('se').controller('MainController', ['$scope', '$timeout', 'NodeService',
    function ($scope, $timeout, NodeService) {
            $scope.error = null;
            $scope.yeah = false;
            $scope.errors = [], $scope.working = [];
        
            var errorStatus = [ 0, 3, 4 ],
                workingStatus = [ 6 ];
        
            function initLists(data) {
                $scope.errors = [], $scope.working = [];

                angular.forEach(data, function (node) {
                    if (node.usersNode) {
                        if (workingStatus.indexOf(node.status) >= 0) {
                            $scope.working.push(node);
                        } else if (errorStatus.indexOf(node.status) >= 0) {
                            $scope.errors.push(node);
                        }
                    }
                });

                console.log('lists initialized');
            }

            function reload() {
                NodeService.load().then(function (data) {
                    initLists(data);
                    $scope.error = null;
                    $scope.yeah = true;
                }, function(err) {
                    $scope.error = err;
                    console.error(err.statusText);
                });

                $timeout(function () {
                    reload();
                }, 60000);
            }

            reload();
    }]);
})();