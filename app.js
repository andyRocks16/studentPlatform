angular.module("app", [
    'ui.router'
])


    .config(function ($stateProvider, $urlRouterProvider) {


        $stateProvider


            .state('student', {
                url: '/student',
                component: 'student'
            })
        $urlRouterProvider.otherwise('/student');
    });