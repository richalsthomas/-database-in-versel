import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.headers.get("Authorization");

  if (!auth || auth !== "Bearer 123456") {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/api/test/:testId"],
};
