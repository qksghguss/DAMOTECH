import { NextResponse } from "next/server";
import { inventory } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(inventory);
}
