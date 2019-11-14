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
            templateUrl: './components/clientes/clientes.html',
            controller: 'clientesCtrl'
        })
        .when('/emp', {
            templateUrl: './components/empleados/empleados.html',
            controller: 'empleadosCtrl'
        })
        .when('/con', {
            templateUrl: 'components/consultas/consultas.html',
            controller: 'consultasCtrl'
        })
        .when('/cit', {
            templateUrl: './components/citas/citas.html',
            controller: 'citasCtrl'
        })
        .when('/mas', {
            templateUrl: './components/masajes/masajes.html',
            controller: 'masajesCtrl'
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
app.controller('clientesCtrl', function($scope){
   $scope.titulo = "Altas";
   $scope.altas = true;
   $scope.elegirOpcion = function (opc){
        if(opc == 'alta'){
            $scope.altas = true;
            $scope.bajas = false;
            $scope.cambios = false;
            $scope.titulo = "Altas";
        }
        else if(opc == 'baja'){
            $scope.altas = false;
            $scope.bajas = true;
            $scope.cambios = false;
            $scope.titulo = "Bajas";
        }
        else{
            $scope.titulo = "Cambios";
            $scope.altas = false;
            $scope.bajas = false;
            $scope.cambios = true;
        }
   }
   $scope.opcion = {
    name: 'alta'
    };

    $scope.valores = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        cp: '',
        numero: 0,
        calle: '',
        sangre: '',
        estatura: 0,
        enTratamiento: 0
    };
    $scope.Enviar = function (){
        console.log(JSON.stringify($scope.valores));
    }

});
app.controller('empleadosCtrl', function($scope){
    $scope.m = "Empleados";
 });
 app.controller('consultasCtrl',  function($scope){
    $scope.m = "Consultas";
});
app.controller('citasCtrl', function($scope){
   $scope.m = "Citas";
});
app.controller('masajesCtrl', function($scope){
    $scope.m = "Masajes";
 });