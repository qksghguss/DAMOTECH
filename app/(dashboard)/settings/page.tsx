import { settings } from "@/data/mockData";

export const dynamic = "force-static";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">설정</h1>
        <p className="text-sm text-slate-500">원가 방식, 승인 규칙, 알림 채널을 확인합니다.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">원가 방식</h2>
          <p className="mt-2 text-sm text-slate-600">{settings.costingMethod}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">승인 규칙</h2>
          <p className="mt-2 text-sm text-slate-600">{settings.approvalRule}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">안전 재고 정책</h2>
          <p className="mt-2 text-sm text-slate-600">{settings.safetyStockPolicy}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">알림 채널</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {settings.notifications.map((channel) => (
              <li key={channel} className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                {channel}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-md border border-dashed border-brand bg-brand/5 p-4 text-sm text-slate-500">
        실제 환경에서는 Supabase Environment Variables(SUPABASE_URL, SUPABASE_ANON_KEY)를 설정하여 연동합니다.
      </div>
    </div>
  );
}
