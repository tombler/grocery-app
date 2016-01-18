app.controller("SignUpCtrl", ["$scope", "$firebaseAuth", "$q", "storage", "$location", "$firebaseObject", "$firebaseArray", "$window",
  function($scope, $firebaseAuth, $q, storage, $location, $firebaseObject, $firebaseArray, $window) {

    

    $scope.signup = function () {
      
      var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
      ref.createUser({
        email    : $scope.username,
        password : $scope.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          
        } else {
          
          console.log("Successfully created user account with uid:", userData.uid);
          $window.location = "/";
        }
      });

    };
    
      
}]);



