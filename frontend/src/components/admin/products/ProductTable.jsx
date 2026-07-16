import ProductRow from "./ProductRow";

const ProductTable = ({
    products,
    onEdit,
    onDelete,
    onRefill
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-emerald-600 text-white">

                    <tr>

                        <th className="py-4">Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Reserved</th>
                        <th>Available</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <ProductRow

                            key={product._id}

                            product={product}

                            onEdit={() => onEdit(product)}

                            onDelete={() => onDelete(product._id)}

                            onRefill={() => onRefill(product)}

                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default ProductTable;