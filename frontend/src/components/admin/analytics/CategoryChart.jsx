import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer

} from "recharts";

const COLORS = [

    "#10B981",

    "#3B82F6",

    "#F59E0B",

    "#EF4444",

    "#8B5CF6"

];

const CategoryChart = ({ data }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                Categories

            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="total"

                        nameKey="_id"

                        outerRadius={100}

                    >

                        {

                            data.map((entry,index)=>(

                                <Cell

                                    key={index}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default CategoryChart;