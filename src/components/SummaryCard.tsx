type Props = {
  title: string;
  value: string;
  subLabel?: string;
  color?: string;
};

const SummaryCard = ({ title, value, subLabel, color }: Props) => {
  return (
    <div className="flex-1 min-w-[250px] bg-white rounded-xl shadow-md p-6 m-2 border border-gray-100">
      <h2 className="text-sm text-gray-500 mb-1">{title}</h2>
      <p
        className="text-2xl font-bold"
        style={{ color: color || '#1d4ed8' }}
      >
        {value}
      </p>
      {subLabel && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
    </div>
  );
};

export default SummaryCard;
