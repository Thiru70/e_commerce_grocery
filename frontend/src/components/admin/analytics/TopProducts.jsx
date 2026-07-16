const TopProducts = ({ products }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-4">

                Top Selling Products

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Sold</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map(product=>(

                            <tr key={product._id}>

                                <td>

                                    {product.product.name}

                                </td>

                                <td>

                                    {product.sold}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default TopProducts;