import { NextResponse } from "next/server";
import { settings } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(settings);
}
