import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const IS_MAINTENANCE = process.env.IS_MAINTENANCE;
  if (IS_MAINTENANCE == "true") {
    return NextResponse.json({
      ok: false,
      description:
        "We are so sorry because this time Faqbocs under maintenance.",
    });
  }
}
