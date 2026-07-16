import { Link } from "react-router-dom";
import ProductGrid from "../products/ProductGrid";

const Deals = () => {
  return (
    <section className="py-16" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <span style={{ color: "#ea580c", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Limited Time
            </span>
            <h2 className="text-4xl font-bold mt-1 text-gray-900">
              🔥 Today&apos;s Best Deals
            </h2>
          </div>
          <Link
            to="/products"
            className="font-semibold flex items-center gap-1 group transition-colors"
            style={{ color: "#059669" }}
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>

        <ProductGrid limit={4} />

      </div>
    </section>
  );
};

export default Deals;
