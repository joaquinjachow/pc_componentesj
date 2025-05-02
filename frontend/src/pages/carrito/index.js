import { useEffect, useState } from 'react';
import { obtenerCarrito, guardarCarrito } from '@/utils/carrito';
import Navbar from '@/components/Navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  const comprar = async () => {
    const orden = {
      id_usuario: 1,
      fecha: new Date().toISOString().split('T')[0],
      direccion: 'Calle Falsa 123',
      productos: carrito.map(p => ({
        id: p.id,
        cantidad: p.cantidad,
        precio_unitario: p.precio
      }))
    };

    const res = await fetch('http://localhost:3001/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orden)
    });

    if (res.ok) {
      alert('Compra realizada con éxito');
      guardarCarrito([]);
      setCarrito([]);
    } else {
      alert('Error al procesar la compra');
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">🛍️ Tu Carrito</h1>
        {carrito.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No hay productos en el carrito.</p>
        ) : (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
            <ul className="divide-y divide-gray-200 mb-6">
              {carrito.map((p, i) => (
                <li key={i} className="py-3 flex justify-between text-gray-700">
                  <span>{p.nombre} x{p.cantidad}</span>
                  <span className="font-semibold">${p.precio}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={comprar}
              className="w-full bg-green-500 text-white font-medium py-3 rounded-xl hover:bg-green-600 transition"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </main>
  );
}