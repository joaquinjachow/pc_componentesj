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

export function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);
    alert(`${producto.nombre} agregado al carrito`);
}  