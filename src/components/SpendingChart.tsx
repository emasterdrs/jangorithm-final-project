import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: {
    date: string;
    amount: number;
  }[];
};

const SpendingChart = ({ data }: Props) => {
  const aggregated = data.reduce((acc: Record<string, number>, cur) => {
    const date = cur.date.slice(5); // MM-DD
    acc[date] = (acc[date] || 0) + cur.amount;
    return acc;
  }, {});

  const chartData = Object.entries(aggregated).map(([date, amount]) => ({
    name: date,
    amount,
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">📊 이달 지출 추이</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
          <Bar dataKey="amount" fill="#818cf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
