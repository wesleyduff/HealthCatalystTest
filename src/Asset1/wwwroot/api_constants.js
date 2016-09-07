define(function () {
    'use strict';

    var BASE = "/api"; //TODO Set Base
    var RAOMEME = "http://api.randomuser.me"
    var API = {
            uri : {
                people: function () {
                    return BASE + "/people"
                },
                random: {
                    pictures: function (results) {
                        if (!results) {
                            results = 5;
                        }
                        return RAOMEME + '/?inc=picture&results=' + results;
                    }
                }
            }
    };

    return API;

});