'use strict';

module.exports.isNotEmpty = function(val){
    return !(val === '' || val === undefined || val == null);

};

module.exports.isEmpty = function(val){
    return !!(val === '' || val === undefined || val == null);
};

module.exports.isEmptyObject = function(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};