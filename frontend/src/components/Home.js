import { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductCard'
import Navbar from '@/components/Navbar';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const cats = [...new Set(data.map((p) => p.categoria || 'Sin categoría'))];
        setCategorias(cats);
      });
  }, []);

  const filtrarProductos = () => {
    if (!categoriaSeleccionada) return productos;
    return productos.filter((p) => p.categoria === categoriaSeleccionada);
  };

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <main>
      <Navbar />
      <div className="bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🛒 Todos los Productos</h1>
        <div className="mb-6 text-center">
          <label className="mr-2 text-gray-700">Filtrar por categoría:</label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtrarProductos().map((p) => (
            <ProductoCard key={p._id} producto={p} />
          ))}
        </div>
      </div>
    </main>
  );
}