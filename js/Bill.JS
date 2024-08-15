const nav = document.querySelector('.nav-lateral');
const menu = document.querySelector('#menu');
const main = document.querySelector('.main');
const volver = document.querySelector('#volver');
const listFactura = document.querySelector('.tbody-factura');
const pagar = document.querySelector('#pagar');

document.addEventListener('DOMContentLoaded', crmDB);

menu.addEventListener('click', e => {
    if (nav.style.display === 'none') {
        nav.style.display = 'flex';
        document.addEventListener('click', function closeMenu(e) {
            if (nav.style.display === 'flex') {
                if (!menu.contains(e.target)) {
                    nav.style.display = 'none';
                    document.removeEventListener('click', closeMenu);
                }
            }
        });

    } else {
        nav.style.display = 'none';
    }
});

volver.addEventListener('click', e => {
    eliminarIndexedDB();
})

function crmDB() {
    // Crear base de datos version 1.0
    let crmDB = window.indexedDB.open('crm', 1);

    // Si hay un error
    crmDB.onerror = function() {
        console.log('Hubo un error');
    }

    // Si se creo bien
    crmDB.onsuccess = function() {
        DB =crmDB.result;
    }

    // Código para extraer datos de IndexedDB
   setTimeout(() => {
    let transaction = DB.transaction(['crm'], 'readonly');

    transaction.oncomplete = function() {
        console.log('Transacción completada');
    }

    transaction.onerror = function() {
        console.log('Error en la transacción');
    }

    const objectStore = transaction.objectStore('crm');

    const getRequest = objectStore.get(1);

    getRequest.onsuccess = function(event) {
        var data = getRequest.result;

        mostrarArticulos(data)
    };
    getRequest.onerror = function(event) {
        console.log('Error al intentar extraer los datos de IndexedDB');
    };
   }, 300)
}

function mostrarArticulos(data) {

    let totalFactura = 0; // Inicializar el costo total

    data.forEach(articulo => {
        const { nombre, cantidad, precio } = articulo;
        let totalArticulo = precio * cantidad;
        totalFactura += totalArticulo;
        const table = document.createElement('tr');
        table.innerHTML = `
            <td>
                ${nombre}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                $ ${precio}
            </td>
            <td>
                $ ${totalArticulo}
            </td>
        `;
        listFactura.appendChild(table);
    });

    // Mostrar el costo total al final de la lista
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td></td>
        <td></td>
        <td class="total">
            <b>Total:</b>
        </td>
        <td>
            <b>$ ${totalFactura}</b>
        </td>
    `;
    listFactura.appendChild(totalRow);
}

pagar.addEventListener('click', e => {
    // Llamar a la función para eliminar la base de datos
    eliminarIndexedDB();
});

function eliminarIndexedDB() {
    // Cerrar la conexión con la base de datos si está abierta
    if (DB) {
        DB.close();
    }

    // Eliminar la base de datos
    let deleteRequest = indexedDB.deleteDatabase('crm');

    deleteRequest.onsuccess = function() {
        console.log('Base de datos eliminada exitosamente');
    };

    deleteRequest.onerror = function() {
        console.log('Error al intentar eliminar la base de datos');
    };

    history.back();
}







