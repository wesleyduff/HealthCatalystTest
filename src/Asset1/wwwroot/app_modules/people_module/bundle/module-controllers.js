(function (APP) {

    'use strict';

    APP.PeopleControllers = function () {
        return {
            MainController: [
                '$scope',
                '$peopleFactoryDataService',
                '$log',
                '$filter',
                function ($scope, $peopleFactoryDataService, $log, $filter) {
                    /* -------------------------------------- */
                    /* ---------- RESPONSE Methods ---------- */
                    /* -------------------------------------- */
                    var peopleMethods = {
                        getAllPeople: {
                            success: function (collection) {
                                $scope.people = collection;
                                $scope.man = $filter('filterGender')(collection, "Male");
                                $scope.women = $filter('filterGender')(collection, "Female");;

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
            ]
        }
    }

    return APP.PeopleControllers;
})(APP);