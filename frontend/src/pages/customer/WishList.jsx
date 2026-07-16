import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const WishList = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-600">Your wishlist is currently empty.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default WishList;
