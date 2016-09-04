var APP = APP || {};

define([
  'angular',
  'api_constants',
  'require',

  //angular deps
  'oclazyload',
  'ui.router',
  'ui.bootstrap',
  'Shared/services',



  //application deps
], function (angular, API) {

    var app = angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'oc.lazyLoad',
      'configurables'
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

        /* ----------- SET BASE ROUTE */
        $urlRouterProvider.otherwise('/dashboard');

        $ocLazyLoadProvider.config({
            asyncLoader: require
        });

        $stateProvider

          .state('dashboard',
            {
                url: '/dashboard',
                templateUrl: 'app_modules/people_module/template.html',
                controller: 'MainController',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie : true,
                            files: [
                                  './app_modules/people_module/main.js',
                                './app_modules/people_module/template.html'
                            ]
                        });
                    }]
                }
              }
          );
    }]);

    return app;
});