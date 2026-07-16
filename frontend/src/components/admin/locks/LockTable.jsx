import Countdown from "./Countdown";

const LockTable = ({

    locks,

    onRelease

}) => {

    return (

        <table className="w-full bg-white shadow rounded-xl">

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Customer</th>

                    <th>Qty</th>

                    <th>Remaining</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {locks.map((lock)=>(

                    <tr key={lock._id}>

                        <td>

                            {lock.productId?.name}

                        </td>

                        <td>

                            {lock.userId?.name}

                        </td>

                        <td>

                            {lock.quantity}

                        </td>

                        <td>

                            <Countdown

                                expiresAt={lock.expiresAt}

                            />

                        </td>

                        <td>

                            {lock.status}

                        </td>

                        <td>

                            <button

                                onClick={()=>onRelease(lock)}

                                className="bg-red-500 text-white px-3 py-2 rounded"

                            >

                                Release

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

};

export default LockTable;