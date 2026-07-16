const InventoryReport = ({ products }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Inventory Report

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Stock</th>

                        <th>Reserved</th>

                        <th>Available</th>

                    </tr>

                </thead>

                <tbody>

                    {products.map(product => (

                        <tr key={product._id}>

                            <td>{product.name}</td>

                            <td>{product.category}</td>

                            <td>{product.stock}</td>

                            <td>{product.reservedStock}</td>

                            <td>{product.availableStock}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default InventoryReport;