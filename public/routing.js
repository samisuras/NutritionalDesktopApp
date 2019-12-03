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
    $scope.detalle = true;
    $http.get("https://first12354.herokuapp.com/user/filtroFecha", {

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
        name: 'detalle'
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
app.controller('detallesConCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Informacion de Consultas";
    $scope.cte = $routeParams.idcte;
    var ruta = "https://first12354.herokuapp.com/consultas/consulta_cliente/" + $scope.cte;
    $http.get(ruta, {
    })
        .then(function (respuesta) {
            $scope.consultas = respuesta.data.consultas;
            console.log($scope.consultas);
        });

    $scope.return = function () {
        $location.path('verConsulta');
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


    $scope.horarios = [
        { hor: "9:00 - 10:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "10:00 - 11:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "11:00 - 12:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "12:00 - 13:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "13:00 - 14:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "14:00 - 15:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" },
        { hor: "15:00 - 16:00", status: "Libre", color: "success", btn: false, cte: "", emp: "", nota: "" }
    ];

    $scope.datosConsulta = {
        hora: "",
        fecha: "",
        notas: "",
        idCliente: "",
        idEmpleado: "",
        fechaFormato: ""
    }

    $scope.Enviar = function (data) {
        if (data.search1 != null && data.search2 != null) {

            var CTEstr = data.search1;
            var CTEres = CTEstr.split('|');
            var EMPstr = data.search2;
            var EMPres = EMPstr.split('|');
            $scope.datosConsulta.hora = data.horario.hor;
            $scope.datosConsulta.idCliente = CTEres[0];
            $scope.datosConsulta.idEmpleado = EMPres[0];
            $scope.datosConsulta.notas = data.nota;
            $scope.msjError = false;
            var formatDate = ($scope.datosConsulta.fecha.getFullYear() + "-" + ($scope.datosConsulta.fecha.getMonth() + 1) + "-" + $scope.datosConsulta.fecha.getDate()).toString();
            $scope.datosConsulta.fechaFormato = formatDate;
            //console.log($scope.datosConsulta);
            $http.post("https://first12354.herokuapp.com/citas/addCita",
                $scope.datosConsulta
            )
                .then(function (respuesta) {
                    console.log(respuesta.data);
                    if (respuesta.data.status == 1) {
                        $scope.ReiniciarDatos();
                    }
                })
                .catch(function (error) {
                    console.log(error.data);
                });
        }
        else {
            $scope.msjError = true;
        }

    }

    $scope.verificarFecha = function () {
        //Checar elejibilidad de fecha

        $scope.msj = false;
        if ($scope.datosConsulta.fecha != "") {
            //Checar fechas mayores no puede ser menor
            if ($scope.datosConsulta.fecha.getTime() >= (new Date().getTime() - 51840000)) {
                $scope.msjError2 = false;
                $scope.filtrarFechas($scope.datosConsulta.fecha);
                $scope.tablaConsultas = true;
            } else {
                $scope.msjError2 = true;
                $scope.tablaConsultas = false;
            }
        }
        else {
            $scope.msjError2 = true;
            $scope.tablaConsultas = false;
        }

    }

    $scope.filtrarFechas = function (formatDate) {
        var mesAux = "";
        var diaAux = "";
        var fecha = "";
        var ban = false;
        if (formatDate.getMonth() + 1 < 10) {
            ban = true;
            mesAux = "0" + (formatDate.getMonth() + 1).toString();
            fecha = (formatDate.getFullYear() + "-" + (mesAux) + "-" + formatDate.getDate()).toString();
        }
        if (formatDate.getDate() < 10) {
            ban = true;
            diaAux = "0" + (formatDate.getDate()).toString();
            fecha = (formatDate.getFullYear() + "-" + (formatDate.getMonth() + 1) + "-" + diaAux).toString();
        }
        if (ban == false) {
            fecha = (formatDate.getFullYear() + "-" + (formatDate.getMonth() + 1) + "-" + formatDate.getDate()).toString();
        }

        var ruta = "https://first12354.herokuapp.com/citas/citasOcupadas/" + fecha;
        console.log(ruta);
        $http.get(ruta, {

        })
            .then(function (respuesta) {
                $scope.fechasOcupadas = respuesta.data.fechas;
                console.log(respuesta.data);
                if (respuesta.data.fechas.length == 0) {
                    console.log("No hay coincidencias BD");
                    for (var j = 0; j < $scope.horarios.length; j++) {
                        $scope.horarios[j].status = "Libre";
                        $scope.horarios[j].color = "success";
                        $scope.horarios[j].btn = false;
                        $scope.horarios[j].cte = ""
                        $scope.horarios[j].emp = ""
                        $scope.horarios[j].nota = ""
                    }

                }
                else {

                    for (var i = 0; i < $scope.fechasOcupadas.length; i++) {
                        for (var j = 0; j < $scope.horarios.length; j++) {
                            if ($scope.fechasOcupadas[i].hora == $scope.horarios[j].hor) {

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

    $scope.ReiniciarDatos = function () {
        document.getElementById('clean').value = "";
        document.getElementById('clean2').value = "";
        document.getElementById('clean3').value = "";
        $scope.datosConsulta.fecha = "";
        $scope.tablaConsultas = false;
        $scope.msj = true;

    }


});
app.controller('consultasCtrl', function ($scope, $http, $location) {
    $scope.m = "Registrar Consultas";
    $scope.RegistrarConsultas = true;
    $scope.res = false;
    $scope.opcion = {
        name: 'registrar'
    };
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
        $http.post("https://first12354.herokuapp.com/consultas/registrarConsulta", $scope.valores
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
    $http.get("https://first12354.herokuapp.com/consultas/clientes_con_consultas", {

    })
        .then(function (respuesta) {
            $scope.consultas = respuesta.data.clientes;
            //console.log($scope.consultas);
        });

    $scope.return = function () {
        $location.path('con');

    }

    $scope.Detalles = function (data) {
        $location.url('/detallesCONSULTA/' + data.x.idCliente);

    }
});
app.controller('masajesCtrl', function ($scope, $http, $location) {
    $scope.m = "Masajes";
    $scope.index = -1;
    $scope.msjError = false;
    $scope.msjError2 = false;
    $scope.msj = false;
    $scope.tablaConsultas = false;

    $http.get("https://first12354.herokuapp.com/empleado/getEmpleados", {

    })
        .then(function (respuesta) {
            $scope.empleados = respuesta.data.status;

        });


    $scope.horarios = [
        { hor: "9:00 - 10:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "10:00 - 11:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "11:00 - 12:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "12:00 - 13:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "13:00 - 14:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "14:00 - 15:00", status: "Libre", color: "success", btn: false, emp: "" },
        { hor: "15:00 - 16:00", status: "Libre", color: "success", btn: false, emp: "" }
    ];
    $scope.datosMasajes = {
        hora: "",
        fecha: "",
        idEmpleado: "",
        fechaFormato: ""
    }

    $scope.Enviar = function (data) {
        if (data.search2 != null) {
            var EMPstr = data.search2;
            var EMPres = EMPstr.split('|');
            $scope.datosMasajes.hora = data.horario.hor;
            $scope.datosMasajes.idEmpleado = EMPres[0];
            $scope.msjError = false;
            var formatDate = ($scope.datosMasajes.fecha.getFullYear() + "-" + ($scope.datosMasajes.fecha.getMonth() + 1) + "-" + $scope.datosMasajes.fecha.getDate()).toString();
            $scope.datosMasajes.fechaFormato = formatDate;

            $http.post("https://first12354.herokuapp.com/masajes/addCitaMasaje",
                $scope.datosMasajes
            )
                .then(function (respuesta) {
                    console.log(respuesta.data);
                    if (respuesta.data.status == 1) {
                        $location.url('/tipoMasaje/' + $scope.datosMasajes.fechaFormato + "|" + $scope.datosMasajes.hora);
                        $scope.ReiniciarDatos();
                    }
                })
                .catch(function (error) {
                    console.log(error.data);
                });
        }
        else {
            $scope.msjError = true;
        }

    }

    $scope.verificarFecha = function () {
        //Checar elejibilidad de fecha
        //$location.path('tipoMasaje');
        $scope.msj = false;
        if ($scope.datosMasajes.fecha != "") {
            //Checar fechas mayores no puede ser menor
            if ($scope.datosMasajes.fecha.getTime() >= (new Date().getTime() - 51840000)) {
                $scope.msjError2 = false;
                $scope.filtrarFechas($scope.datosMasajes.fecha);
                $scope.tablaConsultas = true;
            } else {
                $scope.msjError2 = true;
                $scope.tablaConsultas = false;
            }
        }
        else {
            $scope.msjError2 = true;
            $scope.tablaConsultas = false;
        }

    }

    $scope.filtrarFechas = function (formatDate) {
        var mesAux = "";
        var diaAux = "";
        var fecha = "";
        var ban = false;
        if (formatDate.getMonth() + 1 < 10) {
            ban = true;
            mesAux = "0" + (formatDate.getMonth() + 1).toString();
            fecha = (formatDate.getFullYear() + "-" + (mesAux) + "-" + formatDate.getDate()).toString();
        }
        if (formatDate.getDate() < 10) {
            ban = true;
            diaAux = "0" + (formatDate.getDate()).toString();
            fecha = (formatDate.getFullYear() + "-" + (formatDate.getMonth() + 1) + "-" + diaAux).toString();
        }
        if (ban == false) {
            fecha = (formatDate.getFullYear() + "-" + (formatDate.getMonth() + 1) + "-" + formatDate.getDate()).toString();
        }

        var ruta = "https://first12354.herokuapp.com/masajes/citasOcupadas/" + fecha;
        console.log(ruta);

        $http.get(ruta, {

        })
            .then(function (respuesta) {
                $scope.fechasOcupadas = respuesta.data.fechas;
                console.log(respuesta.data);
                if (respuesta.data.fechas.length == 0) {
                    console.log("No hay coincidencias BD");
                    for (var j = 0; j < $scope.horarios.length; j++) {
                        $scope.horarios[j].status = "Libre";
                        $scope.horarios[j].color = "success";
                        $scope.horarios[j].btn = false;
                        $scope.horarios[j].emp = ""
                    }

                }
                else {

                    for (var i = 0; i < $scope.fechasOcupadas.length; i++) {
                        for (var j = 0; j < $scope.horarios.length; j++) {
                            if ($scope.fechasOcupadas[i].hora == $scope.horarios[j].hor) {

                                $scope.horarios[j].status = "Ocupado";
                                $scope.horarios[j].color = "danger";
                                $scope.horarios[j].btn = true;
                                $scope.horarios[j].emp = $scope.fechasOcupadas[i].nombreEmpleado;

                            }
                        }
                    }
                    //console.log($scope.horarios)

                }

            });

    }

    $scope.ReiniciarDatos = function () {
        document.getElementById('clean2').value = "";
        $scope.datosMasajes.fecha = "";
        $scope.tablaConsultas = false;
        $scope.msj = true;

    }


});
app.controller('tipoMasajeCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.m = "Tipo de Masaje";
    $scope.msjError = false;
    $scope.date = $routeParams.date;
    console.log($scope.date);

    $http.get("https://first12354.herokuapp.com/masajes/extras", {

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
        $http.post("https://first12354.herokuapp.com/masajes/addExtrasMasaje",
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
    $scope.m = "Reporte de Extras"
    $http.get("https://first12354.herokuapp.com/reportes/reporteExtras", {

    })
        .then(function (respuesta) {
            $scope.extrasCantidad = respuesta.data.extrasReporte;
            console.log($scope.extrasCantidad);
        });

    $http.get("https://first12354.herokuapp.com/reportes/ventaExtras", {

    })
        .then(function (respuesta) {
            $scope.extrasVentas = respuesta.data.ventas;
            console.log($scope.extrasVentas);
        });
});
