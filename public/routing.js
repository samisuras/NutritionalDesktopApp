//35.238.215.74
var app = angular.module('app', ['ngRoute']);

const pool = require('./db/conexion');
const open = require('open');

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
        .when('/citasEmpleado/:idemp',{
            templateUrl: './components/citas/citasEmpleado.html',
            controller: 'citasEmpleadoCtrl'
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
        .when('/detallesCONSULTA/:idcte', {
            templateUrl: './components/consultas/detalleConsultas.html',
            controller: 'detallesConCtrl'
        })
        .when('/detallesEMP/:idemp', {
            templateUrl: './components/empleados/detallesEmp.html',
            controller: 'detallesEmpCtrl'
        })
        .when('/verConsulta', {
            templateUrl: './components/consultas/verConsulta.html',
            controller: 'verConsultaCtrl'
        })
        .when('/tipoMasaje/:date', {
            templateUrl: './components/masajes/tipoMasaje.html',
            controller: 'tipoMasajeCtrl'
        })
        .when('/rep', {
            templateUrl: './components/reportes/reporte.html',
            controller: 'reporteCtrl'
        })
        .when('/ventas', {
            templateUrl: './components/ventas/ventas.html',
            controller: 'ventasCtrl'
        })
        .when('/altas', {
            templateUrl: './components/inventario/altas.html',
            controller: 'altasCtrl'
        })
        .when('/verproductos', {
            templateUrl: './components/inventario/verProductos.html',
            controller: 'verproductosCtrl'
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

    $http.get("http://localhost:3300/empleado/getEmpleados", {

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
    $scope.detalle = true;
    $http.get("http://localhost:3300/user/filtroFecha", {

    })
        .then(function (respuesta) {
            $scope.filtroFechas = respuesta.data.resultado;
            console.log($scope.filtroFechas);

        });
    $scope.elegirOpcion = function (opc) {
        if (opc == 'detalle') {
            $scope.detalle = true;
            $scope.filtro = false;
        }
        else {
            $scope.detalle = false;
            $scope.filtro = true;
        }
    }
    $scope.opcion = {
        name: 'detalle'
    };
    $http.get("http://localhost:3300/user/clientes", {

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
    $scope.titulo = "Alta Clientes";
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
        numero: '',
        calle: '',
        sangre: '',
        estatura: 0
    };
    $scope.Enviar = function () {
        console.log("entre");
        console.log(JSON.stringify($scope.valores));
        //http://localhost:3300/user/add-user
        $http.post("http://localhost:3300/user/add-user",
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
        sobrepeso: "",
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
        $http.post("http://localhost:3300/user/add-expediente",
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
        numero: '',
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
        $http.post("http://localhost:3300/empleado/add-empleado",
            //$http.post("http://localhost:3300/empleado/add-empleado",
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
    $scope.m = "Información de Cliente";
    $scope.cte = $routeParams.idcte;
    $scope.exito = false;
    var ruta = "http://localhost:3300/user/cliente/" + $scope.cte;

    $scope.actualizarDatos = function () {
        $scope.exitoD = false;
        if(document.getElementById("telefono").value == ""){
            alert("El número no puede estar vacío")
        }
        if(document.getElementById("calle").value == "" || document.getElementById("numero").value == "" || document.getElementById("cp").value == ""){
            alert("La dirección no puede estar vacía")
        }
        if (document.getElementById("telefono").value != "" && document.getElementById("calle").value != "" && document.getElementById("numero").value != "" &&
            document.getElementById("cp").value != "") {   
            let telefono = document.getElementById("telefono").value;
            let correo = document.getElementById("correo").value;
            let calle = document.getElementById("calle").value;
            let numero = document.getElementById("numero").value;
            let cp = document.getElementById("cp").value;
            cambiarDatos(correo, telefono, calle, numero, cp);
        }
    }

    cambiarDatos = function (correo, telefono, calle, numero, cp) {
        let data = {
            correo: correo,
            telefono: telefono,
            idCliente: $scope.cte,
            idDireccion: $scope.Cliente.idDireccion,
            cp: cp,
            numero: numero,
            calle: calle
        }
        $http.post("http://localhost:3300/user/modificarDatosCliente/",data)
        .then( function (respuesta) {
            console.log(respuesta.data);
            $scope.exitoD = true;
        })
    }

    $scope.actualizarExpediente = function () {
        $scope.exitoE = false;
        let dolorCabeza = document.getElementById("dolorCabeza").value;
        let medicamentoDC = document.getElementById("medicamentoDC").value;
        let nombreMedicamentoDC = document.getElementById("nombreMedicamentoDC").value;
        let finMedicamentoDC = document.getElementById("finMedicamentoDC").value;
        let anticonceptivo = document.getElementById("anticonceptivo").value;
        let sobrepeso = document.getElementById("sobrepeso").value;
        let diabetes = document.getElementById("diabetes").value;
        let cancer = document.getElementById("cancer").value;
        let hipertension = document.getElementById("hipertension").value;
        let cardiovascular = document.getElementById("cardiovascular").value;
        let actividadFisica = document.getElementById("actividadFisica").value;
        let tipoAF = document.getElementById("tipoAF").value;
        let frecuenciaAF = document.getElementById("frecuenciaAF").value;
        let tiempoAF = document.getElementById("tiempoAF").value;
        let adiccion = document.getElementById("adiccion").value;
        let comida = document.getElementById("comida").value;
        let estres = document.getElementById("estres").value;
        let formaAlimentacion = document.getElementById("formaAlimentacion").value;
        let edadSobrepeso = document.getElementById("edadSobrepeso").value;
        let pesoDeseado = document.getElementById("pesoDeseado").value;
        let familia = document.getElementById("familia").value;
        let eventoRelacionado = document.getElementById("eventoRelacionado").value;
        let motivoReduccion = document.getElementById("motivoReduccion").value;
        if (dolorCabeza != 1 && dolorCabeza != 0) {
            alert("El valor para <dolor de cabeza> debe ser 0 o 1");
        }
        if (Number.isNaN(sobrepeso/1)) {
            alert("El valor de <sobrepeso> debe ser numérico");
        }
        if (Number.isNaN(diabetes/1)) {
            alert("El valor de <diabetes> debe ser numérico");
        }
        if (Number.isNaN(cancer/1)) {
            alert("El valor de <cancer> debe ser numérico");
        }
        if (Number.isNaN(hipertension/1)) {
            alert("El valor de <hipertension> debe ser numérico");
        }
        if (Number.isNaN(cardiovascular/1)) {
            alert("El valor de <cardiovascular> debe ser numérico");
        }
        if (actividadFisica != 1 && actividadFisica != 0) {
            alert("El valor para <actividad física> debe ser 0 o 1");
        }
        if (comida != 1 && comida != 0) {
            alert("El valor para <comida> debe ser 0 o 1");
        }
        if (estres != 1 && estres != 0) {
            alert("El valor para <estrés> debe ser 0 o 1");
        }
        cambiarExpediente(dolorCabeza, medicamentoDC, nombreMedicamentoDC, finMedicamentoDC, anticonceptivo, sobrepeso, diabetes, cancer, hipertension, cardiovascular,
            actividadFisica, tipoAF, frecuenciaAF, tiempoAF, adiccion, comida, estres, formaAlimentacion, edadSobrepeso, pesoDeseado, familia, eventoRelacionado,
            motivoReduccion);
    }

    cambiarExpediente = function (dolorCabeza, medicamentoDC, nombreMedicamentoDC, finMedicamentoDC, anticonceptivo, sobrepeso, diabetes, cancer, hipertension,
        cardiovascular, actividadFisica, tipoAF, frecuenciaAF, tiempoAF, adiccion, comida, estres, formaAlimentacion, edadSobrepeso, pesoDeseado, familia,
        eventoRelacionado, motivoReduccion) {
        let data = {
            idCliente: $scope.cte,
            dolorCabeza: dolorCabeza,
            medicamentoDC: medicamentoDC,
            nombreMedicamentoDC: nombreMedicamentoDC,
            finMedicamentoDC: finMedicamentoDC,
            anticonceptivo: anticonceptivo,
            sobrepeso: sobrepeso,
            diabetes: diabetes,
            cancer: cancer,
            hipertension: hipertension,
            cardiovascular: cardiovascular,
            actividadFisica: actividadFisica,
            tipoAF: tipoAF,
            frecuenciaAF: frecuenciaAF,
            tiempoAF: tiempoAF,
            adiccion: adiccion,
            comida: comida,
            estres: estres,
            formaAlimentacion: formaAlimentacion,
            edadSobrepeso: edadSobrepeso,
            pesoDeseado: pesoDeseado,
            familia: familia,
            eventoRelacionado: eventoRelacionado,
            motivoReduccion: motivoReduccion
        }
        $http.post("http://localhost:3300/user/modificarExpedienteCliente/",data)
        .then( function (respuesta) {
            console.log(respuesta.data);
            $scope.exitoE = true;
        })
    }

    $http.get(ruta, {
    })
        .then(function (respuesta) {
            console.log(respuesta.data);
            $scope.Cliente = respuesta.data.usuario[0];
            console.log($scope.Cliente);
        });

    $scope.return = function () {
        $location.path('verCte');
    }
});
app.controller('detallesConCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.exito = false;
    $scope.m = "Información de Consulta";
    $scope.cte = $routeParams.idcte;
    $scope.input = false;
    var ruta = "http://localhost:3300/consultas/consulta_cliente/" + $scope.cte;
    $http.get(ruta, {
    })
        .then(function (respuesta) {
            $scope.consultas = respuesta.data.consultas;
            console.log(respuesta.data);
            for (var i = 0; i < respuesta.data.consultas.length; i++) {
                var fecha = respuesta.data.consultas[0].fecha.split('T');
                respuesta.data.consultas[i].fecha = fecha[0];
            }
        });

    $scope.mostrarForm = function (){
        $scope.input = true;
    }
    $scope.return = function () {
        $location.path('verConsulta');
    }

    var ruta2 = "http://localhost:3300/user/cliente/" + $scope.cte;

    $http.get(ruta2, {
    })
        .then(function (respuesta) {
            $scope.nombre = respuesta.data.usuario[0].nombre + ' ' + respuesta.data.usuario[0].apellidoPaterno + ' ' + respuesta.data.usuario[0].apellidoMaterno;
        });

    //formulario 
    $scope.Enviar = function (data) {
        $scope.exito = false;
        $scope.input = false;
        const ruta = "http://localhost:3300/consultas/modificarConsulta";
        console.log("peticion actualizar ",data.x);
        $http.post(ruta, data.x)
            .then(function (data) {
                console.log("respuesta:",data.data);
                $scope.exito = true;
                

            })
            .catch(function (error) {
                console.log(error);
            })
    }
});
app.controller('detallesEmpCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Información de Empleado";
    $scope.emp = $routeParams.idemp;

    //var ruta = "http://localhost:3300/empleado/" + $scope.emp;
    var ruta = "http://localhost:3300/empleado/" + $scope.emp;

    $scope.actualizarDatos = function () {
        $scope.exito = false;
        if(document.getElementById("telefono").value == ""){
            alert("El número no puede estar vacío")
        }
        if(document.getElementById("calle").value == "" || document.getElementById("numero").value == "" || document.getElementById("cp").value == ""){
            alert("La dirección no puede estar vacía")
        }
        if(document.getElementById("cedula").value == ""){
            alert("La cédula no puede estar vacía")
        }
        if(document.getElementById("puesto").value == ""){
            alert("El puesto no puede estar vacío")
        }
        if (document.getElementById("telefono").value != "" && document.getElementById("calle").value != "" && document.getElementById("numero").value != "" &&
            document.getElementById("cp").value != "" && document.getElementById("cedula").value != "" && document.getElementById("puesto").value != "") {   
            let telefono = document.getElementById("telefono").value;
            let correo = document.getElementById("correo").value;
            let calle = document.getElementById("calle").value;
            let numero = document.getElementById("numero").value;
            let cp = document.getElementById("cp").value;
            let puesto = document.getElementById("puesto").value;
            let cedula = document.getElementById("cedula").value;
            let area = document.getElementById("area").value;
            let descripcion = document.getElementById("descripcion").value;
            cambiarDatos(correo, telefono, calle, numero, cp, puesto, cedula, area, descripcion);
        }
    }

    cambiarDatos = function (correo, telefono, calle, numero, cp, puesto, cedula, area, descripcion) {
        let data = {
            correo: correo,
            telefono: telefono,
            idEmpleado: $scope.emp,
            idDireccion: $scope.Empleado.idDireccion,
            cp: cp,
            numero: numero,
            calle: calle,
            puesto: puesto,
            cedula: cedula,
            area: area,
            descripcion: descripcion
        }
        $http.post("http://localhost:3300/empleado/modificarDatosEmpleado/",data)
        .then( function (respuesta) {
            console.log(respuesta.data);
            $scope.exito = true;
        })
    }

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
    $scope.altaCita = true;
    $scope.mostrarCitas = false;
    $scope.datosConsultaIn = {
        hora: "",
        fecha: "",
        notas: ""
    }
    $scope.altaCitasBool = function() {
        $scope.altaCita = true;
        $scope.mostrarCitas = false;
    }
    $scope.mostrarCitasBool = function () {
        $scope.altaCita = false;
        $scope.mostrarCitas = true;
    }
    $scope.registrarCita = function(data){
        let CTEstr = data.search1;
        let CTEres = CTEstr.split('|');
        let EMPstr = data.search2;
        let EMPres = EMPstr.split('|');
        $scope.datosConsultaIn.idCliente = CTEres[0];
        $scope.datosConsultaIn.idEmpleado = EMPres[0];
        $scope.datosConsultaIn.hora = document.getElementById("horaIn").value + " - " + document.getElementById("horaFin").value;
        console.log($scope.datosConsultaIn);
        $http.post("http://localhost:3300/citas/addCita",
                $scope.datosConsultaIn
            )
            .then(function (respuesta) {
                console.log("respuesta: ",respuesta.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
    $http.get("http://localhost:3300/user/clientes")
    .then(function (respuesta) {
        $scope.clientes = respuesta.data.usuarios;
    });

    $http.get("http://localhost:3300/empleado/getEmpleados")
    .then(function (respuesta) {
        $scope.empleados = respuesta.data.status;
        console.log("Empleados: ",$scope.empleados);
    });
    $scope.mostrarCitasLink = function (idEmpleado) {
        $location.url('/citasEmpleado/' + idEmpleado);
    }
});
app.controller('citasEmpleadoCtrl', function ($scope, $http, $location, $routeParams) {
    let idemp = $routeParams.idemp;
    let ruta = "http://localhost:3300/empleado/"+ idemp;
    $scope.empleado;
    //Traer info del empleado
    $http.get(ruta)
    .then(function (respuesta) {
        $scope.empleado = respuesta.data.empleado[0];
    })
    //Buscar fechas
    $scope.buscarFecha = function (info) {
        let fecha = document.getElementById("fecha").value;
        buscarCitasPorClienteYFecha(fecha,$routeParams.idemp);
    }

    $scope.return = function (){
        $location.path('cit');
    }
    function buscarCitasPorClienteYFecha(fecha,idEmpleado) {
        const datos = {
            fecha: fecha,
            idEmpleado: idEmpleado
        }
        console.log(datos);
        let ruta = "http://localhost:3300/citas/fecha-idEmpleado";
        $http.post(ruta,datos)
        .then(function (respuesta) {
            $scope.citasEmpleado =respuesta.data.citas;
            console.log($scope.citasEmpleado);
            if($scope.citasEmpleado.length > 0){
                $scope.tabla = true;
                $scope.sinRegistros = false;
                for (let i = 0; i < $scope.citasEmpleado.length; i++) {
                    $scope.citasEmpleado[i].fecha = $scope.citasEmpleado[i].fecha.split('T')[0];
                }
            }
            else{
                $scope.tabla = false;
                $scope.sinRegistros = true;
            }
        });
    }

    $scope.enviarWA = function (data) {
        console.log("hola", data.x);
        $http.post("https://first12354.herokuapp.com/citas/enviarRecordatorio", data.x)
            .then(function (respuesta) {
                console.log("res:", respuesta.data.response[0].telefono, $scope);
                if (respuesta.data.status == 1) {
                    $scope.res = true;
                    var mensaje = "Se le recuerda que el día " + data.x.fecha + " en el horario de "  + data.x.hora + " tiene una cita en el consultorio de NaturalInn. ¡Que tenga un buen día!";
                    open("https://api.whatsapp.com/send?phone=521"+respuesta.data.response[0].telefono+"&text="+mensaje+"&source=&data=");
                }
                else {
                    $scope.res = false;
                }
            });
    }
})
app.controller('consultasCtrl', function ($scope, $http, $location) {
    $scope.m = "Registrar Consultas";
    $scope.RegistrarConsultas = true;
    $scope.res = false;
    $scope.opcion = {
        name: 'registrar'
    };
    $http.get("http://localhost:3300/user/clientes", {

    })
        .then(function (respuesta) {
            $scope.clientes = respuesta.data.usuarios;
        });

    $http.get("http://localhost:3300/empleado/getEmpleados", {

    })
        .then(function (respuesta) {
            $scope.empleados = respuesta.data.status;

        });
    $scope.valores = {
        peso: 0,
        talla: 0,
        observaciones: "",
        fecha: "",
        hora: "",
        idCliente: 0,
        idEmpleado: 0
    };

    $scope.Enviar = function (data) {
        console.log("yujyio");
        var mesAux = "";
        var diaAux = "";
        var ban = false;
        $scope.date = new Date();
        if ($scope.date.getMonth() + 1 < 10) {
            ban = true;
            mesAux = "0" + ($scope.date.getMonth() + 1).toString();
            $scope.valores.fecha = ($scope.date.getFullYear() + "-" + (mesAux) + "-" + $scope.date.getDate()).toString();
        }
        if ($scope.date.getDate() < 10) {
            ban = true;
            diaAux = "0" + ($scope.date.getDate()).toString();
            $scope.valores.fecha = ($scope.date.getFullYear() + "-" + ($scope.date.getMonth() + 1) + "-" + diaAux).toString();
        }
        if (ban == false) {
            $scope.valores.fecha = ($scope.date.getFullYear() + "-" + ($scope.date.getMonth() + 1) + "-" + $scope.date.getDate()).toString();
        }
        $scope.valores.hora = ($scope.date.getHours() + ":" + $scope.date.getMinutes()).toString();

        var CTEstr = data.search1;
        var CTEres = CTEstr.split('|');
        var EMPstr = data.search2;
        var EMPres = EMPstr.split('|');

        $scope.valores.idCliente = CTEres[0];
        $scope.valores.idEmpleado = EMPres[0];
        $scope.RegistrarConsulta();
    }

    $scope.RegistrarConsulta = function () {
        console.log($scope.valores);
        $http.post("http://localhost:3300/consultas/registrarConsulta", $scope.valores
        )
            .then(function (respuesta) {
                console.log(respuesta.data);
                if (respuesta.data.status == 1) {
                    $scope.res = true;
                }
                else {
                    $scope.res = false;
                }
                $scope.Limpiar();
            });
    }

    $scope.Accion = function (opc) {
        if (opc == 'reg') {
            $scope.RegistrarConsultas = true;
            $scope.VerConsultas = false;
        }
        else if (opc == 'ver') {
            $scope.RegistrarConsultas = false;
            $location.path('verConsulta');
        }
    }

    $scope.Limpiar = function () {
        $scope.valores.peso = 0;
        $scope.valores.talla = "";
        $scope.valores.observaciones = "";
        $scope.valores.fecha = "";
        $scope.valores.hora = "";
        document.getElementById('clean').value = "";
        document.getElementById('clean2').value = "";
    }

});
app.controller('verConsultaCtrl', function ($scope, $http, $location) {
    $scope.m = "Ver Consulta";
    $http.get("http://localhost:3300/consultas/clientes_con_consultas", {

    })
        .then(function (respuesta) {
            $scope.consultas = respuesta.data.clientes;
            console.log($scope.consultas);
        });

    $scope.return = function () {
        $location.path('con');

    }

    $scope.Detalles = function (data) {
        $location.url('/detallesCONSULTA/' + data.x.idCliente);

    }
});
app.controller('masajesCtrl', function ($scope, $http, $location) {
    $scope.m = "SPA";
    $scope.agregar = true;
    $scope.lista = false;
    $scope.agregarSPA = function () {
        $scope.agregar = true;
        $scope.lista = false;
    }
    $scope.mostrarLista = function () {
        $scope.agregar = false;
        $scope.lista = true;
    }
    $scope.buscarFecha = function () {
        let fecha = document.getElementById("fecha").value;
        console.log(fecha);
        $http.get("http://localhost:3300/masajes/citasOcupadas/"+ fecha)
        .then(function (respuesta) {
            console.log(respuesta.data);
            $scope.citas = respuesta.data.fechas;

        })
        .catch(function (data) {
            console.log(data);
        });
    }
    $http.get("http://localhost:3300/user/clientes")
    .then(function (respuesta) {
        $scope.clientes = respuesta.data.usuarios;

    });

    $scope.Enviar = function (data){
        let fecha = document.getElementById("dia").value;
        let nombre;
        if(document.getElementById("clean").value.split('|')[1] == undefined){
            nombre = document.getElementById("clean").value
        }else{
            nombre = document.getElementById("clean").value.split('|')[1]
        }
        const datos = {
            hora: document.getElementById("hora").value,
            fecha: fecha,
            aparato: document.getElementById("aparato").value.toString(),
            nombreCliente: nombre
        };
        console.log(datos);
        $http.post("http://localhost:3300/masajes/addCitaMasaje",datos)
        .then(function () {
            alert("cita registrada")
            limpiarCampos(); 
        })  
        .catch(function () {
            alert("error");
        });
    }

    function limpiarCampos (){
        $scope.aparato = "";
        $scope.search1 = "";
        $scope.dia = "";
        $scope.hora = "";
    }

});
app.controller('tipoMasajeCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Tipo de Masaje";
    $scope.msjError = false;
    $scope.date = $routeParams.date;
    $scope.extraUltimo = "";
    console.log($scope.date);
    $http.get("http://localhost:3300/masajes/ultimoExtra")
        .then(function (res) {
            $scope.extraUltimo = res.data.extra[0].lastExtra;
            console.log($scope.extraUltimo);
        });

    $http.get("http://localhost:3300/masajes/extras", {

    })
        .then(function (respuesta) {
            $scope.extras = respuesta.data.extras;
            var json_check = [];
            for (var i = 0; i < $scope.extras.length; i++) {
                var datosExtras = { id: $scope.extras[i].idExtras, nombre: $scope.extras[i].nombre, value: false, cantidad: 1 };
                json_check.push(datosExtras);
            }
            $scope.checkboxModel = json_check;
            //console.log($scope.checkboxModel);

        });

    $scope.extraSeleccionado = " ";
    $scope.cantidad = {
        value: 1
    };
    $scope.ver = function (data, accion) {
        //console.log(data);
        if (accion == 'ext') {
            if (data.value == false) {
                for (var i = 0; i < $scope.checkboxModel.length; i++) {
                    if ($scope.checkboxModel[i].id == data.id) {
                        $scope.checkboxModel[i].value = true;
                    }
                }
            }
            else {
                for (var i = 0; i < $scope.checkboxModel.length; i++) {
                    if ($scope.checkboxModel[i].id == data.id) {
                        $scope.checkboxModel[i].value = false;
                    }
                }
            }
        }


        //console.log($scope.checkboxModel);
    }
    $scope.tipoDeMasaje = {
        model: null,
        Opciones: [
            { id: '1', name: 'Relajante' },
            { id: '2', name: 'Reductivo' },
            { id: '3', name: 'Otros' }
        ]
    };
    $scope.tipoDeMasajeSeleccionado = "";

    $scope.Unguento = {
        model: null,
        Opciones: [
            { id: '1', name: 'Aceite de Aguacate' },
            { id: '2', name: 'Jitomates' },
            { id: '3', name: 'Otros' }
        ]
    };
    $scope.tipoDeUnguentoSeleccionado = "";

    $scope.valores = {
        fecha: "",
        hora: "",
        tipo: "",
        unguento: "",
        extras: {
            idExtra: 0,
            cantidad: 0

        }
    }
    var json_extras = [];
    $scope.Enviar = function () {
        //console.log($scope.checkboxModel)
        if ($scope.tipoDeMasajeSeleccionado != "" && $scope.tipoDeUnguentoSeleccionado != "") {
            $scope.msjError = false;
            $scope.valores.tipo = $scope.tipoDeMasajeSeleccionado;
            $scope.valores.unguento = $scope.tipoDeUnguentoSeleccionado;
            json_extras = [];
            for (var i = 0; i < $scope.checkboxModel.length; i++) {
                if ($scope.checkboxModel[i].value == true) {
                    var datosExtras = { idExtra: $scope.checkboxModel[i].id, cantidad: $scope.checkboxModel[i].cantidad };
                    json_extras.push(datosExtras);
                }
            }
            $scope.valores.extras = json_extras;
            var obj = $scope.date;
            var date = obj.split('|');
            $scope.valores.fecha = date[0];
            $scope.valores.hora = date[1];

            //console.log($scope.valores);

            $scope.EnviarBD($scope.valores);

        }
        else {
            $scope.msjError = true;
        }
    }

    $scope.EnviarBD = function (data) {
        //console.log(data);
        $http.post("http://localhost:3300/masajes/addExtrasMasaje",
            data
        )
            .then(function (respuesta) {
                console.log(respuesta.data);
                if (respuesta.data.status == 1) {
                    $location.path('mas');
                }
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
});
app.controller('reporteCtrl', function ($scope, $http) {
    $scope.diaB = false;
    $scope.periodoB = false;
    $scope.dia = function () {
         //iniciar variables en 0
         $scope.totalCon = 0;
         $scope.extrasVentas = 0;
         $scope.total1 = 0;
         $scope.ventas = 0
        $scope.diaB = true;
        $scope.periodoB = false;
    }
    $scope.periodo = function () {
         //iniciar variables en 0
         $scope.totalCon = 0;
         $scope.extrasVentas = 0;
         $scope.total1 = 0;
         $scope.ventas = 0
        $scope.diaB = false;
        $scope.periodoB = true;
    }
    $scope.m = "Reporte de Extras"
    $scope.fecha ="";
    $scope.fechaDia = "";
    $scope.fecha2 = "";
    $scope.verificarFechaDia = function () {
        
        $scope.fechaDia = document.getElementById("dateDia").value;
        console.log("fecha dia");
        console.log($scope.fechaDia.toString());
        if($scope.fechaDia == ""){
            alert("Selecciona una fecha")
        }else{
            consultarFechaDia($scope.fechaDia)
            consultarConsultasDia($scope.fechaDia);
        }   
        console.log("ventas ",$scope.ventas, "consultas ", $scope.extrasVentas);
    }
    consultarFechaDia = function (fecha) {
        const data = {
            fecha: fecha
            
        }
        $http.post("http://localhost:3300/reportes/reporteVentasDia", data)
        .then(function (respuesta) {
            console.log(respuesta.data);
            $scope.total1 = 0;
            let arrayAux = respuesta.data.ventas;
            if(arrayAux.length < 1){
                alert("No hay ventas en ese dia/periodo")
            }
            let suma = 0;
            arrayAux.forEach(e => {
                console.log(e.cantidad);
                suma += e.cantidad;
            });
            $scope.total1 = suma;
            $scope.ventas = respuesta.data.ventas
        });
    }
    consultarConsultasDia = function (fecha) {
        const data = {
            fecha: fecha
        }
        $http.post(
            "http://localhost:3300/reportes/reporteConsultasDia",
            data
        )
        .then(function (respuesta) {
            $scope.totalCon;
            $scope.extrasVentas = respuesta.data.consultas;
            let arrayAux = respuesta.data.consultas;
            if(arrayAux.length < 1){
                alert("No hay consultas en ese dia/periodo")
            }
            let suma = 0;
            arrayAux.forEach(e => {
                suma += e.cantidad;
            });
            $scope.totalCon = suma;
        });
    }
    $scope.verificarFecha = function () {
        $scope.fecha = document.getElementById("date").value;
        $scope.fecha2 = document.getElementById("date2").value;

        if($scope.fecha == "" && $scope.fecha2 == ""){
            alert("Selecciona una fecha")
        }else{
            console.log($scope.fecha);
            consultarFecha($scope.fecha,$scope.fecha2);
            consultarConsultas($scope.fecha,$scope.fecha2);
        }
    }
    consultarConsultas = function (fecha,fecha2) {
        const data = {
            fecha: fecha,
            fecha2: fecha2
        }
        $http.post(
            "http://localhost:3300/reportes/reporteConsultas",
            data
        )
        .then(function (respuesta) {
            $scope.totalCon;
            $scope.extrasVentas = respuesta.data.consultas;
            let arrayAux = respuesta.data.consultas;
            if(arrayAux.length < 1){
                alert("No hay consultas en ese dia/periodo")
            }
            let suma = 0;
            arrayAux.forEach(e => {
                suma += e.cantidad;
            });
            $scope.totalCon = suma;
        });
    }
    consultarFecha = function (fecha,fecha2) {
        const data = {
            fecha: fecha,
            fecha2: fecha2
        }
        $http.post("http://localhost:3300/reportes/reporteVentas", data)
        .then(function (respuesta) {
            console.log(respuesta.data);
            $scope.total1 = 0;
            let arrayAux = respuesta.data.ventas;
            if(arrayAux.length < 1){
                alert("No hay ventas en ese dia/periodo")
            }
            let suma = 0;
            arrayAux.forEach(e => {
                console.log(e.cantidad);
                suma += e.cantidad;
            });
            $scope.total1 = suma;
            $scope.ventas = respuesta.data.ventas
        });
    }
});
app.controller('ventasCtrl', function ($scope, $http, $location) {
    $scope.m = "Ventas";
    $scope.listavacia = false;
    $scope.ventaAgregada = false;

    $http.get("http://localhost:3300/inventario/allProducts", {
    })
        .then(function (respuesta) {
            $scope.productos = respuesta.data.productos;
            console.log($scope.productos);
        })
    $scope.lista = [];
    $scope.products = [];
    $scope.aumentar = function (data) {
        var existencia = $scope.buscarExistencia (data);
        for (var i = 0; i < ($scope.lista.length); i++) {
            if ($scope.lista[i].idProducto == parseInt(data) && $scope.lista[i].cantidad < existencia) {
                $scope.lista[i].cantidad = ($scope.lista[i].cantidad) + 1;
                break;
            }
        }
    }
    $scope.disminuir = function (data) {
        for (var i = 0; i < $scope.lista.length; i++) {
            if ($scope.lista[i].idProducto == parseInt(data) && $scope.lista[i].cantidad != 1) {
                $scope.lista[i].cantidad = ($scope.lista[i].cantidad) - 1;
                break;
            }
        }
    }
    $scope.Agregar = function (data) {
        var item = data.split('|');
        if ($scope.VerificarLista(item[0])) {
            $scope.aumentar(item[0]);
        }
        else {
            if( $scope.buscarExistencia(parseInt(item[0])) > 0){
                var objeto = { idProducto: parseInt(item[0]), nombre: item[1], cantidad: 1 };
                $scope.lista.push(objeto);
            }
            else{
                alert("No hay existencias del producto!");
            }

        }
    }

    $scope.Eliminar = function (id) {
        for (var i = 0; i < $scope.lista.length; i++) {
            if ($scope.lista[i].idProducto == id) {
                $scope.lista.splice(i, 1);
                break;
            }
        }
    }

    $scope.VerificarLista = function (id) {
        for (var i = 0; i < $scope.lista.length; i++) {

            if ($scope.lista[i].idProducto == id) {
                return true;
            }
        }
        return false;
    }

    $scope.Enviar = function (){
        if($scope.lista != ""){
            $scope.listavacia = false;
            $scope.filtrarProducto();
            console.log($scope.products);
            $http.post("http://localhost:3300/inventario/sellProduct",$scope.products)
            .then(function (respuesta) {
                console.log(respuesta.data);
                if(respuesta.data.status == 1){
                    $scope.products = [];
                    $scope.lista = [];
                    $scope.ventaAgregada = true;
                }
                else{
                    $scope.ventaAgregada = false;
                }
            })
        }
        else{
            $scope.listavacia = true;

        }
    }

    $scope.filtrarProducto = function (){
        for(var i=0;i<$scope.lista.length;i++){
            var objeto = { idProducto: parseInt($scope.lista[i].idProducto), cantidad: $scope.lista[i].cantidad };
            $scope.products.push(objeto);
        }
        
    }

    $scope.buscarExistencia = function (id){
        for (var i = 0; i < $scope.productos.length; i++) {

            if ($scope.productos[i].idProducto == id) {
                return $scope.productos[i].existencia;
            }
        }

    }

});
app.controller('altasCtrl', function ($scope, $http, $location) {
    $scope.m = "Altas"
    $scope.error = false;
    $scope.correcto = false;
    $scope.VerProductos = function (){
        $location.path('verproductos');
    }
    $scope.Enviar = function (e, n, d){
        const data = {
            nombre: n,
            existencia: e,
            descripcion: d
        }

        console.log(data)
        $http.post("http://localhost:3300/inventario/addProduct",data)
        .then(function (respuesta) {
            console.log(respuesta.data);
            if (respuesta.data.status == 1) {
                $scope.correcto = true;
                $scope.error = false;
                $scope.nombre = "";
                $scope.descripcion = "";
                $scope.existencia = 0;
            }
            else {
                $scope.correcto = false;
                $scope.error = false;
            }
        })
    }
    
});

app.controller('verproductosCtrl', function ($scope, $http, $location) {
    $scope.m = "Productos";
    $scope.correcto = false;
    $scope.error = false;
    $http.get("http://localhost:3300/inventario/allProducts", {
    })
        .then(function (respuesta) {
            $scope.productos = respuesta.data.productos;
            console.log(respuesta.data);

        })
    $scope.Altas= function (){
        $location.path('altas');
    }

    $scope.actualizar = function (data){
        console.log(data);
        $scope.update = true;
        $scope.name = data.nombre;
        $scope.idPro = data.idProducto;
    }

    $scope.actualizar_existencia = function (id_pro,unidad_pro){
        const data = {
            idProducto: id_pro,
            unidades: unidad_pro
        }

        console.log(data)
       $http.post("http://localhost:3300/inventario/updateProductInventory",data)
        .then(function (respuesta) {
            console.log(respuesta.data);
            if (respuesta.data.status == 1) {
                $scope.correcto = true;
                $scope.existencia_nueva = 1;
                $scope.error = false;
                $scope.update = false;
                $http.get("http://localhost:3300/inventario/allProducts", {
                })
                    .then(function (respuesta) {
                        $scope.productos = respuesta.data.productos;
                        console.log(respuesta.data);
            
                    })
            }
            else {
                $scope.correcto = false;
                $scope.error = false;
            }
        })
    }

    $scope.eliminar = function (data){
        

    }
    
});



