import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:3001/productos');
        const data = await res.json();
        const cats = [...new Set(data.map(p => p.categoria || 'Sin categoría'))];
        setCategorias(cats);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    obtenerCategorias();
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-center space-x-6">
        {path !== '/' && (
          <Link
            href="/home"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-blue-100"
          >
            Home
          </Link>
        )}
        {categorias.map((cat) => (
          <Link
            key={cat}
            href={`/categoria/${cat}`}
            className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-100 capitalize"
          >
            {cat}
          </Link>
        ))}
        {path !== '/historial' && (
          <Link
            href="/historial"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-blue-100"
          >
            Historial
          </Link>
        )}
        {path !== '/carrito' && (
          <Link
            href="/carrito"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-blue-100"
          >
            Carrito
          </Link>
        )}
      </div>
    </nav>
  );
}