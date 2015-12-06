app.controller("LandingCtrl", ["$scope", "$q", "$firebaseArray", "$location",

    function($scope, $q, $firebaseArray, $location) {

    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
    // prefer pop-ups, so we don't navigate away from the page
    var authData = ref.getAuth();
    console.log(authData);

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