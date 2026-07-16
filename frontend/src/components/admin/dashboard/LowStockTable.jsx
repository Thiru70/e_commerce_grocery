const LowStockTable = ({ products }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-4">

                Low Stock Products

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Product</th>

                        <th>Available</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map(product=>(

                            <tr key={product._id}>

                                <td>{product.name}</td>

                                <td>{product.availableStock}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default LowStockTable;