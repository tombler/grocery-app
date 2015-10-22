app.factory("storage", function () {
    var bucket = {};

    return {
        getVariable: function (junk) {
            if (bucket.hasOwnProperty(junk)) {
                return bucket[junk];
            }
        },
        addVariable: function (key, value) {
            bucket[key] = value;
        }
    };
});