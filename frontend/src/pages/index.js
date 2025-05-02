import { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductCard'
import Navbar from '@/components/Navbar';

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🛒 Todos los Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map(p => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </div>
    </main>
  );
}