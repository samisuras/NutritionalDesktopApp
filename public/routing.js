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
        .when('/exp', {
            templateUrl: './components/clientes/expediente.html',
            controller: 'expedienteCtrl'
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
app.controller('clientesCtrl', function($scope, $http, $location){
   $scope.titulo = "Altas";
   $scope.altas = true;
   $scope.res = false;
   $scope.$location = $location;
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
        estatura: 0
    };
    $scope.Enviar = function (){
        console.log(JSON.stringify($scope.valores));
        $http.post("https://first12354.herokuapp.com/user/add-user",
            $scope.valores
        )
        .then(function (respuesta) {
            console.log(respuesta.data);
            if(respuesta.data.status == 1){
                $scope.res = true;
                $location.path('exp');
            }
            else{
                $scope.res = false;
            }
        })
        .catch(function (error){
            console.log(error.data);
        });

    }
    $scope.abrir = function (){
        $location.path('exp');
    }

});
app.controller('expedienteCtrl', function($scope){
    $scope.m = "Expediente";
    $scope.dolordecabeza = false;
    $scope.actividadfisica = false;
    $scope.Estres = false;
    $scope.Medicamento = false;
    $scope.datos={
        dolorCabeza: [],
        actividadFisica: [],
        estres: [],
        medicamentoDC: [],
    }
    $scope.verificarDolorDeCabeza = function (){
        if($scope.datos.dolorCabeza == 1){
            $scope.dolordecabeza = true;
        }
        else{
            $scope.dolordecabeza = false;
        }
    }
    $scope.verificarActividadFisica = function (){
        if($scope.datos.actividadFisica == 1){
            $scope.actividadfisica = true;
        }
        else{
            $scope.actividadfisica = false;
        }
    }
    $scope.verificarEstres = function (){
        if($scope.datos.estres == 1){
            $scope.Estres = true;
        }
        else{
            $scope.Estres = false;
        }
    }
    $scope.verificarMedicamento = function (){
        if($scope.datos.medicamentoDC == 1){
            $scope.Medicamento = true;
        }
        else{
            $scope.Medicamento = false;
        }
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