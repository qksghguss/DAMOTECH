import { NextResponse } from "next/server";
import { users } from "@/data/mockData";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body as { username?: string; password?: string };

  const user = users.find((candidate) => candidate.username === username && candidate.password === password && candidate.role === "USER");

  if (!user) {
    return NextResponse.json({ message: "invalid credentials" }, { status: 401 });
  }

  const token = Buffer.from(`${user.username}:${Date.now()}`).toString("base64");

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      processCode: user.processCode
    }
  });
}
