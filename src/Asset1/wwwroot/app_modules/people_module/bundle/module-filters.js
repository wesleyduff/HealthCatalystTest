(function (angular, APP_GLOBALS) {
    'use strict';

    APP_GLOBALS.Filters = {
        filterGender: function(){
            return function(items, gender){
                var filtered = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if(item.gender === gender){
                        filtered.push(item);
                    }
                }

                return filtered;
            }
        },
        startsWithLetter: function () {
            return function (items, letter) {
                if (!letter) {
                    return items;
                }
                var filtered = [];
                var letterMatch = new RegExp(letter, 'i');
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (letterMatch.test(item.firstName) || letterMatch.test(item.lastName) || letterMatch.test(item.fullName)) {
                        filtered.push(item);
                    }
                }
                return filtered;
            };
        }
    };

})(angular, APP_GLOBALS);