import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { obtenerUsuario } from '@/utils/obtenerUsuario';
import { toast } from 'react-hot-toast';

export default function Historial() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const user = obtenerUsuario();
        if (!user) return toast.error('Usuario no autenticado');
        const res = await fetch(`http://localhost:3001/ventas/usuario/${user.id}`);
        const data = await res.json();
        setCompras(data);
      } catch (error) {
        toast.error('Error al obtener historial');
      }
    };
    fetchCompras();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Historial de Compras</h1>
        {compras.length === 0 ? (
          <p className="text-center text-gray-600">No tenés compras registradas.</p>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            {compras.map((venta) => (
              <div key={venta._id} className="border-b border-gray-200 mb-4 pb-4">
                <p className="text-gray-500 mb-1">Fecha: {venta.fecha}</p>
                <p className="text-gray-500 mb-1">Total: ${venta.total}</p>
                <p className="text-gray-500 mb-2">Dirección: {venta.direccion}</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {venta.productos.map((prod, idx) => (
                    <li key={idx}>Producto: {prod.id.nombre} | Cantidad: {prod.cantidad} | Precio: ${prod.precio_unitario}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}