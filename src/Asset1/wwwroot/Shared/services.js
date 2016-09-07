define('serivice_config',
    [
        'angular'
    ],
    function (angular) {
    'use strict';

    var module = angular.module('configurables', [])
        //add configurable prodivers
        .provider('$shareManager', function () {
            //setting up the factory
            this.$get = function () {
                return {

                    /* -----------------------
                     * --   API endpoints ----
                     * - get; set;
                     */
                    API: this.API,
                    getAPI: function () { return this.API; },

                    /* --------------------------------
                     * --   Go Go Gadget Utilities ----
                     * - get; set;
                     */
                    Go_GO_GADGET: this.Go_GO_GADGET,
                    get_GO_GO_GADGET: function () { return this.Go_GO_GADGET; }


                }
            }
        });

    return module;
});