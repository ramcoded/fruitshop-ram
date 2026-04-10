import { Fruit } from "@/lib/api";
import { getFruitEmoji } from "@/lib/fruitEmoji";

interface FruitCardProps {
  fruit: Fruit;
  onEdit: (fruit: Fruit) => void;
  onDelete: (id: number) => void;
}

export default function FruitCard({ fruit, onEdit, onDelete }: FruitCardProps) {
  const emoji = getFruitEmoji(fruit.name);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f1f5f9] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">
      {/* Emoji + badge */}
      <div className="flex items-start justify-between">
        <div className="w-16 h-16 rounded-2xl bg-[#fff1f2] flex items-center justify-center text-3xl">
          {emoji}
        </div>
        <span className="text-xs font-semibold text-[#10b981] bg-[#d1fae5] px-2.5 py-1 rounded-full">
          In Stock
        </span>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-bold text-[#1e293b] text-lg capitalize">{fruit.name}</h3>
        <p className="text-sm text-[#64748b] mt-0.5">{fruit.weight} kg per unit</p>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-[#f43f5e]">
          ${fruit.price.toFixed(2)}
        </span>
        <span className="text-xs text-[#94a3b8]">/ kg</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-[#f1f5f9]">
        <button
          onClick={() => onEdit(fruit)}
          className="flex-1 text-sm font-medium text-[#64748b] hover:text-[#f43f5e] hover:bg-[#fff1f2] py-2 rounded-xl transition-all"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(fruit.id!)}
          className="flex-1 text-sm font-medium text-[#64748b] hover:text-red-500 hover:bg-red-50 py-2 rounded-xl transition-all"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
