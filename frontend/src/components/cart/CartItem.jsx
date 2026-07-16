import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const id = item._id || item.id;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow p-5 mb-5">
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
        />
        <div>
          <h2 className="text-xl font-bold">{item.name}</h2>
          {item.weight && <p className="text-gray-500">{item.weight}</p>}
          <p className="text-emerald-600 font-bold mt-2">₹{item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5 md:mt-0">
        <button
          onClick={() => decreaseQuantity(id)}
          className="bg-gray-200 p-3 rounded"
        >
          <FaMinus />
        </button>
        <span className="font-bold text-lg">{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(id)}
          className="bg-gray-200 p-3 rounded"
        >
          <FaPlus />
        </button>
      </div>

      <div className="mt-5 md:mt-0">
        <h3 className="font-bold text-lg">₹{item.price * item.quantity}</h3>
      </div>

      <button
        onClick={() => removeFromCart(id)}
        className="text-red-500 mt-5 md:mt-0"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default CartItem;
