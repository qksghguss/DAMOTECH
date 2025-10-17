"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { FiBox, FiGrid, FiList, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { TbReport } from "react-icons/tb";

const navItems = [
  { href: "/dashboard", label: "대시보드", icon: FiGrid },
  { href: "/items", label: "품목", icon: FiBox },
  { href: "/inventory", label: "재고", icon: FiList },
  { href: "/requests", label: "요청", icon: FiUser },
  { href: "/history", label: "이력", icon: TbReport },
  { href: "/users", label: "사용자", icon: FiUsers },
  { href: "/settings", label: "설정", icon: FiSettings }
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Consumable Manager</p>
          <h1 className="text-lg font-bold text-brand-dark">DAMOTECH</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-brand text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          );
        })}
      </nav>
      {user && (
        <div className="mt-6 rounded-md bg-slate-100 p-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">{user.name}</p>
          <p className="text-xs uppercase text-slate-500">{user.role}</p>
          <p className="text-xs text-slate-500">공정코드 {user.processCode}</p>
          <button
            onClick={logout}
            className="mt-3 w-full rounded bg-white px-3 py-2 text-xs font-semibold text-brand hover:bg-slate-200"
          >
            로그아웃
          </button>
        </div>
      )}
    </aside>
  );
}
