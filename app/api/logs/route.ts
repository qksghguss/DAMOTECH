import { NextResponse } from "next/server";
import { logs } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(logs);
}
