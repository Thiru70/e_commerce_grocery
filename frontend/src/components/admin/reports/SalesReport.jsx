const SalesReport = ({ report }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Sales Report

            </h2>

            <div className="grid grid-cols-3 gap-5 mb-5">

                <div className="bg-emerald-100 rounded-lg p-5">

                    <h3>Total Revenue</h3>

                    <p className="text-3xl font-bold">

                        ₹{report.totalRevenue}

                    </p>

                </div>

                <div className="bg-blue-100 rounded-lg p-5">

                    <h3>Total Orders</h3>

                    <p className="text-3xl font-bold">

                        {report.totalOrders}

                    </p>

                </div>

                <div className="bg-yellow-100 rounded-lg p-5">

                    <h3>Average Order</h3>

                    <p className="text-3xl font-bold">

                        ₹{
                            report.totalOrders
                                ? (
                                    report.totalRevenue /
                                    report.totalOrders
                                  ).toFixed(2)
                                : 0
                        }

                    </p>

                </div>

            </div>

        </div>

    );

};

export default SalesReport;