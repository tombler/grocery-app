app.controller("NewListCtrl", ["$scope", "$q", "$firebaseArray", "$location", "storage",

    function($scope, $q, $firebaseArray, $location, storage) {


    var uid = storage.getVariable("uid");
    console.log(uid);



    $scope.item = "";
    $scope.price = "";
    $scope.listTitle = "";

    // Check if factory variable is empty. If not, $scope.thisLIstItems = factory variable
    // On load new List view, if factory variable exists, import it to list
    $scope.importedList = storage.getVariable("importedList");
    // console.log($scope.importedList);

    if ($scope.importedList !== undefined) {
        $scope.thisListItems = $scope.importedList;
    }
    // console.log($scope.thisListItems);

    $('form').hide();

    // var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/lists");

    // $scope.lists = $firebaseArray(ref);
    // console.log($scope.lists);


    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + uid + "/lists/");
    $scope.lists = $firebaseArray(ref);
    console.log($scope.lists);




    $scope.createList = function () {
        var today = new Date();
        console.log(today);
        $scope.lists.$add({
            "dateCreated": Date.today().toString("d"),
            "title": $scope.listTitle,
            "items": []
        }).then(function(ref) {
            var id = ref.key();
            console.log("added item with id " + id);
            $('h2').attr('id', id);
            $('#createTitle').hide();
            $('form').show();

            var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + uid + "/lists/" + $('h2').attr('id') + "/items");
            $scope.thisListItems = $firebaseArray(ref);

            if ($scope.importedList !== undefined) {
                for (var prop in $scope.importedList) {
                    $scope.thisListItems.$add($scope.importedList[prop]);
                }
            }
        }); 
    };

    $scope.addToList = function () {
        if ($scope.price !== "") {
            $scope.price = parseFloat($scope.price).toFixed(2);
        }
        var newItem = {
            name: $scope.item,
            price: $scope.price,
            complete: false
        };
        
        $scope.item = "";
        $scope.price = "";
        
        console.log(newItem);

        var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/users/" + uid + "/lists/" + $('h2').attr('id') + "/items");
        $scope.thisListItems = $firebaseArray(ref);

        if ($scope.importedList !== undefined) {
            for (var i=0; i < $scope.importedList.length; i++) {
                $scope.thisListItems.$add($scope.importedList[i])
                    .then(function(ref) {
                        var id = ref.key();
                        console.log("added item to this list with id " + id);
                    });
            }
        }

        $scope.thisListItems.$add(newItem).then(function(ref) {
            var id = ref.key();
            console.log("added item to this list with id " + id);
        });
        storage.addVariable("importedList", "");
    };

    $scope.viewSavedLists = function () {
        $location.url('/savedlists');
    };

    $scope.removeItem = function (item) {

        $scope.thisListItems.$remove(item)
            .then(function (id) {
                console.log("Item removed successfully.")
            });
        
    };

}]);


