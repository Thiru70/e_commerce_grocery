const ActiveLocksTable = ({ locks }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-4">

                Active Reservations

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Product</th>

                        <th>Customer</th>

                        <th>Qty</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        locks.map(lock=>(

                            <tr key={lock._id}>

                                <td>{lock.productId?.name}</td>

                                <td>{lock.userId?.name}</td>

                                <td>{lock.quantity}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ActiveLocksTable;