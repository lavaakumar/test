
var app = angular.module('app',
    [

        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.cellNav',
        'ui.grid.edit',
        'ui.grid.rowEdit',
        'ui.grid.saveState',
        'ui.grid.resizeColumns',
        'ui.grid.pinning',
        'ui.grid.moveColumns',
        'ui.grid.exporter',
        'ui.grid.infiniteScroll',
        'ui.grid.importer',
        'ui.grid.grouping'
    ]);

//app.filter('genderFilter', function () {
//    var genderHash = {
//        'M': 'male',
//        'F': 'female'
//    };

//    return function (input) {
//        var result;
//        var match;
//        if (!input) {
//            return '';
//        } else if (result = genderHash[input]) {
//            return result;
//        } else if ((match = input.match(/(.+)( \([$\d,.]+\))/)) && (result = genderHash[match[1]])) {
//            return result + match[2];
//        } else {
//            return input;
//        }
//    };
//});

//app.filter('maritalFilter', function () {
//    var genderHash = {
//        'M': 'Married',
//        'S': 'Single'
//    };

//    return function (input) {
//        var result;
//        var match;
//        if (!input) {
//            return '';
//        } else if (result = genderHash[input]) {
//            return result;
//        } else if ((match = input.match(/(.+)( \([$\d,.]+\))/)) && (result = genderHash[match[1]])) {
//            return result + match[2];
//        } else {
//            return input;
//        }
//    };
//})

app.controller('gridCtrl', ['$scope', '$http', '$log', '$timeout', 'uiGridConstants', '$q', '$interval',
    function ($scope, $http, $log, $timeout, uiGridConstants, $q, $interval) {
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };

        $scope.convertDate = function (str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("/");
        };
        var expandableScope = {};

        debugger;
        $scope.poject = [];
        $scope.gridOptions = {
            enableFiltering:true,
            //expandableRowTemplate: '<div style="padding:5px;"><div ui-grid="row.entity.subGridOptions[0]" ui-grid-edit  ui-grid-row-edit ui-grid-selection style="height:340px;display:inline-block;"></div></div>',
            //expandableRowHeight: 350,
            columnDefs: [
                {
                    name: "",
                    field:"fake",
                    cellTemplate: '<div class="ui-grid-cell-contents" >' +
                    '<button value="Edit" ng-if="!row.inlineEdit.isEditModeOn" ng-click="row.inlineEdit.enterEditMode($event)">Delete</button>' +
                    '<button value="Edit" ng-if="!row.inlineEdit.isEditModeOn" ng-click="row.inlineEdit.enterEditMode($event)">Edit</button>' +
                    '<button value="Edit" ng-if="row.inlineEdit.isEditModeOn" ng-click="row.inlineEdit.saveEdit($event)">Update</button>' +
                    '<button value="Edit" ng-if="row.inlineEdit.isEditModeOn" ng-click="row.inlineEdit.cancelEdit($event)">Cancel</button>' +
                    '</div>',
                     enableCellEdit: false,
                            enableFiltering:false,
                            enableSorting: false,
                            showSortMenu : false,
                            enableColumnMenu: false,
                },
                { name: 'CustomerId', enableCellEdit: true, type: "number" },

                { name: 'Name', enableCellEdit: true, type: "string" },
                //{
                //    name: 'hiredate', enableCellEdit: true, type: "date", cellFilter: 'date:"yyyy/MM/dd"',
                //    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.convertDate(row.entity[col.field])}}</div>'
                //},
                {
                    name: 'Address', enableCellEdit: true, type: "string"
                },
                 {
                     name: 'Email', enableCellEdit: true, type: "string"
                 },
                 {
                     name: 'PhoneNumber', enableCellEdit: true, type: "string"
                 },
                  {
                      name: 'Date', enableCellEdit: true, type: "string"
                      //cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.convertDate(row.entity[col.field])}}</div>'
                  },
                  {
                      name: 'projects', enableCellEdit: true, //cellFilter: 'genderFilter',
                      editableCellTemplate: 'ui-grid/dropdownEditor',
                      editDropdownOptionsArray:$scope.poject ,
                      editDropdownRowEntityOptionsArrayPath: 'ddprojects',
                      editDropdownIdLabel: 'ddName',
                      editDropdownvalueLabel: 'ddName'
                        
                      //editDropdownOptionsArray: $scope.poject
                  },

                //    cellTemplate: '<div class="ui-grid-cell-contents"><div ng-class="{\'viewr-dirty\' : row.inlineEdit.entity[col.field].isValueChanged }">{{row.entity[col.field]}}</div></div>'
                //},
                // { name: 'birthdate', enableCellEdit: true, type: "date", cellFilter: 'date:"yyyy/MM/dd"' },
                //{
                //    name: 'maritalstatus', enableCellEdit: true, cellFilter: "maritalFilter",
                //    editableCellTemplate: 'ui-grid/dropdownEditor',
                //    editDropdownValueLabel: 'maritalstatus',
                //    editDropdownOptionsArray: [
                //        { id: 'M', maritalstatus: 'Married' },
                //        { id: 'S', maritalstatus: 'Single' }]
                //},
                //{
                //    name: 'gender', enableCellEdit: true, cellFilter: 'genderFilter',
                //    editableCellTemplate: 'ui-grid/dropdownEditor',
                //    editDropdownValueLabel: 'gender',
                //    editDropdownOptionsArray: [
                //        { id: 'M', gender: 'male' },
                //        { id: 'F', gender: 'female' }]
                //},

            ],
            enableGridMenu: true,
            virtualizationThreshold: 60,
            //expandableRowScope: {
            //    subGridVariable: 'subGridScopeVariable'
            //}
        }

        $http({
            url: "NewRoute/getDataFordd",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
         .success(function (data) {
             debugger;
             //$scope.gridOptions.columnDefs[7].editDropdownOptionsArray = data;
             $scope.poject = data
         })
     .error(function (error) {
         alert(error);
     });

        //$scope.gridOptions.multiSelect = true;

         // $http.get('https://rawgit.com/msrikanth508/uiGridInlineEditPOC/master/data/employeeData.json')
     
        $http({
            url: "NewRoute/getDataForAngularGrid",
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .success(function (data) {
                for (i = 0; i < data.length; i++) {
                    data[i].projects = data[i].ddName;
                    data[i].ddprojects = $scope.poject;
                }
                $scope.gridOptions.data = data.slice(0, 55); //[data[0], data[1]];
            })
        .error(function (error) {
            alert(error);
        });


      

        //// Action option data from Web API
        //$http.get('/api/getDataFordd')
        //.success(function (data) {
        //    $scope.gridOptions.columnDefs[22].editDropdownOptionsArray = data;
        //})

        $scope.SendData = function (data) {
            debugger;
            //$http(
            //    'NewRoute/submitdata',
            //    JSON.stringify(data),
            //    {
            //        headers: {
            //            'Content-Type': 'application/json'
            //        }
            //    }
            //).success(function (data) {
            //    $scope.gridOptions.data = data.slice(0, 55);
            //});
            //var GetAll = new Object();
            //GetAll.CustomerId = Data.CustomerId;
            //GetAll.Name = Data.Name;
            //GetAll.Email = Data.Email;
            //GetAll.PhoneNumber = Data.PhoneNumber;
            //GetAll.Date = Data.Date;
            //this.scope.IsToBeShown = true;
            //this.$scope.IsToBeShown = true;
            $http({
                url: "NewRoute/firstCall",
                dataType: 'json',
                method: 'POST',
                data: angular.toJson(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function (response) {
                $scope.value = response;
            })
               .error(function (error) {
                   alert(error);
               });
        }
        //$http.post(urlTest, '"' + $scope.item.Title + '"').success(function (result) {
        //    alert('Success!');
        //}).error(function (data) {
        //    alert("Error!");
        //});

        $scope.info = {};

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            debugger;
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                $log.log(msg);
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;
                $log.log(msg);
            });

            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                var selectedRows = $scope.gridApi.selection.getSelectedRows();

                if (newValue != oldValue) {

                    rowEntity.state = "Changed";
                    //Get column
                    debugger;
                    var rowCol = $scope.gridApi.cellNav.getFocusedCell().col.colDef.name;

                    angular.forEach(selectedRows, function (item) {
                        item[rowCol] = rowEntity[rowCol];// $scope.convertDate(rowEntity[rowCol]);
                        item.state = "Changed";
                        item.isDirty = false;
                        item.isError = false;
                    });

                }
            });

            gridApi.rowEdit.on.saveRow($scope, function (rowEntity) {
                debugger;
                // create a fake promise - normally you'd use the promise returned by $http or $resource
                //Get all selected rows
                var selectedRows = $scope.gridApi.selection.getSelectedRows();
                //var rowCol = $scope.gridApi.cellNav.getFocusedCell().col.colDef.name;
                var promise = $q.defer();
                $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

                $interval(function () {
                    if (rowEntity.gender === 'male') {
                        promise.reject();
                    } else {
                        promise.resolve();
                    }
                }, 3000, 1);
            })


        };
    }])

.filter('fitlerprj', function () {
    var genderHash = {
        1: 'Bachelor',
        2: 'Nubile',
        3: 'Married'
    };

    return function(input) {
        if (!input){
            return '';
        } else {
            return genderHash[input];
        }
    };
});

//debugger;




