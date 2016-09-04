(function (angular) {
    'use strict';

    var module = angular.module('configurables', [])
        //add configurable prodivers
        .provider('$shareManager', function () {
            //setting up the factory
            this.$get = function () {
                return {
                    API: this.API,
                    getAPI: function () { return this.API; }
                }
            }
        });

    return module;
})(angular)