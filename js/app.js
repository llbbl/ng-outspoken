//  ====================================================================
//
//  Creating a global app namespace for the app
//  and injecting AngularFire so we can use any controller,
//  service or factory in the module
//
//
var app = angular.module("outApp", ["firebase", 'ui.bootstrap']);



//  ====================================================================
//
//  Injecting firebase into the controller
//  by adding $firebase as an argument to the controller's contructor
//
//
//
app.controller("outController", ["$scope", "$firebase",     // add in the firebase submodule


    function($scope, $firebase) {


        var ref         = new Firebase("https://brilliant-inferno-9267.firebaseio.com/station/hank/campaign_id/outspoken-feb-2015/contents");
        var obj         = $firebase(ref);                   //  Create an AngularFire reference to the data
        $scope.data     = obj.$asArray();                   //  Download the data into a local object
        var sync        = obj.$asObject();
        obj.$asObject().$bindTo($scope, "data");            // synchronize the object with a three-way data binding


        sync.$loaded().then(function() {
            // console.log("sync ID:", sync.$id );             //  same thing as: $inst().$ref().key()
        });


        console.log(sync);                                  // Log Firebase object to console


        // Setup rating stars
        $scope.rate = 0;                                    //  Set default rating to 0
        $scope.max = 5;                                     //  Max number of stars
        $scope.isReadonly = false;                          //  Set readOnly to false by default
        $scope.count = 0;


        $scope.hoveringOver = function(value) {             // Calculates the percentage of stars
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };


        //  ====================================================================
        //
        //  1)  Increment total amount of votes
        //  2)  Add up the value of the ratings
        //  3)  weighted average = count/count_cume
        //
        //
        $scope.voteTally = function (el) {

            var key = "2015-02-27T20:24:11-06:00"; // "2015-02-27T20:24:11-06:00"
            var updateData = new Firebase("https://brilliant-inferno-9267.firebaseio.com/station/hank/campaign_id/outspoken-feb-2015/contents/2015-02-27T20:24:11-06:00");

            console.log("Value from rating : " +el);
            // updateData.$update({ count: el });

            updateData.transaction(function(el) {
                // return ({ rating : el });
            });

            // replace some child nodes but leave the rest alone
            // var changedData = {count: , count_total: , baz: null};
            // sync.$update(changedData);

        }

    }


]);


// app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

//   $scope.items = ['item1', 'item2', 'item3'];

//   $scope.open = function (size) {

//     var modalInstance = $modal.open({
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       size: size,
//       resolve: {
//         items: function () {
//           return $scope.items;
//         }
//       }
//     });

//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };
// });

// // Please note that $modalInstance represents a modal window (instance) dependency.
// // It is not the same as the $modal service used above.

// app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };

//   $scope.ok = function () {
//     $modalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// });
