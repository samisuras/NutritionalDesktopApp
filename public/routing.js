var app = angular.module('app', ['ngRoute']);
const pool = require('./db/conexion');
app.config(function ($routeProvider) {
    // configure the routes
    $routeProvider
        .when('/', {
            templateUrl: 'components/inicio/inicio.html',
            controller: 'inicioCtrl'
        })
        .when('/inventario', {
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
    $scope.agregarProd = function(){
        $scope.agregar = true;
        $scope.cambiar = false;
    };
    $scope.cambiarProd = function(){
        let query = "SELECT nombre FROM medicamento";
        pool.query(query)
        .then(function(res,field){
            $scope.medicamentos = res;
            $scope.agregar = false;
            $scope.cambiar = true;
        }); 
    };
    $scope.agregarExistencias = function(){
        let query="SELECT existencia FROM medicamento WHERE nombre = '"+$scope.nombreMedicAct+"'";
        pool.query(query)
        .then(function(res,fields){
            let existenciaActual = res[0].existencia;
            existenciaActualizada = $scope.cantidadAgregar + existenciaActual;
            query = "UPDATE medicamento SET existencia = "+existenciaActualizada+" WHERE nombre = '"+$scope.nombreMedicAct+"'";
            pool.query(query);
            alert('Existencias actualizadas exitosamente');
        });
    }
    $scope.actualizarExistenciaActual = function(){
        let query="SELECT existencia FROM medicamento WHERE nombre = '"+$scope.nombreMedicAct+"'";
        pool.query(query)
        .then(function(res,fields){
            $scope.cantidadActual = res[0].existencia
        });
    }
});