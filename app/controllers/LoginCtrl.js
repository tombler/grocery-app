app.controller("LoginCtrl", ["$scope", "$firebaseAuth", "$q", "storage", "$location", "$firebaseObject",
  function($scope, $firebaseAuth, $q, storage, $location, $firebaseObject) {

    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/");
    $scope.authObj = $firebaseAuth(ref);

    // if (authData)
    // {
    //   users.$add({
    //     name: authData.facebook.displayName,
    //     profilePic: authData.facebook.profileImageURL,
    //     lists: []
    //   })
    //   //$location.path('/home');
    // }
    // else
    // {
      //$scope.authObj.$unauth();
    $scope.login = function (provider) {
      $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
          console.log("User:", authData.uid);
      })
      .catch(function(error) {
          console.log(error);
          if (error.code === "TRANSPORT_UNAVAILABLE") {
            // fall-back to browser redirects, and pick up the session
            // automatically when we come back to the origin page
            ref.authWithOAuthRedirect("facebook", function(error) { 

            });
          } 
      });

      $scope.authObj.$onAuth(function(authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
          var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid);
          var user = $firebaseObject(ref);
          user.name = authData.facebook.displayName;
          user.profilePic = authData.facebook.profileImageURL;
          user.$save().then(function () {
            console.log("Saved user: ", user);
          })
          $location.path('/home');
        } else {
          console.log("Logged out");
        }
      });

    };
      
}]);



