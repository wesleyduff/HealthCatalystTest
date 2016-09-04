var APP = APP || {};
define([
  'require',
  'angular',
  'api_constants',
  'serivice_config',


  //angular deps
  'oclazyload',
  'ui.router',
  'ui.bootstrap'



  //application deps
], function (require, angular, API) {
    require('serivice_config');
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
                                './app_modules/people_module/build/module_combined.js',
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