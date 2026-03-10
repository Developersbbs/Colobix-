import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("colobix_token")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = Number(payload.role); // 1 = admin, 2 = client

    // Client (role 2) trying to access admin
    if (pathname.startsWith("/admin-dashboard") && role !== 1) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin (role 1) trying to access client dashboard
    if (pathname.startsWith("/dashboard") && role !== 2) {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }

  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};