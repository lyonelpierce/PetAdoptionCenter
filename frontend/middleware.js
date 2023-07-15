import { NextResponse } from "next/server";

export function middleware(request) {
  // const cookie = request.cookies.get("next-auth.session-token")?.value;
  const cookie = request.cookies.get("__Secure-next-auth.session-token")?.value;
  if (cookie) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/types", "/breeds", "/pets", "/requests"],
};
