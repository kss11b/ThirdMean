var app = angular.module('app', ['ngRoute','ngCookies']);
  app.config(function ($routeProvider){
    $routeProvider
    .when('/dash',{
      templateUrl: '/../partials/dash.html'
    })
    .when('/',{
      templateUrl: '../partials/main.html'
    })
    .when('/high',{
      templateUrl: '../partials/high.html'
    })
    .when('/show/:id',{
      templateUrl: '../partials/poll.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
