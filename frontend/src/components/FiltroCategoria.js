export default function FiltroCategoria({ categorias, onSelect }) {
  return (
    <div className="mb-6 text-center">
      <label className="block mb-2 font-medium">Seleccioná una categoría:</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">Todas</option>
        {categorias.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}