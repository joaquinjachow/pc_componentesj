import { agregarAlCarrito } from '../utils/carrito';

export default function ProductoCard({ producto }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col items-center text-center">
      <img src={producto.imagen} alt={producto.nombre} className="h-40 object-contain mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">{producto.nombre}</h2>
      <p className="text-sm text-gray-500">{producto.desc}</p>
      <span className="mt-1 text-sm text-gray-400 italic">{producto.categoria}</span>
      <p className="text-lg text-green-600 font-bold my-3">${producto.precio}</p>
      <button
        onClick={() => agregarAlCarrito(producto)}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <span className="text-lg">🛒</span>Agregar al carrito
      </button>
    </div>
  );
}