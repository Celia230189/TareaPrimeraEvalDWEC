//Array para almacenar los pedidos
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

//Función para añadir un pedido
function aniadirPedido() {
    //Obtiene los valores de los input con los id 
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value);
    const cliente = document.getElementById('cliente').value;
    const fechaPedido = document.getElementById('fechaPedido').value;
    const procesado = document.getElementById('procesado').checked;
    const servido = document.getElementById('servido').checked;

    if(isNaN(numeroPedido) || numeroPedido < 1 || !Number.isInteger(numeroPedido)) {
        alert("El número de pedido debe ser un entero mayor o igual que 1");
        return;
    }

    if(pedidos.some(pedido => pedido.numeroPedido === numeroPedido)) {
        alert("Ya existe un pedido con este número");
        return;
    }

    if(new Date(fechaPedido) > new Date()) {
        alert("La fecha de pedido no puede ser posterior al día actual");
        return;
    }

    //Crea un objeto nuevoPedido con los datos obtenidos 
    const nuevoPedido = { 
        numeroPedido,
        cliente,
        fechaPedido,
        procesado,
        servido
    };

    pedidos.push(nuevoPedido); //Añade nuevoPedido al array pedidos
    localStorage.setItem('pedidos', JSON.stringify(pedidos)); //Almacena el array pedidos actualizado en el localStorage
    alert("Pedido añadido correctamente");
    document.getElementById('formPedido').reset(); //Limpia el formulario
}

//Función para modificar un pedido
function modificarPedido() {
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value);
    const cliente = document.getElementById('cliente').value;
    const fechaPedido = document.getElementById('fechaPedido').value;
    const procesado = document.getElementById('procesado').checked;
    const servido = document.getElementById('servido').checked;

    const pedido = pedidos.find(p => p.numeroPedido === numeroPedido); //Busca el en el array pedidos el pedido con el mismo número
    if(!pedido) {
        alert("Pedido no encontrado");
        return;
    }

    if(new Date(fechaPedido) > new Date()) {
        alert("La fecha de pedido no puede ser posterior al día actual");
        return;
    }

    //Modifica los valores en el pedido encontrado
    pedido.cliente = cliente;
    pedido.fechaPedido = fechaPedido;
    pedido.procesado = procesado;
    pedido.servido = servido;

    localStorage.setItem('pedidos', JSON.stringify(pedidos)); //Almacena el array pedidos actualizado en el localStorage
    alert("Pedido modificado correctamente");
}

//Función para consultar un pedido
function consultarPedido() {
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value); //Obtiene el valor del número de pedido del input
    const pedido = pedidos.find(p => p.numeroPedido === numeroPedido); 

    if(!pedido) {
        alert("Pedido no encontrado");
        return;
    }

    const mensaje = `
       Nº de pedido: ${pedido.numeroPedido}\n
       Cliente: ${pedido.cliente}\n
       Fecha de Pedido: ${pedido.fechaPedido}\n
       Procesado: ${pedido.procesado ? 'Sí' : 'No'}\n
       Servido: ${pedido.servido ? 'Sí' : 'No'} `;

    
    alert(mensaje);  
}

//Función para eliminar un pedido
function eliminarPedido() {
    const numeroPedido = parseInt(document.getElementById('numeroPedido').value);

    /*En este caso, la búsqueda de un pedido específico en el array pedidos se realiza con findIndex
    para obtener el índice correcto del pedido ya que queremos eliminarlo.
    El método findIndex devuelve -1 si no encuentra ningún pedido que coincida con el número de pedido buscado.*/ 

    const index = pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if(index === -1) {
        alert("Pedido no encontrado");
        return;
    }

    pedidos.splice(index, 1);
    /*Elimina el objeto en el índice index del array pedidos. La función splice elimina elementos del array,
     comenzando en el índice especificado y eliminando el número de elementos especificado, en este caso 1.*/
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    /*Actualiza el almacenamiento local (localStorage) con el array pedidos modificado. 
    Convierte el array pedidos en una cadena JSON y lo guarda en el almacenamiento local bajo la clave 'pedidos'.*/
    alert("Pedido eliminado correctamente");
    document.getElementById('formPedido').reset();//Reinicia el formulario
}

//Función para mostrar todos los pedidos
function mostrarTodosPedidos() {
    const todosPedidosDiv = document.getElementById('todosPedidos');
    if(pedidos.length === 0) {
        todosPedidosDiv.innerHTML = `<p>No hay pedidos almacenados</p>`;
        return;
    }

    let todosPedidosHTML = `
    <h2>Todos los Pedidos</h2>
    <table>
        <thead>
            <tr>
                <th>Nº de Pedido</th>
                <th>Cliente</th>
                <th>Fecha Pedido</th>
                <th>Procesado</th>
                <th>Servido</th>
            </tr>
        </thead>
        <tbody>
        `;
        pedidos.forEach(pedidos => {
            todosPedidosHTML += `
            <tr>
                <td>${pedidos.numeroPedido}</td>
                <td>${pedidos.cliente}</td>
                <td>${pedidos.fechaPedido}</td>
                <td>${pedidos.procesado ? 'Sí' : 'No'}</td>
                <td>${pedidos.servido ? 'Sí' : 'No'}</td>
            </tr>`;
         });

        todosPedidos += '</tbody></table>';
        todosPedidosDiv.innerHTML = todosPedidosHTML;

}