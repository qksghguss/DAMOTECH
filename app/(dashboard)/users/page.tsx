import { users } from "@/data/mockData";

export const dynamic = "force-static";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">사용자 관리</h1>
        <p className="text-sm text-slate-500">등록된 사용자와 권한을 확인합니다.</p>
      </header>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>공정코드</th>
              <th>권한</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-mono text-xs">{user.username}</td>
                <td>{user.name}</td>
                <td>{user.processCode}</td>
                <td>{user.role}</td>
                <td>{user.active ? "활성" : "비활성"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-md border border-dashed border-brand bg-brand/5 p-4 text-sm text-slate-500">
        실제 운영에서는 Supabase Auth 혹은 Prisma를 통해 사용자 등록/비활성화를 처리합니다.
      </div>
    </div>
  );
}
