import { NextResponse, NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { isUserAuthenticated } from '@/lib/auth';

export async function middleware(request: NextRequest) {
	await updateSession(request);
	const pathname: string = request.nextUrl.pathname;
	const user = await isUserAuthenticated();

	if (user && pathname === '/') {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	const isAuthRoute =
		pathname.startsWith('/auth/') ||
		pathname.startsWith('/login') ||
		pathname.startsWith('/signup');

	if (user && !isAuthRoute) {
		return;
	}

	if (user && isAuthRoute) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	if (isAuthRoute) {
		return;
	}

	if (!user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Allow access to all other routes
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
