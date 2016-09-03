define([
  'require',
  'angular',
  'app_main'
], function (require, angular, App) {
    'use strict';

    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['app']);
    })
});