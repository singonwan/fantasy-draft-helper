import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './app/_lib/session';

export async function middleware(request: NextRequest) {
	const session = await verifySession();

	const { pathname } = request.nextUrl;

	if (session && (pathname === '/login' || pathname === '/signup')) {
		return NextResponse.redirect(new URL('/myrankings', request.url));
	}

	return NextResponse.next();
}
