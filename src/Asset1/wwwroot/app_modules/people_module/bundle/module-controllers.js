(function (angular, APP_GLOBALS) {
    'use strict';

    APP_GLOBALS.Controllers = {
        MainController: function ($scope, $peopleFactoryDataService, $log) {
            /* -------------------------------------- */
            /* ---------- RESPONSE Methods ---------- */
            /* -------------------------------------- */
            var peopleMethods = {
                getAllPeople: {
                    success: function (collection) {
                        $scope.people = collection;
                    },
                    notification: function (notification) {
                        $log.debug(notification);
                    },
                    complete: function (complete) {
                        $log.debug(complete);
                    }
                },
                errorCallBack: function () {
                    $log.debug('xxx---xxx-- Error while calling getAllPeople');
                }
            }



            /* -------------------------------------- */
            /* ---------- MAIN init data ------------ */
            /* -------------------------------------- */
            $peopleFactoryDataService.getAllPeople()
            .then(peopleMethods.getAllPeople.success, null, peopleMethods.getAllPeople.notification('Notify of : getAllPeople'))
            .catch(peopleMethods.errorCallBack)
            .finally(peopleMethods.getAllPeople.complete('Complete'));

            




        }
    };

})(angular, APP_GLOBALS);