app.controller("SignUpCtrl", ["$scope", "$firebaseAuth", "$q", "storage", "$window", "$firebaseObject", "$firebaseArray", "$window",
  function($scope, $firebaseAuth, $q, storage, $window, $firebaseObject, $firebaseArray, $window) {
    
    $scope.errors = { email: false, password: false }

    

    $scope.signup = function () {
      try {
        var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
        ref.createUser({
          email    : $scope.username,
          password : $scope.password
        }, function(err, userData) {
          if (err) {
            $scope.errors.email=true;  
            $scope.$digest();
            // if ( err.toString().match("email") ) {
            //   console.log("email: ", err);
            // }
            
          } else {
            
            console.log("Successfully created user account with uid:", userData.uid);
            $window.location = "/";
          }
        });
      } catch (err) {
        if ( err.toString().match("password") ) {
          console.log("password", err);
          $scope.errors.password=true;
          
        }
      }
      

    };

    $scope.goToLogin = function () {
      $window.location = "#/"
    };
    
      
}]);



