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
        .when('/verEmp', {
            templateUrl: './components/empleados/verEmpleados.html',
            controller: 'verEmpCtrl'
        })
        .when('/detallesCTE/:idcte', {
            templateUrl: './components/clientes/detallesCte.html',
            controller: 'detallesCteCtrl'
        })
        .when('/detallesEMP/:idemp', {
            templateUrl: './components/empleados/detallesEmp.html',
            controller: 'detallesEmpCtrl'
        })
        .otherwise({
            templateUrl: 'components/inicio/inicio.html',
            controller: 'indexController'
        });

});
app.controller('indexController', function ($scope) {
    $scope.nombreUsuario = sessionStorage.getItem('nombreUsuario');
});
app.controller('inicioCtrl', function ($scope) {
});
app.controller('verEmpCtrl', function ($scope, $http, $location) {
    $scope.m = "Ver Empleados";

    $http.get("https://first12354.herokuapp.com/empleado/getEmpleados", {

    })
        .then(function (respuesta) {
            $scope.users = respuesta.data.status;
            console.log(respuesta.data.status);

        })
        .catch(function (error) {
            console.log(error.data);
        });
    $scope.Detalles = function (data) {
        //console.log(data.x);
        $location.url('/detallesEMP/' + data.x.idEmpleado);
    }
    $scope.return = function () {
        $location.path('emp');
    }
});
app.controller('verCteCtrl', function ($scope, $http, $location) {
    $scope.titulo = "Ver Clientes";

    $http.get("https://first12354.herokuapp.com/user/clientes", {

    })
        .then(function (respuesta) {
            $scope.users = respuesta.data.usuarios;

        });

    $scope.Detalles = function (data) {
        //console.log(data.x);
        $location.url('/detallesCTE/' + data.x.idCliente);
    }

    $scope.return = function () {
        $location.path('cte');
    }
});
app.controller('clientesCtrl', function ($scope, $http, $location) {
    $scope.titulo = "Altas";
    $scope.altas = true;
    $scope.res = false;
    $scope.$location = $location;
    $scope.elegirOpcion = function (opc) {
        if (opc == 'alta') {
            $scope.altas = true;
        }
        else if (opc == 'verCte') {
            $scope.altas = false;
            $location.path('verCte');
        }
        else {

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
    $scope.Enviar = function () {
        console.log(JSON.stringify($scope.valores));
        $http.post("https://first12354.herokuapp.com/user/add-user",
            $scope.valores
        )
            .then(function (respuesta) {
                console.log(respuesta.data);
                if (respuesta.data.status == 1) {
                    $scope.res = true;
                    $location.path('exp');
                }
                else {
                    $scope.res = false;
                }
            })
            .catch(function (error) {
                console.log(error.data);
            });

    }

});
app.controller('expedienteCtrl', function ($scope, $http, $location) {
    $scope.m = "Expediente";
    $scope.res = false;
    $scope.dolordecabeza = false;
    $scope.actividadfisica = false;
    $scope.Estres = false;
    $scope.Medicamento = false;
    $scope.datos = {
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
    $scope.EnviarExp = function () {
        console.log(JSON.stringify($scope.datos));
        $http.post("https://first12354.herokuapp.com/user/add-expediente",
            $scope.datos
        )
            .then(function (respuesta) {
                console.log(respuesta.data);
                if (respuesta.data.status == 1) {
                    $scope.res = true;
                    $location.path('cte');
                }
                else {
                    $scope.res = false;
                }
            })
            .catch(function (error) {
                console.log(error.data);
            });

    }
    $scope.verificarDolorDeCabeza = function () {
        if ($scope.datos.dolorCabeza == 1) {
            $scope.dolordecabeza = true;
        }
        else {
            $scope.dolordecabeza = false;
        }
    }
    $scope.verificarActividadFisica = function () {
        if ($scope.datos.actividadFisica == 1) {
            $scope.actividadfisica = true;
        }
        else {
            $scope.actividadfisica = false;
        }
    }
    $scope.verificarEstres = function () {
        if ($scope.datos.estres == 1) {
            $scope.Estres = true;
        }
        else {
            $scope.Estres = false;
        }
    }
    $scope.verificarMedicamento = function () {
        if ($scope.datos.medicamentoDC == 1) {
            $scope.Medicamento = true;
        }
        else {
            $scope.Medicamento = false;
        }
    }
});
app.controller('empleadosCtrl', function ($scope, $http, $location) {
    $scope.m = "Alta de Empleado";
    $scope.altas = true;
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
        nss: 0,
        puesto: "",
        noCedula: "",
        area: "",
        descripcion: "",
        horarioInicio: "",
        horarioTermino: ""
    };
    $scope.Enviar = function () {

        let tiempoI = document.getElementById('horarioInicio');
        let tiempoF = document.getElementById('horarioTermino');

        $scope.valores.horarioInicio = tiempoI.value;
        $scope.valores.horarioTermino = tiempoF.value;

        console.log(JSON.stringify($scope.valores));
        $http.post("https://first12354.herokuapp.com/empleado/add-empleado",
            $scope.valores
        )
            .then(function (respuesta) {
                console.log(respuesta.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
        $location.path('verEmp');

    }

    $scope.elegirOpcion = function (opc) {
        if (opc == 'alta') {
            $scope.altas = true;
        }
        else if (opc == 'verEmp') {
            $scope.altas = false;
            $location.path('verEmp');
        }
        else {

        }
    }
});
app.controller('detallesCteCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Informacion de Cliente";
    $scope.cte = $routeParams.idcte;
    var ruta = "https://first12354.herokuapp.com/user/cliente/" + $scope.cte;

    $http.get(ruta, {
    })
        .then(function (respuesta) {
            $scope.Cliente = respuesta.data.usuario[0];
            console.log($scope.Cliente);
        });

    $scope.return = function () {
        $location.path('verCte');
    }
});
app.controller('detallesEmpCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Informacion de Empleado";
    $scope.emp = $routeParams.idemp;

    var ruta = "https://first12354.herokuapp.com/empleado/" + $scope.emp;

    $http.get(ruta, {
    })
        .then(function (respuesta) {
            $scope.Empleado = respuesta.data.empleado[0];
            console.log($scope.Empleado);
        });

    $scope.return = function () {
        $location.path('verEmp');
    }
});
app.controller('citasCtrl', function ($scope, $http, $location) {
    $scope.m = "Citas Nutricionales";
    $scope.index = -1;
    $scope.msjError = false;
    $scope.msjError2 = false;
    $scope.msj = false;
    $scope.tablaConsultas = false;
    var nombreCte = ""
    $http.get("https://first12354.herokuapp.com/user/clientes", {

    })
    .then(function (respuesta) {
        $scope.clientes = respuesta.data.usuarios;
    });

    $http.get("https://first12354.herokuapp.com/empleado/getEmpleados", {

    })
    .then(function (respuesta) {
        $scope.empleados = respuesta.data.status;

    });


    $scope.horarios=[
        {hor:"9:00 - 10:00",status:"Libre",color:"success",btn:false,cte: "", emp: "", nota:""},
        {hor:"10:00 - 11:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""},
        {hor:"11:00 - 12:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""},
        {hor:"12:00 - 13:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""},
        {hor:"13:00 - 14:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""},
        {hor:"14:00 - 15:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""},
        {hor:"15:00 - 16:00",status:"Libre",color:"success",btn:false,cte: "", emp: "",nota:""}
    ]; 

    $scope.datosConsulta = {
        hora: "",
        fecha: "",
        notas: "",
        idCliente: "",
        idEmpleado:"",
        fechaFormato:""
    }

    $scope.Enviar = function (data){
        if(data.search1 != null && data.search2 != null){
            
            var CTEstr = data.search1;
            var CTEres = CTEstr.split('|');
            var EMPstr = data.search2;
            var EMPres = EMPstr.split('|');
            $scope.datosConsulta.hora = data.horario.hor;
            $scope.datosConsulta.idCliente = CTEres[0];
            $scope.datosConsulta.idEmpleado = EMPres[0];
            $scope.datosConsulta.notas = data.nota;
            $scope.msjError = false;
            var formatDate = ($scope.datosConsulta.fecha.getFullYear()+"-"+($scope.datosConsulta.fecha.getMonth()+1)+"-"+$scope.datosConsulta.fecha.getDate()).toString();
            $scope.datosConsulta.fechaFormato = formatDate;
            //console.log($scope.datosConsulta);
            $http.post("https://first12354.herokuapp.com/citas/addCita",
                $scope.datosConsulta
            )
            .then(function (respuesta) {
                console.log(respuesta.data);
                if(respuesta.data.status == 1){
                    $scope.ReiniciarDatos();
                }
            })
            .catch(function (error) {
                console.log(error.data);
            });
        }
        else{
            $scope.msjError = true;
        }

    }
    
    $scope.verificarFecha = function (){
        //Checar elejibilidad de fecha

        $scope.msj = false;
        if($scope.datosConsulta.fecha != ""){
            //Checar fechas mayores no puede ser menor
            if($scope.datosConsulta.fecha.getTime() >= (new Date().getTime() - 51840000)){
                $scope.msjError2 = false;
                $scope.filtrarFechas($scope.datosConsulta.fecha);
                $scope.tablaConsultas = true;
            }else{
                $scope.msjError2 = true;
                $scope.tablaConsultas = false;
            }
        }
        else{
            $scope.msjError2 = true;
            $scope.tablaConsultas = false;
        }
        
    }

    $scope.filtrarFechas = function (formatDate){
        var mesAux = "";
        var diaAux = "";
        var fecha = "";
        if(formatDate.getMonth()+1 < 10){
            mesAux = "0"+(formatDate.getMonth()+1).toString();
            fecha = (formatDate.getFullYear()+"-"+(mesAux)+"-"+formatDate.getDate()).toString();
        }
        else if(formatDate.getDate() < 10){
            diaAux = "0"+(formatDate.getDate()).toString();
            fecha = (formatDate.getFullYear()+"-"+(formatDate.getMonth()+1)+"-"+diaAux).toString();
        }
        else{
            fecha = (formatDate.getFullYear()+"-"+(formatDate.getMonth()+1)+"-"+formatDate.getDate()).toString();

        }
        var ruta = "https://first12354.herokuapp.com/citas/citasOcupadas/"+fecha;
        console.log(ruta);
        $http.get(ruta, {

        })
        .then(function (respuesta) {
            $scope.fechasOcupadas = respuesta.data.fechas;
            console.log(respuesta.data);
            if(respuesta.data.fechas.length == 0){
                console.log("No hay coincidencias BD");
                for(var j=0; j<$scope.horarios.length;j++){
                    $scope.horarios[j].status = "Libre";
                    $scope.horarios[j].color = "success";
                    $scope.horarios[j].btn = false; 
                    $scope.horarios[j].cte = ""
                    $scope.horarios[j].emp = ""
                    $scope.horarios[j].nota = ""
                }
                
            }
            else{
                
                for(var i=0; i<$scope.fechasOcupadas.length;i++){
                    for(var j=0; j<$scope.horarios.length;j++){
                        if($scope.fechasOcupadas[i].hora == $scope.horarios[j].hor){

                            $scope.horarios[j].status = "Ocupado";
                            $scope.horarios[j].color = "danger";
                            $scope.horarios[j].btn = true;
                            $scope.horarios[j].cte = $scope.fechasOcupadas[i].nombreCliente;
                            $scope.horarios[j].emp = $scope.fechasOcupadas[i].nombreEmpleado;
                            $scope.horarios[j].nota = $scope.fechasOcupadas[i].notas;

                        }
                    }
                }
                //console.log($scope.horarios)

            }

        });
    
    }
    
    $scope.ReiniciarDatos =  function (){
        document.getElementById('clean').value = "";
        document.getElementById('clean2').value = "";
        document.getElementById('clean3').value = "";
        $scope.datosConsulta.fecha = "";
        $scope.tablaConsultas = false;
        $scope.msj = true;

    }

 
});
app.controller('consultasCtrl', function ($scope) {
    $scope.m = "Consultas";
});
app.controller('masajesCtrl', function ($scope) {
    $scope.m = "Masajes";
});