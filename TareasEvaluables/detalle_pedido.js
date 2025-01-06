//Arrays para almacenar los pedidos y las piezas
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let piezas = JSON.parse(localStorage.getItem('piezas')) || [];

//Función para consultar el detalle de un pedido
function consultarDetallePedido() {
    const numeroPedido = parseInt(document.getElementById('numeroPedidoDetalle').value);

    const pedido = pedidos.find(p => p.numeroPedido == numeroPedido);
    if(!pedido) {
        alert("Pedido no encontrado");
        return;
    }

    /*Filtra las piezas en el array piezas que están asociadas al numeroPedido introducido y 
    almacena el resultado en la variable piezasAsociadas.*/
    const piezasAsociadas = piezas.filter(p => p.numeroPedido == numeroPedido);
    const detalleDiv = document.getElementById('detallePedido');


    if(piezasAsociadas.length === 0) { //Verifica si no hay piezas asociadas al pedido, es decir, si el array piezasAsociadas está vacío.
        detalleDiv.innerHTML = ` <p>No hay piezas asociadas a este pedido</p> `;
        return;
    }

    let detalleHTML = `
    <h2>Detalle del Pedido Nº ${pedido.numeroPedido}</h2>
    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
    <p><strong>Fecha pedido:</strong> ${pedido.fechaPedido}</p>
    <p><strong>Procesado:</strong> ${pedido.procesado ? 'Sí' : 'No'}</p>
    <p><strong>Servido:</strong> ${pedido.servido ? 'Sí' : 'No'}</p>
    <h3>Piezas Asociadas</h3>
    <table>
        <thead>
            <tr>
                <th>Nº de Pieza</th>
                <th>Largo (cm)</th>
                <th>Ancho (cm)</th>
                <th>Grosor</th>
                <th>Color</th>
                <th>Chapeado en ambas caras</th>
                <th>Cortada</th>
                <th>Superficie (cm²)</th>
                <th>Volumen (cm³)</th>
            </tr>
        </thead>
        <tbody>   
    `;

    piezasAsociadas.forEach(p => {
        const superficie = p.largo * p.ancho;//Calcula la superficie de la pieza y almacena el resultado en la variable superficie.
        const volumen = p.largo * p.ancho * p.grosor;//Calcula el volumen de la pieza y almacena el resultado en la variable volumen.
        detalleHTML += ` 
            <tr>
                <td>${p.numeroPieza}</td>
                <td>${p.largo}</td>
                <td>${p.ancho}</td>
                <td>${p.grosor}</td>
                <td>${p.color}</td>
                <td>${p.ambasCaras ? 'Sí' : 'No'}</td>
                <td>${p.cortada ? 'Sí' : 'No'}</td>
                <td>${superficie}</td>
                <td>${volumen}</td>
            </tr>    
        `;
    });

    detalleHTML += `
    </tbody>
    </table>
    `;

    detalleDiv.innerHTML = detalleHTML;
}