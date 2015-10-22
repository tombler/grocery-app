app.filter('sort', function() {

    return function (input, scope) {
        if (input !== null) {
            return input.split("").sort().join("");
        }
    };


});