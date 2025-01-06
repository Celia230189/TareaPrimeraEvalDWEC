//Arrays para almacenar las piezas y los pedidos
let piezas = JSON.parse(localStorage.getItem('piezas')) || [];
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function inicializarNumeroPedidoDesplegable() {
    const numeroPedidoSelect = document.getElementById('numeroPedido');//Obtiene referencia al elemento del DOM con el id 'numeroPedido'
    numeroPedidoSelect.innerHTML = '';//Limpia cualquier contenido previo dentro del elemento
    pedidos.forEach(pedido => {//Itera sobre cada objeto 'pedido' en el array pedidos 
        const option = document.createElement('option');//Crea un nuevo elemento 'option' para el deplegable
        option.value = pedido.numeroPedido;//Establece el valor de la opción como el número de pedido
        option.textContent = pedido.numeroPedido;//Establece el texto de la opción cmo el número de pedido
        numeroPedidoSelect.appendChild(option);//Añade la opción al elemento 'select' del DOM
    });
}

//Inicializa los desplegables
document.addEventListener('DOMContentLoaded', function() {//Añade un evento que se ejecuta cuando el contenido del DOM ha sido completamente cargado
    inicializarNumeroPedidoDesplegable();
});

//Función para añadir una pieza
function aniadirPieza() {
    const numeroPieza = parseInt(document.getElementById('numeroPieza').value);
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value);
    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const grosor = parseFloat(document.getElementById('grosor').value);
    const color = document.getElementById('color').value;
    const ambasCaras = document.getElementById('ambasCaras').checked;
    const cortada = document.getElementById('cortada').checked;

    if(isNaN(numeroPieza) || numeroPieza < 1 || !Number.isInteger(numeroPieza)) {
        alert("El número de pieza debe ser un entero mayor o igual que 1");
        return;
    }

    if(piezas.some(pieza => pieza.numeroPieza == numeroPieza)) {
        alert("Ya existe una pieza con este número");
        return;
    }

    if(!pedidos.some(pedido => pedido.numeroPedido == numeroPedido)) {
        alert("El número de pedido no existe");
        return;
    }

    if(isNaN(largo) || largo <= 0 || isNaN(ancho) || ancho <= 0 || isNaN(grosor) || grosor <= 0) {
        alert("Las medidas deben ser mayor que 0");
        return;
    }

    //Crea el objeto con los datos de la nueva pieza
    const nuevaPieza = {
        numeroPieza,
        numeroPedido,
        largo,
        ancho,
        grosor,
        color,
        ambasCaras,
        cortada
    };

    piezas.push(nuevaPieza);
    localStorage.setItem('piezas',JSON.stringify(piezas));
    alert("Pieza añadida correctamente");
    document.getElementById('formPiezas').reset();
}

//Función para modificar una pieza
function modificarPieza() {
    const numeroPieza = parseInt(document.getElementById('numeroPieza').value);
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value);
    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const grosor = parseFloat(document.getElementById('grosor').value);
    const color = document.getElementById('color').value;
    const ambasCaras = document.getElementById('ambasCaras').checked;
    const cortada = document.getElementById('cortada').checked;

    const pieza = piezas.find(p => p.numeroPieza == numeroPieza);
    if(!pieza) {
        alert("Pieza no encontrada");
        return;
    }

    if(!pedidos.some(pedido => pedido.numeroPedido == numeroPedido)) {
        alert("El número de pedido no existe");
        return;
    }

    if(isNaN(largo) || largo <= 0 || isNaN(ancho) || ancho <= 0 || isNaN(grosor) || grosor <= 0) {
        alert("Las medidas deben ser mayor que 0");
        return;
    }

    //Actualiza los datos 
    pieza.numeroPedido = numeroPedido;
    pieza.largo = largo;
    pieza.ancho = ancho;
    pieza.grosor = grosor;
    pieza.color = color;
    pieza.ambasCaras = ambasCaras;
    pieza.cortada = cortada;

    localStorage.setItem('piezas', JSON.stringify(piezas));
    alert("Pieza modificada correctamente");
}

//Función para consultar una pieza
function consultarPieza() {
    const numeroPieza = parseInt(document.getElementById('numeroPieza').value);
    const pieza = piezas.find(p => p.numeroPieza == numeroPieza);

    if(!pieza) {
        alert("Pieza no encontrada");
        return;
    }

    const resultadoDiv = document.getElementById('resultadoPieza');
    resultadoDiv.innerHTML = `
       <p>
          <strong>Nº de pieza:</strong> ${pieza.numeroPieza}<br>
          <strong>Nº de pedido:</strong> ${pieza.numeroPedido}<br>
          <strong>Largo:</strong> ${pieza.largo}<br>
          <strong>Ancho:</strong> ${pieza.ancho}<br>
          <strong>Grosor:</strong> ${pieza.grosor}<br>
          <strong>Color:</strong> ${pieza.color}<br>
          <strong>Chapeado en ambas caras:</strong> ${pieza.ambasCaras ? 'Sí' : 'No'}<br>
          <strong>Cortada:</strong> ${pieza.cortada ? 'Sí' : 'No'}
       </p>
    `;

    mostrarDebugInfo(numeroPieza, piezas);
}

//Función para eliminar una pieza
function eliminarPieza() {
    const numeroPieza = parseInt(document.getElementById('numeroPieza').value);
   
    if(isNaN(numeroPieza) || numeroPieza < 1) {
        alert("Por favor, ingrese un número de pieza válido");
        return;
    }

    const index = piezas.findIndex(p => p.numeroPieza == numeroPieza);

    if(index === -1) {
        alert("Pieza no encontrada");
        return;
    }

    piezas.splice(index, 1);

    localStorage.setItem('piezas', JSON.stringify(piezas));

    alert("Pieza eliminada correctamente");
    document.getElementById('formPiezas').reset();

    //Depuración en consola
    console.log("Pieza eliminada:", numeroPieza);
    console.log("Array de piezas actualizado:", piezas);


}

// Información de depuración en la consola
function mostrarDebugInfo(numeroPieza, piezas) { 
     console.log(`Nº de pieza ingresado: ${numeroPieza}`); 
     console.log('Array de Piezas:'); 
     console.log(JSON.stringify(piezas, null, 2));
}