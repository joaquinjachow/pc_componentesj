import { useEffect, useState } from 'react';
import { obtenerCarrito, guardarCarrito } from '@/utils/carrito';
import Navbar from '@/components/Navbar';
import { toast } from 'react-hot-toast';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [celular, setCelular] = useState('');

  useEffect(() => {
    const carritoLocal = obtenerCarrito();
    setCarrito(carritoLocal);
  }, []);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(p => p._id !== id);
    guardarCarrito(nuevoCarrito);
    setCarrito(nuevoCarrito);
    toast.success('Producto eliminado del carrito', { duration: 2000 });
  };

  const comprar = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No estás autenticado');
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]))
    const idUsuario = payload.id || payload._id
    if (!direccion.trim()) {
      toast.error('Por favor ingresa una dirección de envío');
      return;
    }
    if (!celular.trim()) {
      toast.error('Por favor ingresa un número de celular');
      return;
    }

    const orden = {
      id_usuario: idUsuario,
      fecha: new Date().toISOString().split('T')[0],
      direccion,
      celular,
      productos: carrito.map(p => ({
        id: p._id,
        cantidad: p.cantidad,
        precio_unitario: p.precio
      }))
    };
    const res = await fetch('http://localhost:3001/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orden)
    });
    if (res.ok) {
      toast.success('Compra realizada con éxito');

      const mensaje = encodeURIComponent(`Hola! Esta es mi orden:\n\n${carrito.map(p => `• ${p.nombre} x${p.cantidad} - $${p.precio}`).join('\n')
        }\n\nTotal: $${carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}\nDirección: ${direccion}`);

      const whatsappURL = `https://wa.me/${celular}?text=${mensaje}`;
      window.open(whatsappURL, '_blank');

      guardarCarrito([]);
      setCarrito([]);
      setDireccion('');
      setCelular('');
    } else {
      const error = await res.json();
      toast.error(`Error al procesar la compra: ${error.mensaje}`);
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
                  <div>
                    <span>{p.nombre} x{p.cantidad}</span>
                    <span className="font-semibold">${p.precio}</span>
                  </div>
                  <button
                    onClick={() => eliminarProducto(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección de envío"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="Número de celular (sin + ni espacios)"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
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