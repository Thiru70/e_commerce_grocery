import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", orders: 20 },
  { day: "Tue", orders: 35 },
  { day: "Wed", orders: 42 },
  { day: "Thu", orders: 28 },
  { day: "Fri", orders: 50 },
  { day: "Sat", orders: 63 },
  { day: "Sun", orders: 55 },
];

const OrdersChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-5">
        Weekly Orders
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="orders"
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default OrdersChart;