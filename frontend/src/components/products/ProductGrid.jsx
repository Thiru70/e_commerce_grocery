import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "./ProductCard";

const ProductGrid = ({ search = "", category = "", limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const pageLimit = limit || 12;
        const res = await api.get(
          `/products?page=${page}&limit=${pageLimit}&search=${search}&category=${category}`
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, search, category, limit]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div
          className="w-10 h-10 rounded-full animate-spin"
          style={{
            border: "4px solid #d1fae5",
            borderTopColor: "#059669",
          }}
        />
      </div>
    );

  if (!products.length)
    return (
      <div className="text-center py-16">
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
        <p className="text-lg font-medium" style={{ color: "#9ca3af" }}>No products found</p>
        <p className="text-sm mt-1" style={{ color: "#d1d5db" }}>Try adjusting your search or filters</p>
      </div>
    );

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {!limit && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
            style={{
              border: "1px solid #e5e7eb",
              background: "#fff",
              opacity: page === 1 ? 0.4 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >
            ← Prev
          </button>
          <span
            className="px-4 py-2 font-semibold text-sm rounded-lg"
            style={{ background: "#f3f4f6", color: "#6b7280" }}
          >
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
            style={{
              border: "1px solid #e5e7eb",
              background: "#fff",
              opacity: page === totalPages ? 0.4 : 1,
              cursor: page === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
