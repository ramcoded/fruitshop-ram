"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/fruits", label: "Fruits", icon: "🍎" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#f1f5f9] flex flex-col shadow-sm">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f43f5e] flex items-center justify-center text-xl shadow-md">
            🍓
          </div>
          <div>
            <p className="font-bold text-[#1e293b] text-base leading-tight">FruitShop</p>
            <p className="text-xs text-[#f43f5e] font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 text-[10px] font-semibold text-[#64748b] uppercase tracking-widest mb-3">
          Menu
        </p>
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-[#fff1f2] text-[#f43f5e] shadow-sm"
                  : "text-[#64748b] hover:bg-[#fafafa] hover:text-[#1e293b]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-3 pb-6">
        <div className="bg-[#fff1f2] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f43f5e] flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1e293b] truncate">Admin</p>
            <p className="text-xs text-[#64748b] truncate">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-[#64748b] hover:text-[#f43f5e] transition-colors text-lg"
          >
            ⏻
          </button>
        </div>
      </div>
    </aside>
  );
}
