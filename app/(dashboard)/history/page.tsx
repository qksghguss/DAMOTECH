import { issues, logs, purchases, receipts, requests, items } from "@/data/mockData";
import { formatDate, formatNumber } from "@/lib/format";

export const dynamic = "force-static";

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">이력</h1>
        <p className="text-sm text-slate-500">요청, 승인, 지급, 입고 내역을 조회합니다.</p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">요청 이력</h2>
        <table className="mt-3">
          <thead>
            <tr>
              <th>요청일</th>
              <th>유형</th>
              <th>상세</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const item = items.find((candidate) => candidate.id === request.itemId);
              return (
                <tr key={request.id}>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>{request.type === "ISSUE" ? "지급" : "구매"}</td>
                  <td>
                    {request.type === "ISSUE"
                      ? `${item?.name ?? "-"} ${request.qty}${request.uom}`
                      : `${request.freeItemName ?? "-"} ${request.qty}${request.uom}`}
                  </td>
                  <td>{request.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">지급 처리</h2>
          <table className="mt-3">
            <thead>
              <tr>
                <th>지급일</th>
                <th>품목</th>
                <th>지급수량</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => {
                const request = requests.find((candidate) => candidate.id === issue.requestId);
                const item = items.find((candidate) => candidate.id === request?.itemId);
                return (
                  <tr key={issue.id}>
                    <td>{formatDate(issue.issuedAt)}</td>
                    <td>{item?.name ?? "-"}</td>
                    <td>{issue.issuedQty} EA</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">구매 처리</h2>
          <table className="mt-3">
            <thead>
              <tr>
                <th>상태</th>
                <th>품명</th>
                <th>발주수량</th>
                <th>입고</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => {
                const request = requests.find((candidate) => candidate.id === purchase.requestId);
                const receipt = receipts.find((item) => item.purchaseId === purchase.id);
                return (
                  <tr key={purchase.id}>
                    <td>{purchase.status}</td>
                    <td>{request?.freeItemName ?? "-"}</td>
                    <td>{purchase.orderedQty}</td>
                    <td>
                      {receipt
                        ? `${formatDate(receipt.receivedAt)} / ${receipt.receivedQty}EA / ${formatNumber(receipt.unitCost ?? 0)}원`
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">감사 로그</h2>
        <ul className="mt-4 space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="rounded-md border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-800">{log.message}</p>
              <p className="text-xs text-slate-500">{formatDate(log.createdAt)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
