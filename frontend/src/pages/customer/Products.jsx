import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SearchBar from "../../components/products/SearchBar";
import CategoryFilter from "../../components/products/CategoryFilter";
import ProductGrid from "../../components/products/ProductGrid";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-8">All Products</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <CategoryFilter category={category} setCategory={setCategory} />
          </div>
          <ProductGrid search={search} category={category} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
