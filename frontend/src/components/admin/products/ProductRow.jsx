import {
    FaEdit,
    FaTrash,
    FaBoxes
} from "react-icons/fa";

const ProductRow = ({
    product,
    onEdit,
    onDelete,
    onRefill
}) => {

    const getStatus = () => {

        if (product.availableStock > 20) {

            return {
                text: "Good",
                color: "bg-green-100 text-green-700"
            };

        }

        if (product.availableStock > 10) {

            return {
                text: "Medium",
                color: "bg-yellow-100 text-yellow-700"
            };

        }

        return {
            text: "Low",
            color: "bg-red-100 text-red-700"
        };

    };

    const status = getStatus();

    return (

        <tr className="border-b hover:bg-gray-50 transition">

            <td className="py-3 text-center">

                <img

                    src={product.image}

                    alt={product.name}

                    className="w-16 h-16 rounded-lg object-cover mx-auto"

                />

            </td>

            <td className="font-semibold">

                {product.name}

            </td>

            <td>

                {product.category}

            </td>

            <td>

                ₹{product.price}

            </td>

            <td className="text-center">

                {product.stock}

            </td>

            <td className="text-center text-orange-600 font-semibold">

                {product.reservedStock}

            </td>

            <td className="text-center text-green-700 font-semibold">

                {product.availableStock}

            </td>

            <td className="text-center">

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                >
                    {status.text}
                </span>

            </td>

            <td>

                <div className="flex justify-center gap-2">

                    <button

                        onClick={onRefill}

                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"

                        title="Refill Inventory"

                    >

                        <FaBoxes />

                    </button>

                    <button

                        onClick={onEdit}

                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"

                        title="Edit Product"

                    >

                        <FaEdit />

                    </button>

                    <button

                        onClick={onDelete}

                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"

                        title="Delete Product"

                    >

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

    );

};

export default ProductRow;