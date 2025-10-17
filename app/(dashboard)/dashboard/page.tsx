import { StatCard } from "@/components/StatCard";
import { inventory, items, logs, requests } from "@/data/mockData";
import { formatDate } from "@/lib/format";

export const dynamic = "force-static";

export default function DashboardPage() {
  const lowStockItems = inventory.filter((entry) => {
    const item = items.find((itm) => itm.id === entry.itemId);
    if (!item) return false;
    return entry.qtyBase < item.minStock;
  });

  const pendingRequests = requests.filter((request) =>
    ["요청됨", "준비중", "승인", "발주"].includes(request.status)
  );

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
          <p className="text-sm text-slate-500">재고 부족 알림과 대기 중인 요청을 한눈에 확인하세요.</p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="총 품목" value={items.length} description="등록된 품목 수" />
        <StatCard title="대기 요청" value={pendingRequests.length} description="승인/처리 대기" />
        <StatCard
          title="재고 부족"
          value={lowStockItems.length}
          description="최소재고 미만 품목"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">재고 부족 품목</h2>
          <p className="mb-4 text-sm text-slate-500">최소재고 이하인 품목을 확인하세요.</p>
          <table>
            <thead>
              <tr>
                <th>품목</th>
                <th>위치</th>
                <th>현재 재고(EA)</th>
                <th>최소 재고</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-slate-400">
                    모든 품목이 최소 재고 이상입니다.
                  </td>
                </tr>
              )}
              {lowStockItems.map((entry) => {
                const item = items.find((itm) => itm.id === entry.itemId);
                if (!item) return null;
                return (
                  <tr key={entry.id}>
                    <td>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.spec}</p>
                    </td>
                    <td>{entry.location}</td>
                    <td>{entry.qtyBase}</td>
                    <td>{item.minStock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">최근 활동</h2>
          <p className="mb-4 text-sm text-slate-500">요청, 승인, 지급, 입고 등 주요 이력</p>
          <ul className="space-y-3">
            {logs.map((log) => (
              <li key={log.id} className="rounded-md border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-800">{log.message}</p>
                <p className="text-xs text-slate-500">{formatDate(log.createdAt)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
