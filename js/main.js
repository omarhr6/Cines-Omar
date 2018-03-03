var json;
var json2;
var json3;
var json4;
var datosPelicula = [];

window.onload = function () {
    LecturaJson();
    LecturaJson2();
    $('body').fadeIn(500);
}

function LecturaJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json = xhttp.responseText;
        json2 = JSON.parse(json);
    };
    xhttp.open("GET", "js/peliculas.json", false);
    xhttp.send();

}

function LecturaJson2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json3 = xhttp.responseText;
        json4 = JSON.parse(json3);
    };
    xhttp.open("GET", "js/butacas.json", false);
    xhttp.send();

    crearElementos(json2);
    cargarImagenes(json2);
    CargarLocalStorage(json2, json4);
}


function crearElementos(peliculas) {
    var contadorPeliculas = 0;
    var contenedor = document.getElementById('contenedor');

    for (var i in peliculas) {
        contadorPeliculas++;
        var div = document.createElement('div');
        if (contadorPeliculas < 10) {
            div.setAttribute('id', i);
            div.setAttribute('class', 'contenedores-peliculas');
            contenedor.appendChild(div);
        } else {
            div.setAttribute('id', i);
            div.setAttribute('class', 'contenedores-peliculas');
            contenedor.appendChild(div);
        }
    }
}

// Funcion para cargar las peliculas y las salas en el local Storage //
function CargarLocalStorage(peliculas, butacas) {
    idPelicula = localStorage.getItem('idPelicula');

    // Métemos las peliculas en el local Storage //
    for (var i in peliculas) {
        if (i == idPelicula) {
            datosPelicula.push(peliculas[i]);
        }

        if (localStorage.getItem(i) == null) {
            for (var i in peliculas) {
                var pelicula = peliculas[i].titulo;
                localStorage.setItem(i, pelicula);
            }
        }
    }

    var contadorSalas = 1;
    // Generamos las salas de cine en el local Storage //
    for (var i in peliculas) {
        var horarios = peliculas[i].horarios;
        var titulo = peliculas[i].titulo;
        for (var i = 0; i < horarios.length; i++) {
            if (localStorage.getItem("sala" + contadorSalas) == null) {
                var pelicula = [horarios[i], titulo, butacas];
                localStorage.setItem("sala" + contadorSalas, JSON.stringify(pelicula));
            }
            contadorSalas++;
        }
    }
}

function cargarImagenes(peliculas) {
    var contadorPeliculas = 0;
    var contadorTabIndex = 0;
    var $item;

    for (var i in peliculas) {
        contadorPeliculas++;
        contadorTabIndex++;
        if (contadorPeliculas < 10) {
            var contenedor = document.getElementById('pelicula_0' + contadorPeliculas);
            $('#pelicula_0' + contadorPeliculas).on("click", function (event) {
                $item = event.currentTarget;
                localStorage.setItem('idPelicula', $item.id);
                location.href = '../portfolio/pelicula.html';
            });
            $('#pelicula_0' + contadorPeliculas).on("keydown", function (event) {
                if (event.keyCode === 13) {
                    $item = event.currentTarget;
                    localStorage.setItem('idPelicula', $item.id);
                    location.href = 'portfolio/pelicula.html';
                }
            });
        } else {
            var contenedor = document.getElementById('pelicula_' + contadorPeliculas);
            $('#pelicula_' + contadorPeliculas).on("click", function (event) {
                $item = event.currentTarget;
                localStorage.setItem('idPelicula', $item.id);
                location.href = 'portfolio/pelicula.html';
            });
            $('#pelicula_' + contadorPeliculas).on("keydown", function (event) {
                if (event.keyCode === 13) {
                    $item = event.currentTarget;
                    localStorage.setItem('idPelicula', $item.id);
                    location.href = 'portfolio/pelicula.html';
                }
            });
        }
        var imagenes = document.createElement('img');
        imagenes.setAttribute('src', peliculas[i].imagen);
        imagenes.setAttribute('alt', peliculas[i].titulo);
        imagenes.setAttribute('title', peliculas[i].titulo);
        imagenes.setAttribute('aria-label', peliculas[i].titulo);
        contenedor.setAttribute('tabindex', 0);
        contenedor.setAttribute('aria-label', 'Haz click o pulsa enter para acceder a la información de la película' + peliculas[i].titulo);
        contenedor.appendChild(imagenes);

        var titulo = document.createElement('span');
        titulo.textContent = peliculas[i].titulo;
        contenedor.appendChild(titulo);
    }
}