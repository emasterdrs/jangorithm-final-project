import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Expense = {
  id: number;
  date: string;
  category: string;
  amount: number;
  memo: string;
};

type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // ✅ 고정지출 자동 등록
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const fixedExpenses = [
      {
        category: '고정지출',
        memo: '월세',
        amount: 1000000,
        dateDay: 1,
      },
      {
        category: '고정지출',
        memo: '보험료',
        amount: 250000,
        dateDay: 5,
      },
    ];

    const todayString = (day: number) =>
      `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const isAlreadyAdded = (memo: string, day: number) =>
      expenses.some((e) => e.memo === memo && e.date === todayString(day));

    const newFixedExpenses = fixedExpenses
      .filter((f) => f.dateDay === date && !isAlreadyAdded(f.memo, f.dateDay))
      .map((f) => ({
        id: Date.now() + Math.random(),
        date: todayString(f.dateDay),
        category: f.category,
        amount: f.amount,
        memo: f.memo,
      }));

    if (newFixedExpenses.length > 0) {
      setExpenses((prev) => [...prev, ...newFixedExpenses]);
    }
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider');
  }
  return context;
};
