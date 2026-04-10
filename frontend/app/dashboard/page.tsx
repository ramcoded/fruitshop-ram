"use client";
import { useEffect, useState } from "react";
import { api, Fruit } from "@/lib/api";
import StatsCard from "@/components/StatsCard";
import { getFruitEmoji } from "@/lib/fruitEmoji";
import Link from "next/link";

export default function DashboardPage() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fruits.getAll().then(setFruits).finally(() => setLoading(false));
  }, []);

  const totalValue = fruits.reduce((sum, f) => sum + f.price * f.weight, 0);
  const avgPrice = fruits.length
    ? fruits.reduce((sum, f) => sum + f.price, 0) / fruits.length
    : 0;
  const mostExpensive = fruits.reduce(
    (max, f) => (f.price > (max?.price ?? 0) ? f : max),
    fruits[0]
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">
            Good morning, Admin 👋
          </h1>
          <p className="text-[#64748b] mt-1">
            Here&apos;s what&apos;s happening in your fruit shop today.
          </p>
        </div>
        <Link
          href="/dashboard/fruits"
          className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
        >
          + Manage Fruits
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          icon="🍎"
          label="Total Fruits"
          value={loading ? "—" : fruits.length}
          sub="varieties in stock"
          color="pink"
        />
        <StatsCard
          icon="💰"
          label="Inventory Value"
          value={loading ? "—" : `$${totalValue.toFixed(2)}`}
          sub="combined stock value"
          color="green"
        />
        <StatsCard
          icon="📊"
          label="Avg. Price"
          value={loading ? "—" : `$${avgPrice.toFixed(2)}`}
          sub="per kilogram"
          color="amber"
        />
        <StatsCard
          icon="⭐"
          label="Premium Pick"
          value={loading || !mostExpensive ? "—" : mostExpensive.name}
          sub="most expensive fruit"
          color="blue"
        />
      </div>

      {/* Recent fruits table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f1f5f9] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#f1f5f9] flex items-center justify-between">
          <h2 className="font-bold text-[#1e293b] text-lg">Recent Inventory</h2>
          <Link
            href="/dashboard/fruits"
            className="text-sm text-[#f43f5e] font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#ffe4e6] border-t-[#f43f5e] rounded-full animate-spin" />
          </div>
        ) : fruits.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-[#64748b] font-medium">No fruits added yet.</p>
            <Link
              href="/dashboard/fruits"
              className="inline-block mt-4 text-sm text-[#f43f5e] font-medium hover:underline"
            >
              Add your first fruit →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#f1f5f9]">
            {fruits.slice(0, 8).map((fruit) => (
              <div
                key={fruit.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fff1f2] flex items-center justify-center text-xl flex-shrink-0">
                  {getFruitEmoji(fruit.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1e293b] capitalize truncate">
                    {fruit.name}
                  </p>
                  <p className="text-xs text-[#64748b]">{fruit.weight} kg</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#f43f5e]">${fruit.price.toFixed(2)}</p>
                  <p className="text-xs text-[#94a3b8]">per kg</p>
                </div>
                <span className="text-xs font-semibold text-[#10b981] bg-[#d1fae5] px-2.5 py-1 rounded-full flex-shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
