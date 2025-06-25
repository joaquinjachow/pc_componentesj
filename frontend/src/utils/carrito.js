export function obtenerCarrito() {
    if (typeof window !== 'undefined') {
        const carrito = localStorage.getItem('carrito');
        return carrito ? JSON.parse(carrito) : [];
    }
    return [];
}

export function guardarCarrito(carrito) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

export function agregarAlCarrito(producto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const index = carrito.findIndex(p => p._id === producto._id);
    if (index !== -1) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
    guardarCarrito(carrito);
}