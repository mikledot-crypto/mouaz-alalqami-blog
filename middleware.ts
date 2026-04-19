import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboardPage && !isAuth) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    
    if (isDashboardPage && token?.role === "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
