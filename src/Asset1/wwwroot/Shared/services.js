define(['angular'], function (angular) {
    'use strict';

    angular.module('configurables', [])
    //add configurable prodivers
    .provider('$shareManager', function () {
        //setting up the factory
        this.$get = function () {
            return {
                API: this.API,
                getAPI: function () { return this.API; }
            }
        }
    })
});