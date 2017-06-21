angular.module('main-app', ['ngRoute'])

.config(function ($locationProvider, $routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'AuthPanelCtrl',
            templateUrl: 'public/client/templates/authPanel.html',
            // hideMenus: true
        })
 
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'public/client/templates/app.html'
        })
 
        .otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);
});