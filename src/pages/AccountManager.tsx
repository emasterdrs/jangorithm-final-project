import React, { useEffect, useState } from 'react';
import BankSelector from '../components/BankSelector';

type Account = {
  owner: string;
  bankName: string;
  nickname: string;
  accountType: string;
  purpose: string;
  previousAmount: number;
  currentAmount: number;
};

const BANKS = [
  { name: '국민은행', logo: '' },
  { name: '신한은행', logo: '' },
  { name: '우리은행', logo: '' },
  { name: '카카오뱅크', logo: '' },
  { name: '토스뱅크', logo: '' },
  { name: '삼성카드', logo: '' },
  { name: '현대카드', logo: '' },
];

const STORAGE_KEY = 'jangorithm_accounts';

const AccountManager: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({
    owner: '',
    bankName: '',
    nickname: '',
    accountType: '',
    purpose: '',
    previousAmount: '',
    currentAmount: '',
  });
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setAccounts(parsed);
        }
      } catch (e) {
        console.error('불러오기 실패:', e);
      }
    }
  }, []);

  // 저장하기
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  }, [accounts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (editIndex !== null) {
      // 수정 저장
      const updated = [...accounts];
      updated[editIndex] = {
        owner: form.owner,
        bankName: form.bankName,
        nickname: form.nickname,
        accountType: form.accountType,
        purpose: form.purpose,
        previousAmount: Number(form.previousAmount),
        currentAmount: Number(form.currentAmount),
      };
      setAccounts(updated);
      setEditIndex(null);
    } else {
      // 새로 추가
      const newAccount: Account = {
        owner: form.owner,
        bankName: form.bankName,
        nickname: form.nickname,
        accountType: form.accountType,
        purpose: form.purpose,
        previousAmount: Number(form.previousAmount),
        currentAmount: Number(form.currentAmount),
      };
      setAccounts((prev) => [...prev, newAccount]);
    }

    // 입력 폼 초기화
    setForm({
      owner: '',
      bankName: '',
      nickname: '',
      accountType: '',
      purpose: '',
      previousAmount: '',
      currentAmount: '',
    });
  };

  const handleDelete = (indexToRemove: number) => {
    const updated = accounts.filter((_, idx) => idx !== indexToRemove);
    setAccounts(updated);
  };

  const handleEdit = (index: number) => {
    const account = accounts[index];
    setForm({
      owner: account.owner,
      bankName: account.bankName,
      nickname: account.nickname,
      accountType: account.accountType,
      purpose: account.purpose,
      previousAmount: account.previousAmount.toString(),
      currentAmount: account.currentAmount.toString(),
    });
    setEditIndex(index);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">카드/계좌 관리</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input type="text" name="owner" placeholder="소속" value={form.owner} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]" />
        <button onClick={() => setIsSelectorOpen(true)} className="bg-gray-100 border px-2 py-1 rounded w-[120px]">
          {form.bankName || '업체명 선택'}
        </button>
        <input type="text" name="nickname" placeholder="약칭" value={form.nickname} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]" />
        <select name="accountType" value={form.accountType} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]">
          <option value="">계좌유형</option>
          <option value="입출금">입출금</option>
          <option value="카드">카드</option>
        </select>
        <select name="purpose" value={form.purpose} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]">
          <option value="">자금용도</option>
          <option value="운영자금">운영자금</option>
          <option value="고정지출">고정지출</option>
          <option value="저축">저축</option>
        </select>
        <input type="number" name="previousAmount" placeholder="전월금액" value={form.previousAmount} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]" />
        <input type="number" name="currentAmount" placeholder="당월금액" value={form.currentAmount} onChange={handleChange} className="border px-2 py-1 rounded w-[120px]" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          {editIndex !== null ? '수정 저장' : '추가'}
        </button>
      </div>

      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">소속</th>
            <th className="border p-2">업체명</th>
            <th className="border p-2">약칭</th>
            <th className="border p-2">계좌유형</th>
            <th className="border p-2">자금용도</th>
            <th className="border p-2">전월금액</th>
            <th className="border p-2">당월금액</th>
            <th className="border p-2">수정</th>
            <th className="border p-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, idx) => (
            <tr key={idx}>
              <td className="border p-2">{acc.owner}</td>
              <td className="border p-2">{acc.bankName}</td>
              <td className="border p-2">{acc.nickname}</td>
              <td className="border p-2">{acc.accountType}</td>
              <td className="border p-2">{acc.purpose}</td>
              <td className="border p-2">{acc.previousAmount.toLocaleString()}</td>
              <td className="border p-2">{acc.currentAmount.toLocaleString()}</td>
              <td className="border p-2 text-center">
                <button onClick={() => handleEdit(idx)} className="text-blue-500 hover:underline text-sm">수정</button>
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => handleDelete(idx)} className="text-red-500 hover:underline text-sm">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isSelectorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow">
            <BankSelector
              banks={BANKS}
              onSelect={(bank) => {
                setForm((prev) => ({ ...prev, bankName: bank.name }));
                setIsSelectorOpen(false);
              }}
            />
            <button onClick={() => setIsSelectorOpen(false)} className="mt-4 text-sm text-gray-600">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
