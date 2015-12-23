app.factory("storage", function () {
    var bucket = {};

    return {
        getVariable: function (prop) {
            if (bucket.hasOwnProperty(prop)) {
                return bucket[prop];
            }
        },
        addVariable: function (key, value) {
            bucket[key] = value;
        }
    };
});