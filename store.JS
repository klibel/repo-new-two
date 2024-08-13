let estacionActual = 0;
const estaciones = document.querySelectorAll('.header');
const nav = document.querySelector('.nav-lateral');
const menu = document.querySelector('#menu');
const btnCarrito = document.querySelector('#carrito');
const carrito = document.querySelector('.carrito-list');

function cambiarEstacion(direccion) {
    estacionActual = (estacionActual + direccion + estaciones.length) % estaciones.length;
    estaciones[estacionActual].scrollIntoView({ behavior: 'smooth' });
}

menu.addEventListener('click', e => {
    if (nav.style.display === 'none'){
        nav.style.display = 'flex';
        carrito.style.display = 'none';
        document.addEventListener('click', function closeMenu(e) {
            if(nav.style.display === 'flex' || carrito.style.display === 'block'){
                if (!menu.contains(e.target) && !carrito.contains(e.target)) {
                    nav.style.display = 'none';
                    carrito.style.display = 'none';
                    document.removeEventListener('click', closeMenu);
                }
            }
        });
    }
    else {
        nav.style.display = 'none';
        carrito.style.display = 'none';
    }
});

btnCarrito.addEventListener('click', e =>{
    if(carrito.style.display === 'none'){
        carrito.style.display = 'block';
        nav.style.display = 'none'; 
    } else{
        carrito.style.display = 'none';
    }
});






