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
      


    // var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/");
    // $scope.authObj = $firebaseAuth(ref);

    // // if (authData)
    // // {
    // //   users.$add({
    // //     name: authData.facebook.displayName,
    // //     profilePic: authData.facebook.profileImageURL,
    // //     lists: []
    // //   })
    // //   //$location.path('/home');
    // // }
    // // else
    // // {
    //   //$scope.authObj.$unauth();



    // $scope.login = function (provider) {
    //   $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
    //       console.log("User:", authData.uid);
    //   })
    //   .catch(function(error) {
    //       console.log(error);
    //       if (error.code === "TRANSPORT_UNAVAILABLE") {
    //         // fall-back to browser redirects, and pick up the session
    //         // automatically when we come back to the origin page
    //         ref.authWithOAuthRedirect("facebook", function(error) { 

    //         });
    //       } 
    //   });

    //   $scope.authObj.$onAuth(function(authData) {
    //     if (authData) {
    //       console.log("Logged in as:", authData.uid);

    //       var users_ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/");
    //       var all_users = $firebaseArray(users_ref);
    //       all_users.$loaded()
    //         .then(function () {
    //           // check if user exists
    //           console.log(all_users);
    //           var userExists = false;

    //           for (var i=0; i < all_users.length; i++) {
    //             if (all_users[i].$id === authData.uid) {
    //               userExists = true;
    //             }
    //           }

    //           if (!userExists) {
    //             var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid);
    //             var user = $firebaseObject(ref);
    //             user.name = authData.facebook.displayName;
    //             user.profilePic = authData.facebook.profileImageURL;
    //             user.$save().then(function () {
    //               console.log("Saved user: ", user);
    //             })
    //           }

    //           storage.addVariable("current_user", authData.uid);
    //           $location.path('/home');

    //         })

    //     } else {
    //       console.log("Logged out");
    //     }
    //   });

    // };
      
}]);



