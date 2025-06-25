import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductoCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

export default function CategoriaPage() {
  const router = useRouter();
  const { nombre } = router.query;
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (nombre) {
      fetch(`http://localhost:3001/productos?categoria=${nombre}`)
        .then((res) => res.json())
        .then((data) => setProductos(data));
    }
  }, [nombre]);

  return (
    <main>
      <Navbar />
      <div className="bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 capitalize">
          📂 {nombre}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </div>
    </main>
  );
}