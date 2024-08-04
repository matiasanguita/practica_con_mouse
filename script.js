document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const zonaDeJuego = document.querySelector('.zonaDeJuego');
    const inputUsuario = document.getElementById('usuarioInput');
    const botonEnviar = document.getElementById('enviarButton');
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    const contadorPuntos = document.getElementById('contadorPuntos');
    const botonReset = document.getElementById('resetButton');

    let puntos = 0;
    let nombreUsuario = localStorage.getItem('nombreUsuario') || '';

    // Función para crear un nuevo punto
    function crearPunto() {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        const maxX = zonaDeJuego.clientWidth - 10;
        const maxY = zonaDeJuego.clientHeight - 10;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        punto.style.left = `${x}px`;
        punto.style.top = `${y}px`;

        // Evento de clic en el punto
        punto.addEventListener('click', () => {
            puntos++;
            contadorPuntos.textContent = `Actualmente, ${nombreUsuario} tiene ${puntos} puntos.`;
            zonaDeJuego.removeChild(punto);
            crearPunto();
        });
        zonaDeJuego.appendChild(punto);
    }

    // Iniciar el juego creando el primer punto
    crearPunto();

    // Si hay un nombre de usuario almacenado, mostrar mensaje de bienvenida
    if (nombreUsuario) {
        mensajeBienvenida.textContent = `¡Bienvenido de nuevo, ${nombreUsuario}!`;
        contadorPuntos.textContent = `Actualmente, ${nombreUsuario} tiene ${puntos} puntos.`;
    }

    // Ingreso del nombre de usuario
    botonEnviar.addEventListener('click', () => {
        nombreUsuario = inputUsuario.value.trim();

        if (nombreUsuario) {
            // Almacenar nombre de usuario en localStorage
            localStorage.setItem('nombreUsuario', nombreUsuario);
            
            mensajeBienvenida.textContent = `¡Bienvenido, ${nombreUsuario}!`;
            inputUsuario.value = '';

            // Resetear puntos
            puntos = 0;
            contadorPuntos.textContent = `Actualmente, ${nombreUsuario} tiene ${puntos} puntos.`;
        } else {
            mensajeBienvenida.textContent = 'Por favor, ingresa un nombre.';
        }
    });

    // Botón de resetear el contador
    botonReset.addEventListener('click', () => {
        if (nombreUsuario) {
            puntos = 0;
            contadorPuntos.textContent = `Actualmente, ${nombreUsuario} tiene ${puntos} puntos.`;
        }
    });
});
