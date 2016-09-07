var APP = APP || {};
define([
  //external deps for application
  'require',
  'angular',

  //API endpoints
  'api_constants',

   //GO GO GADGET UTILITIES
  'go_go_gadget',

  //get access to our services to share the goods
  'serivice_config',

  //angular deps
  'oclazyload',
  'ui.router',
  'ui.bootstrap',

  //application deps
  'angularSpinners'
], function (require, angular, API, GO_GO_GADGET) {
    require('serivice_config');
    var app = angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'oc.lazyLoad',
      'configurables',
      'angularSpinners'
    ]);


    //COFIG
    app.config([
      '$urlRouterProvider',
      '$httpProvider',
      '$ocLazyLoadProvider',
      '$stateProvider',
      '$shareManagerProvider'
    , function ($urlRouterProvider, $httpProvider, $ocLazyLoadProvider, $stateProvider, $shareManagerProvider) {

        //set API Config
        $shareManagerProvider.API = API;

        //set Go_GO_GADGET UTILITES
        $shareManagerProvider.Go_GO_GADGET = GO_GO_GADGET;

        /* ----------- SET BASE ROUTE */
        $urlRouterProvider.otherwise('/dashboard');

        //config OC LazyLoad for requireJS
        $ocLazyLoadProvider.config({
            asyncLoader: require
        });

        $stateProvider
            /* --- Main View : 
             * - Dashboard
             * ---------------------
             * --     LAZY LOADS
             * -- | main.js, module_combined.js, template.html, add_person_template.html
             */
          .state('dashboard',
            {
                url: '/dashboard',
                templateUrl: 'app_modules/people_module/template.html',
                controller: 'MainController',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                 './app_modules/people_module/main.js',
                                './app_modules/people_module/build/module_combined.js',
                                './app_modules/people_module/template.html'
                            ]
                        });
                    }]
                }
            })
            .state('addPeople',
                {
                    url: '/addPerson',
                    templateUrl: 'app_modules/people_module/add_person_template.html',
                    controller: 'PostController',
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                     './app_modules/people_module/main.js',
                                    './app_modules/people_module/build/module_combined.js',
                                    './app_modules/people_module/add_person_template.html'
                                ]
                            });
                        }]
                    }
                }
            )
    }])

    /* ------------------------------------------
     * ------------ ROOT CONTROLLER -------------
     *  - Here you want to listen for $emit(ers) with $on
     *  - and $broadcast events to sub controllers
     * ------------------------------------------
     * ------------------------------------------
     */
    .controller('RootController', ['$scope', function ($scope) {

        //Pre Set Loader
        $scope.showLoader = true;

        /* -----------------------------
         *  ------- Listeners ----------
         * - $on 
         */
        $scope.$on('toggleLoader', function (event, _switch_) {
            //use this $scope object to show or hide the modal-backdrop class
            _switch_ === 'on' ? $scope.showLoader = true : $scope.showLoader = false;
        });

        /* -----------------------------
         *  ------- Listeners ----------
         * - $on 
         */
    }])

    // Adding loading directive
    .directive('loader', function (spinnerService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                name: '@?',
                group: '@?',
                show: '=',
                imgSrc: '@?',
                register: '@?',
                onLoaded: '&?',
                onShow: '&?',
                onHide: '&?'
            },
            template: [
                ' <div ng-show="show" class="spinner">',
                '   <div class="bounce1">',
                '   </div>',
                '   <div class="bounce2"></div>',
                '   <div class="bounce3"></div>',
                ' </div>',
                '</div>'

            ].join(''),
            controller: function ($scope, spinnerService) {

                // register should be true by default if not specified.
                if (!$scope.hasOwnProperty('register')) {
                    $scope.register = true;
                } else {
                    $scope.register = !!$scope.register;
                }

                // Declare a mini-API to hand off to our service so the 
                // service doesn't have a direct reference to this
                // directive's scope.
                var api = {
                    name: $scope.name,
                    group: $scope.group,
                    show: function () {
                        $scope.show = true;
                    },
                    hide: function () {
                        $scope.show = false;
                    },
                    toggle: function () {
                        $scope.show = !$scope.show;
                    }
                };

                // Register this spinner with the spinner service.
                if ($scope.register === true) {
                    spinnerService._register(api);
                }

                // If an onShow or onHide expression was provided,
                // register a watcher that will fire the relevant
                // expression when show's value changes.
                if ($scope.onShow || $scope.onHide) {
                    $scope.$watch('show', function (show) {
                        if (show && $scope.onShow) {
                            $scope.onShow({
                                spinnerService: spinnerService,
                                spinnerApi: api
                            });
                        } else if (!show && $scope.onHide) {
                            $scope.onHide({
                                spinnerService: spinnerService,
                                spinnerApi: api
                            });
                        }
                    });
                }

                // This spinner is good to go.
                // Fire the onLoaded expression if provided.
                if ($scope.onLoaded) {
                    $scope.onLoaded({
                        spinnerService: spinnerService,
                        spinnerApi: api
                    });
                }
            }
        };
    });

    return app;
});