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
        $scope.data = sync.$asArray();
        // $scope.data = sync.$asObject();


        // Log Firebase object to console
        console.log($scope.data);


        // Setup rating stars
        $scope.rate = 0;            //  Set default rating to 0
        $scope.max = 5;             //  Max number of stars
        $scope.isReadonly = false;  //  Set readOnly to false by default
        $scope.count = 0;

        // Calculates the percentage of stars
        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };


        // Tallys the total amount of ratings
        $scope.voteTally = function (el) {

            var key = ref.key();
            console.log(key)

            // For example, if we just want to increment a counter, which we aren't displaying locally,
            // we can just set it using the SDK
            ref.child(key+"/count").transaction(function(el) {
              // return (el || 0) + 1;
            });

            // $scope.count = el;

            // replace some child nodes but leave the rest alone
            // var changedData = {count: , count_total: , baz: null};
            // sync.$update(changedData);


            //  Increment total amount of votes
            // ref.transaction( function (el) {

            //     // alert(($scope.count || 0) +1);
            //     // return (el || 0) + 1;

            // });

            //  Add up the value of the ratings     (count_cume)

            //  weighted average = count/count_cume (rating)

        }


        //  Star styles
        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

    }


]);
