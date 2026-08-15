import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "./lib/api-response";

const PUBLIC_API_PATHS = [
  "/api/cookie-consent",
  "/api/products",
  "/api/categories",
  "/api/settings",
  "/api/visitors",
];


export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. API Route Protection & Public Path Pass-through
  if (pathname.startsWith("/api")) {
    if (PUBLIC_API_PATHS.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.API_KEY;

    if (!expectedApiKey) {
      return NextResponse.next();
    }

    if (apiKey !== expectedApiKey) {
      return ApiResponse.error("Unauthorized access.", 401);
    }

    return NextResponse.next();
  }

  // Ignore static assets, next internal routes, images, and studio
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. i18n Subpath Routing (Default EN has NO prefix, Nepali has /ne prefix)
  
  // If request contains explicit /en or /en/..., redirect to clean URL without /en
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const cleanPath = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(new URL(cleanPath, request.url));
  }

  const isNepaliPath = pathname === "/ne" || pathname.startsWith("/ne/");

  // If user visits /ne or /ne/..., REWRITE internally to clean path (e.g. /about) so Next.js renders the page without 404
  if (isNepaliPath) {
    const internalPath = pathname.replace(/^\/ne/, "") || "/";
    const response = NextResponse.rewrite(new URL(internalPath, request.url));
    response.cookies.set("app_language", "ne", { path: "/", maxAge: 31536000, sameSite: "lax" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};