var app = angular.module('app', ['ngRoute']);
const pool = require('./db/conexion');
app.config(function ($routeProvider) {
    // configure the routes
    $routeProvider
        .when('/', {
            templateUrl: 'components/inicio/inicio.html',
            controller: 'inicioCtrl'
        })
        .when('/cte', {
            templateUrl: './components/inventario/inventario.html',
            controller: 'inventarioCtrl'
        })
        .otherwise({
            templateUrl: 'components/inicio/inicio.html',
            controller: 'indexController'
        });

});
app.controller('indexController', function ($scope) {
   $scope.nombreUsuario = sessionStorage.getItem('nombreUsuario');
}); 
//Separar los controllers
app.controller('inicioCtrl',  function($scope){

});
app.controller('inventarioCtrl', function($scope){
   $scope.m = "jola";
});