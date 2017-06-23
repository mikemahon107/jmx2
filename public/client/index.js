angular.module('main-app', ['ngRoute'])

.config(function ($locationProvider, $routeProvider) {

    $routeProvider
        .when('/user', {
            controller: 'MainCtrl',
            templateUrl: 'public/client/templates/app.html',
            controllerAs: 'ctrl'
            // hideMenus: true
        })

        .when('/', {
            controller: 'AuthPanelCtrl',
            templateUrl: 'public/client/templates/authPanel.html',
            controllerAs: 'ctrl'
        })

        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
});
