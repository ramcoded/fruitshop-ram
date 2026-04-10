"use client";
import { useEffect, useState } from "react";
import { api, Fruit } from "@/lib/api";
import FruitCard from "@/components/FruitCard";
import AddFruitModal from "@/components/AddFruitModal";
import EditFruitModal from "@/components/EditFruitModal";

export default function FruitsPage() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editFruit, setEditFruit] = useState<Fruit | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    api.fruits.getAll().then(setFruits).finally(() => setLoading(false));
  }, []);

  const filtered = fruits.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this fruit?")) return;
    setDeletingId(id);
    try {
      await api.fruits.delete(id);
      setFruits((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  }

  function handleAdded(fruit: Fruit) {
    setFruits((prev) => [fruit, ...prev]);
  }

  function handleUpdated(updated: Fruit) {
    setFruits((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  }

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e293b]">Fruit Inventory</h1>
          <p className="text-[#64748b] mt-1">
            Manage your fruit products — add, edit, or remove items.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fruits…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all bg-white text-sm"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-[#64748b]">
              {filtered.length} fruit{filtered.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2"
            >
              <span className="text-base">+</span> Add Fruit
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-[#ffe4e6] border-t-[#f43f5e] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-2xl border border-[#f1f5f9]">
            <div className="text-7xl mb-4">{search ? "🔍" : "🍑"}</div>
            <p className="text-[#1e293b] font-semibold text-lg mb-2">
              {search ? "No fruits found" : "No fruits yet"}
            </p>
            <p className="text-[#64748b] mb-6">
              {search
                ? `No results for "${search}"`
                : "Start by adding your first fruit to the inventory."}
            </p>
            {!search && (
              <button
                onClick={() => setShowAdd(true)}
                className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                + Add First Fruit
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((fruit) => (
              <div
                key={fruit.id}
                className={deletingId === fruit.id ? "opacity-50 pointer-events-none" : ""}
              >
                <FruitCard
                  fruit={fruit}
                  onEdit={setEditFruit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAdd && (
        <AddFruitModal onClose={() => setShowAdd(false)} onAdded={handleAdded} />
      )}
      {editFruit && (
        <EditFruitModal
          fruit={editFruit}
          onClose={() => setEditFruit(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  );
}
