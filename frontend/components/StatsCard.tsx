interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  color: "pink" | "green" | "amber" | "blue";
}

const colorMap = {
  pink: {
    bg: "bg-[#fff1f2]",
    icon: "bg-[#f43f5e]",
    text: "text-[#f43f5e]",
  },
  green: {
    bg: "bg-[#d1fae5]",
    icon: "bg-[#10b981]",
    text: "text-[#10b981]",
  },
  amber: {
    bg: "bg-[#fef3c7]",
    icon: "bg-[#f59e0b]",
    text: "text-[#f59e0b]",
  },
  blue: {
    bg: "bg-[#dbeafe]",
    icon: "bg-[#3b82f6]",
    text: "text-[#3b82f6]",
  },
};

export default function StatsCard({ icon, label, value, sub, color }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f1f5f9] flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-[#64748b] font-medium">{label}</p>
        <p className="text-2xl font-bold text-[#1e293b] leading-tight">{value}</p>
        {sub && <p className={`text-xs font-medium mt-0.5 ${c.text}`}>{sub}</p>}
      </div>
    </div>
  );
}
