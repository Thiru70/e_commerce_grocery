import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer

} from "recharts";

const RevenueChart = ({ data }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                Weekly Revenue

            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="_id"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line

                        type="monotone"

                        dataKey="revenue"

                        stroke="#10B981"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default RevenueChart;