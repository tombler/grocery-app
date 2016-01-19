app.controller("LoginCtrl", ["$scope", "$firebaseAuth", "$q", "storage", "$window", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseAuth, $q, storage, $window, $firebaseObject, $firebaseArray) {
    
    $scope.login = function (email, password) {
      var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
      ref.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          console.log("uid: ", authData.uid);
          console.log("email: ", authData.password.email);

          var users_ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/");
          var users = $firebaseArray(users_ref);
          console.log(users);
          users.$loaded().then(function () {
            var userExists = false;

              for (var i=0; i < users.length; i++) {
                if (users[i].$id === authData.uid) {
                  userExists = true;
                }
              }
              
              if (!userExists) {
                var new_user_ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid);
                var new_user = $firebaseObject(new_user_ref);
                new_user.email = authData.password.email;
                new_user.lists = [];
                new_user.$save().then(function () {
                    console.log("Saved new user to firebase: ", new_user);
                    storage.addVariable("uid", authData.uid);
                    $window.location = "#/home";
                });      
              } else {
                storage.addVariable("uid", authData.uid);
                $window.location = "#/home";
              }
          });
          
          

        }
      });
    };

    $scope.signup = function () {
        $window.location = '#/signup';
    };
 
      
}]);



