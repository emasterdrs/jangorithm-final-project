import SummaryCard from '../components/SummaryCard';
import SpendingChart from '../components/SpendingChart';
import CategoryPieChart from '../components/CategoryPieChart';
import { useExpenseContext } from '../context/ExpenseContext';

const Dashboard = () => {
  const { expenses } = useExpenseContext();

  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // 예: 2025-04
  const thisMonthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth));
  const totalSpent = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryMap: { [key: string]: number } = {};
  thisMonthExpenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const MONTHLY_BUDGET = 4000000;
  const isOver = totalSpent > MONTHLY_BUDGET;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">잔고리즘 대시보드</h1>

      <div className="flex flex-wrap gap-4">
        <SummaryCard
          title="전체 자산"
          value="₩12,350,000"
          subLabel="가정용 ₩8,250,000 / 사업용 ₩4,100,000"
        />
        <SummaryCard
          title="이달 총 지출"
          value={`₩${totalSpent.toLocaleString()}`}
          subLabel={
            isOver
              ? `⚠️ 예산 초과! (${(totalSpent - MONTHLY_BUDGET).toLocaleString()}원)`
              : `예산의 ${(totalSpent / MONTHLY_BUDGET * 100).toFixed(1)}% 사용`
          }
          color={isOver ? '#ef4444' : '#f97316'}
        />
        <SummaryCard
          title="TOP 지출 항목"
          value={
            topCategories[0]
              ? `${topCategories[0][0]} ₩${topCategories[0][1].toLocaleString()}`
              : '-'
          }
          subLabel={
            topCategories.length > 1
              ? `${topCategories[1][0]} ₩${topCategories[1][1].toLocaleString()} / ${topCategories[2]?.[0] || ''} ₩${topCategories[2]?.[1]?.toLocaleString() || ''}`
              : '데이터 부족'
          }
          color="#facc15"
        />
        <SummaryCard
          title="예정된 고정 지출"
          value="₩1,000,000"
          subLabel="월세 1일 / 보험료 5일 자동등록"
          color="#3b82f6"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <SpendingChart data={thisMonthExpenses} />
        <CategoryPieChart data={categoryMap} />
      </div>
    </div>
  );
};

export default Dashboard;
