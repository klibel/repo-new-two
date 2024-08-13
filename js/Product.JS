const nav = document.querySelector('.nav-lateral');
const menu = document.querySelector('#menu');
const infoProducto = JSON.parse(localStorage.getItem('infoProducto'));
const main = document.querySelector('.main');
const volver = document.querySelector('#volver');
const regresar = document.querySelector('#regresar')

function handleButtonClick(event) {
    history.back();
}

document.addEventListener('DOMContentLoaded', e => {
    crearVista();

    document.addEventListener('click', event => {
        if (event.target.id === 'volver' || event.target.id === 'regresar') {
            handleButtonClick(event);
        }
    });
});
  
menu.addEventListener('click', e => {
    if (nav.style.display === 'none'){
        nav.style.display = 'flex';
        document.addEventListener('click', function closeMenu(e) {
            if(nav.style.display === 'flex'){
                if (!menu.contains(e.target) && !carrito.contains(e.target)) {
                    nav.style.display = 'none';      
                    document.removeEventListener('click', closeMenu);
                }
            }
        });
    }
    else {
        nav.style.display = 'none';
    }
});

function crearVista(){
    const { imagen, nombre, precio } = infoProducto;
    if (infoProducto){
        const vistaCard = document.createElement('section')
        vistaCard.className = 'vistaCard';
        vistaCard.innerHTML = 
        `
        <div class="imgCard">
            <img src="${imagen}" id="zoom-img">
        </div>
        <div class="infoCard">
            <h2>${nombre}</h2>
            <h3>Precio: <span class="precio">${precio}</span></h3>
            <button id="regresar">Volver</button>
        </div>
        `

        main.appendChild(vistaCard)
    }
}


