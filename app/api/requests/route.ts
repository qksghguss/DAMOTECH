import { NextResponse } from "next/server";
import { requests } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(requests);
}
