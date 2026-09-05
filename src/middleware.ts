import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ADMIN = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN.some((path) => pathname === path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("kw_admin")?.value;
  const secret = process.env.AUTH_SECRET;

  if (!token || !secret) {
    return deny(request, isAdminPage);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return deny(request, isAdminPage);
  }
}

function deny(request: NextRequest, isAdminPage: boolean) {
  if (isAdminPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
