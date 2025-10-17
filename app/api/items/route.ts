import { NextResponse } from "next/server";
import { items } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(items);
}
