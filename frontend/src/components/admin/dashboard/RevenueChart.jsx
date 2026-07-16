import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 18000 },
  { day: "Wed", revenue: 22000 },
  { day: "Thu", revenue: 19000 },
  { day: "Fri", revenue: 27000 },
  { day: "Sat", revenue: 31000 },
  { day: "Sun", revenue: 29000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-5">
        Weekly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;