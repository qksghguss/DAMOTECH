import { items } from "@/data/mockData";
import { formatNumber } from "@/lib/format";

export const dynamic = "force-static";

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">품목</h1>
        <p className="text-sm text-slate-500">코드, 규격, 단위, 최소재고를 관리합니다.</p>
      </header>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table>
          <thead>
            <tr>
              <th>코드</th>
              <th>품명</th>
              <th>규격</th>
              <th>기준단위</th>
              <th>팩 단위</th>
              <th>환산계수</th>
              <th>최소재고</th>
              <th>단가</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="font-mono text-xs">{item.code}</td>
                <td>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                </td>
                <td>{item.spec}</td>
                <td>{item.baseUom}</td>
                <td>{item.packUom}</td>
                <td>{item.packFactor}</td>
                <td>{item.minStock}</td>
                <td>{item.listPrice ? `${formatNumber(item.listPrice)}원` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
