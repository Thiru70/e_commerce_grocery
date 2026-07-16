import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ProductInfo from "../../components/products/ProductInfo";
import api from "../../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Product not found.</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl bg-gray-100 p-10 object-contain max-h-96"
            />
          </div>
          <ProductInfo product={product} />
        </div>

        {product.description && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-6">Description</h2>
            <p className="text-gray-600 leading-8">{product.description}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
