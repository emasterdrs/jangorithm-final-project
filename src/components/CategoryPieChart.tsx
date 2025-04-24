import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: {
    [key: string]: number;
  };
};

const COLORS = ['#a78bfa', '#86efac', '#facc15', '#f87171', '#60a5fa', '#f472b6'];

const CategoryPieChart = ({ data }: Props) => {
  const total = Object.values(data).reduce((sum, v) => sum + v, 0);
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(0),
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">📈 카테고리별 지출 비중</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${percent}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
