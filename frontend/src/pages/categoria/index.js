import { useEffect, useState } from 'react';
import ProductoCard from '@/components/ProductCard';
import FiltroCategoria from '@/components/FiltroCategoria';
import Navbar from '@/components/Navbar';

export default function Categoria() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setFiltrados(data);
        const cats = [...new Set(data.map(p => p.categoria || 'Sin categoría'))];
        setCategorias(cats);
      });
  }, []);

  const filtrar = (categoria) => {
    if (!categoria) {
      setFiltrados(productos);
    } else {
      setFiltrados(productos.filter(p => (p.categoria || 'Sin categoría') === categoria));
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">📂 Filtrar por Categoría</h1>
        <FiltroCategoria categorias={categorias} onSelect={filtrar} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {filtrados.map(p => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </div>
    </main>
  );
}