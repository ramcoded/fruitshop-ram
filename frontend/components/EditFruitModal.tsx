"use client";
import { useState } from "react";
import { api, Fruit } from "@/lib/api";
import { getFruitEmoji } from "@/lib/fruitEmoji";

interface Props {
  fruit: Fruit;
  onClose: () => void;
  onUpdated: (fruit: Fruit) => void;
}

export default function EditFruitModal({ fruit, onClose, onUpdated }: Props) {
  const [name, setName] = useState(fruit.name);
  const [weight, setWeight] = useState(String(fruit.weight));
  const [price, setPrice] = useState(String(fruit.price));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const updated = await api.fruits.update(fruit.id!, {
        name: name.trim(),
        weight: parseFloat(weight),
        price: parseFloat(price),
      });
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update fruit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#fff1f2] flex items-center justify-center text-2xl">
            {getFruitEmoji(fruit.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1e293b]">Edit Fruit</h2>
            <p className="text-sm text-[#64748b] capitalize">{fruit.name}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-[#94a3b8] hover:text-[#1e293b] text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-[#fff1f2] border border-[#fecdd3] text-[#f43f5e] text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
              Fruit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                Weight (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#e2e8f0] text-[#64748b] font-medium hover:bg-[#f8fafc] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] disabled:opacity-60 text-white font-semibold transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
