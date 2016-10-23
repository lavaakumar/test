/// <reference path="C:\Users\vmc54818\Downloads\AngularJSGrid\WebApplication4\WebApplication2\editUIgridscript.js" />
//var uigrid = angular.module('uigrid', ['ngTouch', 'ui.grid']);
//alert('hi');

//var TestCtrl = function ($scope, $http)
//    {
//    alert('1');
//    $scope.CustomerList = {
//               excludeProperties: '__metadata',
//    };
//    alert($scope.load);
//    $scope.load = function () {
//        alert('2');
//        $http({
//            url: "NewRoute/getDataForAngularGrid",
//            dataType: 'json',
//            method: 'GET',
//            data: '',
//            headers: {
//                "Content-Type": "application/json"
//            }
//        }).success(function (response) {
//            debugger;
//            $scope.CustomerList = response;
//        })
//           .error(function (error) {
//               alert(error);
//           });
//    }
//}






(function () {
    debugger;
   // alert('hi');
    angular.module('uigrid', ['ngTouch', 'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.cellNav',
        'ui.grid.expandable',
        'ui.grid.edit',
        'ui.grid.rowEdit',
        'ui.grid.saveState',
        'ui.grid.resizeColumns',
        'ui.grid.pinning',
        'ui.grid.moveColumns',
        'ui.grid.exporter',
        'ui.grid.infiniteScroll',
        'ui.grid.importer',
        'ui.grid.grouping']).controller('TestCtrl', function ($scope, $http) {
        //alert('23');
        $scope.CustomerList = [];
      //  alert('1');
        function loadData() {
            debugger;
         //   alert('2');
            $http({
                url: "NewRoute/getDataForAngularGrid",
                dataType: 'json',
                method: 'GET',
                data: '',
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function (response) {
                $scope.CustomerList = response;
            })
               .error(function (error) {
                   alert(error);
               });
        }
        loadData();
       // alert('5');
    });
   // alert('9');
}());





