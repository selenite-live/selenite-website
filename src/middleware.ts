import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import Subdomains from "@/services/subdomains";

export const config: MiddlewareConfig = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

async function middleware(req: NextRequest): Promise<NextResponse> {
  const requestUrl: NextURL = req.nextUrl;
  const hostname: string | undefined = req.headers
    .get("host")
    ?.replace("localhost:3000", `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const params: string = requestUrl.searchParams.toString();
  const path = `${requestUrl.pathname}${params.length > 0 ? `?${params}` : ""}`;

  if (!hostname) throw new Error("No hostname found");

  for (const subdomain of Subdomains.getSubdomains()) {
    if (Subdomains.isValidSubdomain(subdomain, hostname))
      return NextResponse.rewrite(Subdomains.buildSubdomainUrl(subdomain, path, requestUrl.href));
  }

  throw new Error("No existing subdomain found");
}

export default middleware;
