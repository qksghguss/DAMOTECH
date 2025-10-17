"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setError("관리자 인증에 실패했습니다.");
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { token: string; user: any };
    login(data);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-light/20 to-brand/10">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">관리자 로그인</h1>
        <p className="mt-2 text-sm text-slate-500">
          테스트 비밀번호는 <span className="font-semibold text-brand">admin123</span> 입니다.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">관리자 비밀번호</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-white shadow hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
        <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
          일반 사용자라면 <a href="/login">사용자 로그인</a>을 이용하세요.
        </div>
      </div>
    </div>
  );
}
