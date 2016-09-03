define([
  'angular',
  'api_constants',
  'require',

  //angular deps
  'oclazyload',
  'ui.router',
  'ui.bootstrap',

  //application deps
], function (angular, API) {

    var app = angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'oc.lazyLoad'
    ]);


    //COFIG
    app.config([
      '$urlRouterProvider',
      '$httpProvider',
      '$ocLazyLoadProvider',
      '$stateProvider'
    , function ($urlRouterProvider, $httpProvider, $ocLazyLoadProvider, $stateProvider) {


        /* ----------- SET BASE ROUTE */
        $urlRouterProvider.otherwise('/test');

        $ocLazyLoadProvider.config({
            asyncLoader: require
        });

        $stateProvider

          .state('test',
            {
                url: '/test',
                templateUrl: 'app_modules/test_module/template.html',
                controller: 'MainController',
                resolve: {
                    loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: [
                            './app_modules/test_module/main.js',
                            './app_modules/test_module/template.html'
                            ]
                        });
                    }]
                }
              }
          );
    }]);

    return app;
});