define(function () {
    'use strict';

    var BASE = "http://localhost:51277/api"; //TODO Set Base
    var API = {
            uri : {
                people: function () {
                    return BASE + "/people"
                }
            }
    };

    return API;

});