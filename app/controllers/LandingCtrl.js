app.controller("LandingCtrl", ["$scope", "$q", "$firebaseArray", "$location",

    function($scope, $q, $firebaseArray, $location) {

    $scope.title = "Dynamic Groceries";

    // var ref = new Firebase("");

    // $scope.pins = $firebaseArray(ref);
    // console.log($scope.pins);

    $scope.viewNewList = function () {
        $location.url('/newlist');
    };

    $scope.viewSavedLists = function () {
        $location.url('/savedlists');
    };


}]);