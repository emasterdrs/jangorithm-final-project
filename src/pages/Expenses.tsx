import { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

const Expenses = () => {
  const { expenses, setExpenses } = useExpenseContext();

  const [form, setForm] = useState({
    date: '',
    category: '',
    amount: '',
    memo: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };
    setExpenses((prev) => [...prev, newExpense]);
    setForm({ date: '', category: '', amount: '', memo: '' });
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filtered = expenses
    .filter((e) => (selectedCategory === '전체' ? true : e.category === selectedCategory))
    .filter((e) => (selectedMonth ? e.date.startsWith(selectedMonth) : true));

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">지출 입력</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1 text-gray-600">월 필터</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">카테고리 필터</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          >
            <option value="전체">전체</option>
            <option value="식비">식비</option>
            <option value="쇼핑">쇼핑</option>
            <option value="교통">교통</option>
            <option value="고정지출">고정지출</option>
          </select>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-end mb-6 bg-gray-50 p-4 rounded border border-gray-200"
      >
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 w-[150px]"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 w-[150px]"
        >
          <option value="">항목 선택</option>
          <option value="식비">식비</option>
          <option value="쇼핑">쇼핑</option>
          <option value="교통">교통</option>
          <option value="고정지출">고정지출</option>
        </select>
        <input
          name="amount"
          type="number"
          placeholder="금액"
          value={form.amount}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 w-[150px]"
        />
        <input
          name="memo"
          type="text"
          placeholder="메모"
          value={form.memo}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-[200px]"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          추가
        </button>
      </form>

      <ul className="space-y-2">
        {filtered.map((e) => (
          <li
            key={e.id}
            className="flex justify-between items-center p-3 border rounded bg-white shadow-sm"
          >
            <div className="text-sm text-gray-700">
              📅 {e.date} | 🏷️ {e.category} | 💰 ₩{e.amount.toLocaleString()} | 📝 {e.memo}
            </div>
            <button
              onClick={() => handleDelete(e.id)}
              className="text-red-500 hover:text-red-700 ml-2 text-sm"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right font-semibold text-gray-700">
        총 지출: ₩{total.toLocaleString()}
      </div>
    </div>
  );
};

export default Expenses;
