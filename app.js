const SELECTOR_CARRITO = '#carrito';
const SELECTOR_ELEMENTOS_1 = '#lista-1';
const SELECTOR_ELEMENTOS_2 = '#lista-2';
const SELECTOR_VACIAR_CARRITO = '#vaciar-carrito';
const ATRIBUTO_DATA_ID = 'data-id';

const carrito = document.querySelector(SELECTOR_CARRITO);
const elementos1 = document.querySelector(SELECTOR_ELEMENTOS_1);
const elementos2 = document.querySelector(SELECTOR_ELEMENTOS_2);
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector(SELECTOR_VACIAR_CARRITO);
let carritoItems = [];

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    lista.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', cargarCarritoLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        const infoElemento = leerDatosElemento(elemento);
        insertarCarrito(infoElemento);
        guardarCarritoLocalStorage();
    }
}

function leerDatosElemento(elemento) {
    return {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute(ATRIBUTO_DATA_ID)
    };
}

function insertarCarrito(elemento) {
    carritoItems.push(elemento);
    actualizarCarrito();
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elementoId = e.target.getAttribute(ATRIBUTO_DATA_ID);
        carritoItems = carritoItems.filter(item => item.id !== elementoId);
        actualizarCarrito();
        guardarCarritoLocalStorage();
    }
}

function vaciarCarrito() {
    carritoItems = [];
    actualizarCarrito();
    guardarCarritoLocalStorage();
}

function actualizarCarrito() {
    lista.innerHTML = '';

    carritoItems.forEach(elemento => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width="100">
            </td>
            <td>
                ${elemento.titulo}
            </td>
            <td>
                ${elemento.precio}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

function cargarCarritoLocalStorage() {
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

    if (carritoLocalStorage) {
        carritoItems = carritoLocalStorage;
        actualizarCarrito();
    }
}


