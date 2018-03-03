var json;
var json2;
var datosPelicula = [];
var horaSeleccionada;
var peliculaSeleccionada;
var salaSelecionada;

window.onload = function () {
    LecturaJson();
    asignarEventos();
    $('body').fadeIn(500);

    $('#horarios').on('click', 'button', function () {
        horaSeleccionada = $(this).attr('id');
        redirecionarButacas();
    })
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
    var idPelicula = localStorage.getItem('idPelicula');

    for (var i in peliculas) {
        if (i == idPelicula) {
            datosPelicula.push(peliculas[i]);
        }
    }
    infoPagina();
}

function infoPagina() {
    var imagen;

    var header = document.getElementById('header');
    imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].portada);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    header.appendChild(imagen);

    var cartelera = document.getElementById('cartelera');
    imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].imagen);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    imagen.setAttribute('id', 'carteleraPelicula');
    cartelera.appendChild(imagen);

    var spanAño = document.getElementById('span-año');
    spanAño.textContent = datosPelicula[0].año;

    var spanDuracion = document.getElementById('span-duracion');
    spanDuracion.textContent = datosPelicula[0].duracion;

    var spanGeneros = document.getElementById('span-generos');
    spanGeneros.textContent = datosPelicula[0].generos;

    var navder = document.getElementById('nav-der');
    var titulo = document.createElement('h2');
    titulo.textContent = datosPelicula[0].titulo;
    titulo.setAttribute('id', 'tituloPelicula');
    navder.appendChild(titulo);

    var sinopsis = document.createElement('h3');
    sinopsis.textContent = "Sinopsis";
    navder.appendChild(sinopsis);

    var spansinopsis = document.createElement('span');
    spansinopsis.textContent = datosPelicula[0].sinopsis;
    navder.appendChild(spansinopsis);

    var contenedorHorarios = document.getElementById("horarios");
    var arrayHorarios = datosPelicula[0].horarios;
    for (var i = 0; i < arrayHorarios.length; i++) {
        var button = document.createElement('button');
        button.setAttribute("class", "botones-horarios");
        button.setAttribute("id", arrayHorarios[i]);
        button.textContent = arrayHorarios[i];
        contenedorHorarios.appendChild(button);
    }

    var contenedorTrailer = document.getElementById('trailer');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('width', '650');
    iframe.setAttribute('height', '405');
    iframe.setAttribute('src', datosPelicula[0].trailer);
    iframe.setAttribute('title', 'Trailer de la película ' + datosPelicula[0].titulo);
    contenedorTrailer.appendChild(iframe);
}

// Funcion para redireccionar a la página de butacas //
function redirecionarButacas() {
    peliculaSeleccionada = datosPelicula[0].titulo;
    var contadorSalas = 1;

    for (var i in json2) {
        var horarios = json2[i].horarios;
        for (var i = 0; i < horarios.length; i++) {
            var sala = localStorage.getItem('sala' + contadorSalas);
            sala = JSON.parse(sala);
            if(sala[0] == horaSeleccionada && sala[1] == peliculaSeleccionada){
                var idSala = 'sala' + contadorSalas;
                localStorage.setItem('idSala', idSala);
                location.href = "form.html";
            }
            contadorSalas = contadorSalas + 1;
        }
    }
}

// Función para asignar evento al botón de ir atras //
function asignarEventos() {
    var $botones = $('button');
    var index = $botones.length;

    $($botones[index - 1]).on('click', function () {
        location.href = ('../index.html');
    })
}