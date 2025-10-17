"use client";

import { useAuth } from "@/context/AuthContext";
import { items, requests as seedRequests } from "@/data/mockData";
import { formatDate, formatNumber } from "@/lib/format";
import { useMemo, useState } from "react";

type RequestForm = {
  type: "ISSUE" | "PURCHASE";
  itemId?: string;
  freeItemName?: string;
  qty: number;
  uom: "EA" | "BOX";
  proposedPrice?: number;
  linkUrl?: string;
  reason?: string;
};

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(seedRequests);
  const [form, setForm] = useState<RequestForm>({ type: "ISSUE", qty: 1, uom: "EA" });
  const [message, setMessage] = useState<string | null>(null);

  const isIssue = form.type === "ISSUE";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    if (isIssue && !form.itemId) {
      setMessage("지급 요청은 품목을 선택해야 합니다.");
      return;
    }

    if (form.type === "PURCHASE" && !form.freeItemName) {
      setMessage("구매 요청은 품명을 입력해야 합니다.");
      return;
    }

    const newRequest = {
      id: `req-${requests.length + 1}`,
      type: form.type,
      requesterId: user.id,
      itemId: isIssue ? form.itemId : undefined,
      freeItemName: !isIssue ? form.freeItemName : undefined,
      qty: form.qty,
      uom: form.uom,
      proposedPrice: form.proposedPrice,
      linkUrl: form.linkUrl,
      status: form.type === "ISSUE" ? "요청됨" : "요청됨",
      createdAt: new Date().toISOString()
    } as const;
    setRequests([newRequest, ...requests]);
    setMessage("요청이 임시 데이터에 추가되었습니다. 실제 API 연동 시 저장됩니다.");
    setForm({ type: form.type, qty: 1, uom: "EA" });
  };

  const issueRequests = useMemo(
    () => requests.filter((request) => request.type === "ISSUE"),
    [requests]
  );
  const purchaseRequests = useMemo(
    () => requests.filter((request) => request.type === "PURCHASE"),
    [requests]
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">요청</h1>
        <p className="text-sm text-slate-500">지급 요청과 구매 요청을 생성하고 현황을 확인하세요.</p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">새 요청</h2>
        <p className="text-sm text-slate-500">입력된 내용은 클라이언트 상태에 저장되며, API 연동 시 서버로 전송됩니다.</p>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="md:col-span-2 flex gap-3 text-sm">
            <label className={`flex-1 cursor-pointer rounded-md border px-3 py-2 text-center ${
              form.type === "ISSUE" ? "border-brand bg-brand/10" : "border-slate-200"
            }`}>
              <input
                type="radio"
                name="type"
                value="ISSUE"
                className="hidden"
                checked={form.type === "ISSUE"}
                onChange={() => setForm({ ...form, type: "ISSUE", itemId: undefined, freeItemName: undefined })}
              />
              지급 요청
            </label>
            <label className={`flex-1 cursor-pointer rounded-md border px-3 py-2 text-center ${
              form.type === "PURCHASE" ? "border-brand bg-brand/10" : "border-slate-200"
            }`}>
              <input
                type="radio"
                name="type"
                value="PURCHASE"
                className="hidden"
                checked={form.type === "PURCHASE"}
                onChange={() => setForm({ ...form, type: "PURCHASE", itemId: undefined })}
              />
              구매 요청
            </label>
          </div>

          {isIssue ? (
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">품목</label>
              <select
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
                value={form.itemId ?? ""}
                onChange={(event) => setForm({ ...form, itemId: event.target.value })}
              >
                <option value="" disabled>
                  품목을 선택하세요
                </option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.spec})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">품명</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
                value={form.freeItemName ?? ""}
                onChange={(event) => setForm({ ...form, freeItemName: event.target.value })}
                placeholder="예: 전동 드라이버"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">수량</label>
            <input
              type="number"
              min={1}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
              value={form.qty}
              onChange={(event) => setForm({ ...form, qty: Number(event.target.value) })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">단위</label>
            <select
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
              value={form.uom}
              onChange={(event) => setForm({ ...form, uom: event.target.value as "EA" | "BOX" })}
            >
              <option value="EA">EA</option>
              <option value="BOX">BOX</option>
            </select>
          </div>

          {!isIssue && (
            <>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">예상 단가 (선택)</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
                  value={form.proposedPrice ?? ""}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      proposedPrice: event.target.value === "" ? undefined : Number(event.target.value)
                    })
                  }
                  placeholder="숫자만 입력"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">상품 링크 (선택)</label>
                <input
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
                  value={form.linkUrl ?? ""}
                  onChange={(event) =>
                    setForm({ ...form, linkUrl: event.target.value === "" ? undefined : event.target.value })
                  }
                  placeholder="https://"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase text-slate-500">사유 (선택)</label>
                <textarea
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:border-brand focus:outline-none"
                  rows={3}
                  value={form.reason ?? ""}
                  onChange={(event) =>
                    setForm({ ...form, reason: event.target.value === "" ? undefined : event.target.value })
                  }
                  placeholder="필요 사유를 입력하세요"
                />
              </div>
            </>
          )}

          {message && (
            <p className="md:col-span-2 text-sm text-brand-dark">{message}</p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-white shadow hover:bg-brand-dark"
            >
              요청 등록
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">지급 요청</h2>
          <p className="mb-4 text-sm text-slate-500">상태: 요청됨 → 준비중 → 지급완료 → 반려</p>
          <table>
            <thead>
              <tr>
                <th>요청일</th>
                <th>품목</th>
                <th>수량</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {issueRequests.map((request) => {
                const item = items.find((itm) => itm.id === request.itemId);
                return (
                  <tr key={request.id}>
                    <td>{formatDate(request.createdAt)}</td>
                    <td>{item ? `${item.name} (${item.spec})` : "-"}</td>
                    <td>
                      {request.qty} {request.uom}
                    </td>
                    <td>{request.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">구매 요청</h2>
          <p className="mb-4 text-sm text-slate-500">상태: 요청됨 → 승인 → 발주 → 입고완료</p>
          <table>
            <thead>
              <tr>
                <th>요청일</th>
                <th>품명</th>
                <th>수량</th>
                <th>예상 단가</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRequests.map((request) => (
                <tr key={request.id}>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>{request.freeItemName ?? "-"}</td>
                  <td>
                    {request.qty} {request.uom}
                  </td>
                  <td>{request.proposedPrice ? `${formatNumber(request.proposedPrice)}원` : "-"}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
