'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'myApp.version', 'myappController', 'ui.bootstrap', 'ui-notification'])
    .config(['$locationProvider', '$routeProvider', 'NotificationProvider', function ($locationProvider, $routeProvider, NotificationProvider) {
        $locationProvider.hashPrefix('!');
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
        $routeProvider.when('/home', {
            title: 'home',
            templateUrl: 'templates/home.html'
        })
        $routeProvider.when('/signin', {
            title: 'home',
            templateUrl: 'templates/signin.html'
        })
        $routeProvider.when('/register', {
            title: 'home',
            templateUrl: 'templates/register.html'
        })
        $routeProvider.otherwise({redirectTo: '/signin'});
    }]);
