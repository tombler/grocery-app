var app = angular.module("GroceriesApp", ['ngRoute', 'firebase']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: './app/partials/landing.html',
            controller: 'LandingCtrl'
          })
          .when('/newlist', {
            templateUrl: './app/partials/new-list.html',
            controller: 'NewListCtrl'
          })
                .when('/savedlists', {
                templateUrl: './app/partials/saved-lists.html',
                controller: 'SavedListsCtrl'
                })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);