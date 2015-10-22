app.controller("TodoCtrl", function($scope, $q) {
    $scope.title = "Mo'fuckin' Groceries";
    $scope.searchText = "";
    $scope.addItemInput = "";


    $scope.addItem = function () {
        $scope.todos.push({"name": $scope.addItemInput, "complete": false});
        $scope.addItemInput = "";
    };

    $scope.killTodo = function(todo) {
      console.log(todo);
      var items = $('li').text().split("FINISH");
      console.log(items);
      for (var i=0; i < items.length; i++) {
        if (todo.name === items[i]) {
            console.log(items[i]);
            $(items[i]).css("text-decoration", "line-through");
        }
      }
    };

    $scope.finishTodo = function(todo) {
        
    };

    function getTodoList() {
        return $q(function (resolve, reject) {
            $.ajax({
                url: "./data/todos.json"
            })
            .done(function (response) {
                resolve(response.todos);
            })
            .fail(function (xhr, status, error) {
                reject(error);
            });

        });
    }

    getTodoList()
        .then(function (resolvedData) {
            $scope.todos = resolvedData;
        }, function (error) {
            console.log(error);
        });
        


});
