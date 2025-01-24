let numeroSecreto = 0;
let numeroDeIntentos = 0;
let intentosMaximos = 5;
let numeroMaximo = 10;
let listaNumerosSorteados = [];

// Funcion para asignar texto y estilo a un elemento
function asignarTextElemento(elemento, texto, color = "white") {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    elementoHTML.style.color = color;
}

// Generar un numero aleatorio no repetido
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextElemento('p', 'Ya se sortearon todos los números posibles', 'red');
        return null;
    } else if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto(); // Llamada recursiva
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

// Verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextElemento('p', `Por favor, ingresa un número válido entre 1 y ${numeroMaximo}`, 'red');
        limpiarCaja();
        return;
    }

    numeroDeIntentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextElemento('p', `¡Acertaste el número secreto en ${numeroDeIntentos} ${(numeroDeIntentos === 1) ? 'intento.' : 'intentos.'}`, 'white');
        document.getElementById('reiniciar').removeAttribute('disabled');
        deshabilitarEntrada();
    } else if (numeroDeUsuario > numeroSecreto) {
        asignarTextElemento('p', `El número secreto es menor. Intentos restantes: ${intentosMaximos - numeroDeIntentos}`, 'white');
    } else {
        asignarTextElemento('p', `El número secreto es mayor. Intentos restantes: ${intentosMaximos - numeroDeIntentos}`, 'white');
    }

    if (numeroDeIntentos >= intentosMaximos && numeroDeUsuario !== numeroSecreto) {
        asignarTextElemento('p', ` Lo siento, no acertaste. El número secreto era ${numeroSecreto}.`, 'white');
        document.getElementById('reiniciar').removeAttribute('disabled');
        deshabilitarEntrada();
    }

    limpiarCaja();
}

// Inicializar condiciones del juego
function condicionesIniciales() {
    asignarTextElemento('h1', 'Juego del Número Secreto');
    asignarTextElemento('p', `Adivina un número entre 1 y ${numeroMaximo}. Tienes ${intentosMaximos} intentos.`);
    numeroSecreto = generarNumeroSecreto();
    numeroDeIntentos = 0;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    habilitarEntrada();
    limpiarCaja();
}

// Limpiar la caja de entrada
function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
}

// Deshabilitar entrada de usuario
function deshabilitarEntrada() {
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
}

// Habilitar entrada de usuario
function habilitarEntrada() {
    document.getElementById('valorUsuario').removeAttribute('disabled');
}

// Reiniciar el juego
function reiniciarJuego() {
    condicionesIniciales();
}

// Inicializar juego al cargar
condicionesIniciales();
