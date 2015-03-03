//  ====================================================================
//
//  Creating a global app namespace for the app
//  and injecting AngularFire so we can use any controller,
//  service or factory in the module
//
//
var app = angular.module("outApp", ["firebase"]);



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
