import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-6">

      <button
        onClick={decrease}
        className="bg-gray-200 w-10 h-10 rounded-lg text-xl hover:bg-gray-300"
      >
        -
      </button>

      <span className="text-xl font-bold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="bg-gray-200 w-10 h-10 rounded-lg text-xl hover:bg-gray-300"
      >
        +
      </button>

    </div>
  );
};

export default QuantitySelector;