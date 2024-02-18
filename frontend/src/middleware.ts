import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const mawiCookie = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME ?? "mawi");

	if (!mawiCookie)
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_FRONTEND_URL}/?logout=true` ?? "http://localhost:4000/?logout=true"
		);

	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*", "/settings/:path*", "/chat/:path*", "/game/:path*"],
};
