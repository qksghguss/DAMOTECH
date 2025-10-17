import { inventory, items } from "@/data/mockData";

export const dynamic = "force-static";

function toPack(qtyBase: number, packFactor: number) {
  const boxes = Math.floor(qtyBase / packFactor);
  const remainder = qtyBase % packFactor;
  return `${boxes} BOX + ${remainder} EA`;
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">재고</h1>
        <p className="text-sm text-slate-500">위치별 재고를 EA/BOX 단위로 확인합니다.</p>
      </header>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table>
          <thead>
            <tr>
              <th>품목</th>
              <th>위치</th>
              <th>재고(EA)</th>
              <th>재고(BOX+EA)</th>
              <th>LOT</th>
              <th>유통기한</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((entry) => {
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
                  <td>{toPack(entry.qtyBase, item.packFactor)}</td>
                  <td>{entry.lotNo ?? "-"}</td>
                  <td>{entry.expiry ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
