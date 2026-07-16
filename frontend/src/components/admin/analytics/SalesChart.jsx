import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer

} from "recharts";

const SalesChart = ({ data }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                Monthly Sales

            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="_id"/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar

                        dataKey="revenue"

                        fill="#3B82F6"

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default SalesChart;