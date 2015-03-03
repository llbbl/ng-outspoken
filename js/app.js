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
app.controller("outController", ["$scope", "$firebase",


    function($scope, $firebase) {

        //  Reference to our Firebase data
        var ref = new Firebase("https://brilliant-inferno-9267.firebaseio.com/station/hank/campaign_id/outspoken-feb-2015/contents");

        //  Create an AngularFire reference to the data
        var sync = $firebase(ref);

        //  Download the data into a local object
        $scope.data = $firebase(ref).$asArray();
        // $scope.data = sync.$asObject();

        console.log($scope.data);


    }


]);


app.controller('ratingController', function ($scope) {

        $scope.rate = 0;
        $scope.max = 5;
        $scope.isReadonly = false;


        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.voteTally = function (value) {
            alert(value);
        }

    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];


});
