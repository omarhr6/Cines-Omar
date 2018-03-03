var json;
var json2;
var idPelicula
var contadorVotos = 0;
var datosPelicula = [];
var datosSala = [];
var preciototal;

window.onload = function () {
    LecturaJson();
    asignarEventos();
    $('body').fadeIn(500);
}

function LecturaJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json = xhttp.responseText;
        json2 = JSON.parse(json);
    };
    xhttp.open("GET", "/js/peliculas.json", false);
    xhttp.send();
    infoPelicula(json2);
}

function infoPelicula(peliculas) {
    idPelicula = localStorage.getItem('idPelicula');
    
    for (var i in peliculas) {
        if (i == idPelicula) {
            datosPelicula.push(peliculas[i]);
        }
        
        if (localStorage.getItem(i) == null) {
            for (var i in peliculas) {
                var pelicula = [peliculas[i].titulo, 0];
                localStorage.setItem(i, JSON.stringify(pelicula));
            }
        }
    }
    infoSala();
    infoPagina();
}

function infoSala() {
    var idSala = localStorage.getItem('idSala');
    datosSala = localStorage.getItem(idSala);
    datosSala = JSON.parse(datosSala);
    console.log(datosSala);
}

function infoPagina() {
    var contenedor = document.getElementById('form-pelicula');
    var imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].imagen);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    imagen.setAttribute('id', 'pelicula-form');
    imagen.setAttribute('aria-label', datosPelicula[0].titulo);
    contenedor.setAttribute('aria-label', 'Ha seleccionado la película: ' + datosPelicula[0].titulo);
    contenedor.appendChild(imagen);

    var span = document.createElement('span');
    span.textContent = datosPelicula[0].titulo;
    contenedor.appendChild(span);

    document.getElementById('hora').innerHTML += datosSala[0];

    var date = new Date();
    document.getElementById('fecha').innerHTML += date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    var butacas = localStorage.getItem('butacasSeleccionadas');
    butacas = JSON.parse(butacas);
    for (var i = 0; i < butacas.length; i++) {
        butacas[i] = butacas[i].replace("_", " ");
    }
    document.getElementById('butacasSeleccionadas').innerHTML += butacas;

    document.getElementById("precioButaca").innerHTML += "6.20€"

    preciototal = document.getElementById("precioTotal").innerHTML += butacas.length * 6.20 + " €";
}

function ocuparButacas() {
    var idSala = localStorage.getItem("idSala");
    var butacas = localStorage.getItem("butacasSeleccionadas");
    butacas = JSON.parse(butacas);
    for(var i = 0; i < butacas.length; i++){
        datosSala[2][butacas[i]].estado = "ocupado";
        console.log(datosSala);
    }
    localStorage.setItem(idSala, JSON.stringify(datosSala));
}

function registrarComprador() {
    contadorComprador = localStorage.getItem('idComprador');

    if (contadorComprador == null) {
        contadorComprador = 1;
        localStorage.setItem('idComprador', contadorComprador);
    } else {
        contadorComprador++;
        localStorage.setItem('idComprador', contadorComprador);
    }

    var votante = [$('#txtNombre').val(), $('#txtApellido').val(), $('#txtTelefono').val(), $('#txtCorreo').val(), $('#txtFecha').val(), "Pelicula: " + datosSala[1], "Hora: " + datosSala[0], "Precio: " + preciototal ];
    localStorage.setItem('Comprador-' + contadorComprador, JSON.stringify(votante));
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).bind('click', function () {
        location.href = ('form.html');
    })

    $($botones[1]).bind('click', function () {
        ocuparButacas();
        registrarComprador();
        $('.contenedor-imagen').hide();
        $('.formulario-contenedor').hide();
        $('.contenedor-datos-reserva').hide();
        $('#contenedor-botones').hide();
        $('#spinner').show();
        $('.pago-realizado').show();

        window.setTimeout(function () {
            $('#spinner').hide();
            $('.pago-realizado').hide();
            $('.pago-completado').show();
        }, 3000);

        window.setTimeout(function () {
            location.href = ('../index.html');            
        }, 5000);
    })
}