app.controller("SavedListsCtrl", ["$scope", "$q", "$firebaseArray", "$location", "storage", "$firebaseObject",

    function($scope, $q, $firebaseArray, $location, storage, $firebaseObject) {

    $scope.title = "Mo'fuckin' Groceries";
    $scope.item = "";
    $scope.price = "";
    $scope.listTitle = "";

    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/lists");

    $scope.lists = $firebaseArray(ref);
    console.log($scope.lists);

    $scope.importList = function (listItems) {
        console.log(listItems);

        // Save listITems to variable in factory
        storage.addVariable("importedList", listItems);

        // Route to New List view
        $location.url('/newlist');

    };

    $scope.removeItem = function (listTitle, item) {
        console.log("worked");
        var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/lists");
        var lists = $firebaseArray(ref);
        
        lists.$loaded()
            .then(function () {
                for (var i=0; i < lists.length; i++) {
                    if (lists[i].title === listTitle) {
                        // console.log(listTitle);
                        console.log(item);
                        // console.log(lists[i].$id);
                        var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/lists/" + lists[i].$id + "/items/");
                        var itemsToRemove = $firebaseArray(ref);
                        itemsToRemove.$loaded()
                            .then(function (data) {
                                console.log(data);
                                for (var key in data) {
                                    if (item.name === data[key].name) {
                                        console.log(data[key].$id);
                                        itemsToRemove.$remove(data[key]).then(function(ref) {
                                            console.log(ref.$id);
                                        });
                                    }
                                }
                                
                            });

                    }
                }
            });
        
    };

    $scope.deleteList = function (list) {
        console.log(list);
        $scope.lists.$remove(list)
            .then(function (id) {
                console.log("List removed successfully.")
            });
    };


}]);


