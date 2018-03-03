var json;
var json2;
var idPelicula
var contadorVotos = 0;
var datosPelicula = [];
var butacasSeleccionadas = [];

window.onload = function () {
    LecturaJson();
    datosSalaStorage();
    asignarEventos();
    $('body').fadeIn(500);
}

// Funcion para leer el JSON de peliculas //
function LecturaJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json = xhttp.responseText;
        json2 = JSON.parse(json);
    };
    xhttp.open("GET", "../js/peliculas.json", false);
    xhttp.send();
    infoPelicula(json2);
}

// Funcion para leer el JSON de butacas //
function datosSalaStorage() {
    var idSala = localStorage.getItem('idSala');
    var datosSala = localStorage.getItem(idSala);
    datosSala = JSON.parse(datosSala);
    generarButacas(datosSala[2]);
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
    infoPagina();
}

function infoPagina() {
    var contenedor = document.getElementById('form-pelicula');
    var imagen = document.createElement('img');
    imagen.setAttribute('src', datosPelicula[0].imagen2);
    imagen.setAttribute('alt', datosPelicula[0].titulo);
    imagen.setAttribute('id', 'pelicula-form');
    imagen.setAttribute('aria-label', datosPelicula[0].titulo);
    contenedor.setAttribute('aria-label', 'Ha seleccionado la película: ' + datosPelicula[0].titulo);
    contenedor.appendChild(imagen);

    var span = document.createElement('span');
    span.textContent = datosPelicula[0].titulo;
    contenedor.appendChild(span);
}

function generarButacas(butacas) {
    for (var item in butacas) {
        document.getElementById("butacas").innerHTML += "<use title='" + item + "' id='" + item + "' href='#butaca' class='butaca " + butacas[item].estado + "' x='" + butacas[item].x + "' y='" + butacas[item].y + "' width='100' height='100' />";
    }

    var $item2;
    $(".libre, .reservado").bind("click", function (event) {
        $item2 = event.currentTarget;
    }).toggle(function () {
            $(this).attr("class", "reservado");
            butacasSeleccionadas.push($item2.id);
        },
        function () {
            $(this).attr("class", "libre");
            var i = butacasSeleccionadas.indexOf($item2.id);
            if (i !== -1) {
                butacasSeleccionadas.splice(i, 1);
            }
        });
}

function asignarEventos() {
    var $botones = $('button');

    $($botones[0]).bind('click', function () {
        location.href = ('pelicula.html');
    })

    $($botones[1]).bind('click', function () {
        localStorage.setItem('butacasSeleccionadas', JSON.stringify(butacasSeleccionadas));
        location.href = ('pago.html');
    })
}