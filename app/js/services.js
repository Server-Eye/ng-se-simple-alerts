(function () {
    "use strict";

    angular.module('se').factory('NodeService', ['seaMe',
    function(seaMe) {
        var data = [],
        byId = {},
        byCustomer = {};
                
        function getById(nodeId) {
            return byId[nodeId];
        }
        
        function customer(nodeId) {
            var fnc = function(nodeId) {
                var node = getById(nodeId);
                                
                if(!node || !node.parentId) {
                    return {};
                }
                                
                // type 1: customer
                if(node.type == 1) {
                    return node;
                }
                
                return fnc(node.parentId);
            }
            
            return fnc(nodeId);
        }
        
        function parent(nodeId) {
            var node = getById(nodeId);
            if(!node) {
                return {};
            }
            
            node = getById(node.parentId);
            
            return node || {};
        }
        
        function prepareData() {            
            byId = {};
            byCustomer = {};
            
            angular.forEach(data, function(node) {                
                byId[node.id] = node;
            });
                        
            angular.forEach(data, function(node) {
                var _customer = customer(node.id);
                            
                if(!_customer) {
                    return;
                }
                            
                node.customerId = _customer.id;
                            
                if(!byCustomer[_customer.id]) {
                    byCustomer[_customer.id] = [];
                }
                            
                byCustomer[_customer.id].push(node);
            });
        }
        
        return {
            load : function() {
                return seaMe.nodes({
                    listType: 'list'
                }).then(function(nodes) {                    
                    data = nodes;
                    prepareData();
                    
                    return data;
                });
            },
            all : function() {
                return data;
            },
            get : getById,
            getCustomer : customer,
            getParent : parent
        }
    }
    ]);

})();