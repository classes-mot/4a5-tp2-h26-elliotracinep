import "./Categories.css";

export default function Categories({ categories, setCatActive }) {
  return (
    <div className="tp1-cat">
      <select name="select" onChange={(e) => setCatActive(e.target.value)}>
        <option value="">Tout</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
