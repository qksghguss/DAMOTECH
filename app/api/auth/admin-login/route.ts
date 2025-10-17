import { NextResponse } from "next/server";
import { users } from "@/data/mockData";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body as { password?: string };

  const admin = users.find((candidate) => candidate.role === "ADMIN" && candidate.password === password);

  if (!admin) {
    return NextResponse.json({ message: "invalid admin password" }, { status: 401 });
  }

  const token = Buffer.from(`${admin.username}:${Date.now()}`).toString("base64");

  return NextResponse.json({
    token,
    user: {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
      processCode: admin.processCode
    }
  });
}
