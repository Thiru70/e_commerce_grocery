import { Link } from "react-router-dom";

const categories = [
  { name: "Vegetables", emoji: "🥦", gradient: "linear-gradient(135deg, #4ade80, #16a34a)" },
  { name: "Fruits", emoji: "🍎", gradient: "linear-gradient(135deg, #fb7185, #e11d48)" },
  { name: "Dairy", emoji: "🥛", gradient: "linear-gradient(135deg, #60a5fa, #2563eb)" },
  { name: "Bakery", emoji: "🍞", gradient: "linear-gradient(135deg, #fbbf24, #ea580c)" },
  { name: "Rice", emoji: "🍚", gradient: "linear-gradient(135deg, #fde68a, #f59e0b)" },
  { name: "Beverages", emoji: "🧃", gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)" },
  { name: "Snacks", emoji: "🍿", gradient: "linear-gradient(135deg, #fb923c, #dc2626)" },
  { name: "Household", emoji: "🏠", gradient: "linear-gradient(135deg, #2dd4bf, #0891b2)" },
];

const Categories = () => {
  return (
    <section style={{ background: "#fff" }} className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <span style={{ color: "#059669", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Categories
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Browse our wide selection of fresh groceries organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "#f9fafb",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.boxShadow = "0 15px 35px -5px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f9fafb";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: category.gradient,
                  boxShadow: "0 4px 15px -3px rgba(0,0,0,0.15)",
                }}
              >
                {category.emoji}
              </div>
              <h3 className="font-semibold text-sm text-gray-700 text-center group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;