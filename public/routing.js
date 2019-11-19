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
        .when('/verCte', {
            templateUrl: './components/clientes/verClientes.html',
            controller: 'verCteCtrl'
        })
        .when('/detallesCTE/:idcte', {
            templateUrl: './components/clientes/detallesCte.html',
            controller: 'detallesCteCtrl'
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
app.controller('verCteCtrl',  function($scope, $http, $location){
    $scope.titulo = "Ver Clientes";
    
    $http.get("https://first12354.herokuapp.com/user/clientes", {

    })
    .then(function (respuesta) {
        $scope.users = respuesta.data.usuarios;
       
    });

    $scope.Detalles = function (data){
        //console.log(data.x);
        $location.url('/detallesCTE/' + data.x.idCliente);
    }

    $scope.return = function (){
        $location.path('cte');
    }
});
app.controller('clientesCtrl', function($scope, $http, $location){
   $scope.titulo = "Altas";
   $scope.altas = true;
   $scope.res = false;
   $scope.$location = $location;
   $scope.elegirOpcion = function (opc){
        if(opc == 'alta'){
            $scope.altas = true;
        }
        else if (opc == 'verCte') {
            $scope.true = false;
            $location.path('verCte');
        }
        else{

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

});
app.controller('expedienteCtrl', function($scope, $http, $location){
    $scope.m = "Expediente";
    $scope.res = false;
    $scope.dolordecabeza = false;
    $scope.actividadfisica = false;
    $scope.Estres = false;
    $scope.Medicamento = false;
    $scope.datos={
        dolorCabeza: 0,
        actividadFisica: 0,
        estres: 0,
        medicamentoDC: 0,
        nombreMedicamentoDC: "",
        finMedicamentoDC: "",
        anticonceptivo: "",
        sobrepeso: 0,
        diabetes: 0,
        cancer: 0,
        hipertension: 0,
        cardiovascular: 0,
        tipoAF: "",
        frecuenciaAF: "",
        tiempoAF: '',
        adiccion: '',
        comida: 0,
        formaAlimentacion: "",
        edadSobrepeso: 0,
        eventoRelacionado: "",
        motivoReduccion: "",
        familia: 0,
        pesoDeseado: 0


    }
    $scope.EnviarExp = function (){
        console.log(JSON.stringify($scope.datos));
        $http.post("https://first12354.herokuapp.com/user/add-expediente",
            $scope.datos
        )
        .then(function (respuesta) {
            console.log(respuesta.data);
            if(respuesta.data.status == 1){
                $scope.res = true;
                $location.path('cte');
            }
            else{
                $scope.res = false;
            }
        })
        .catch(function (error){
            console.log(error.data);
        });

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
    $scope.m = "Alta de Empleado";
 });
 app.controller('detallesCteCtrl', function($scope, $http, $location, $routeParams){
    $scope.m = "Informacion de Cliente";
    $scope.cte = $routeParams.idcte;
    var ruta = "https://first12354.herokuapp.com/user/cliente/"+$scope.cte;

    $http.get(ruta, {
    })
    .then(function (respuesta) {
        $scope.Cliente = respuesta.data.usuario[0];
        console.log($scope.Cliente);
    });

    $scope.return = function (){
        $location.path('verCte');
    }
8
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