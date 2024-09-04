import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface JwtPayload {
	userId: string;
	userName: string; // Add other fields as needed
}

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const cookie = {
	name: 'session',
	options: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	},
	duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1day')
		.sign(key);
}

export async function decrypt(session) {
	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ['HS256'],
		});
		return payload as JwtPayload;
	} catch (error) {
		return null;
	}
}

export async function createSession(userId: string, userName: string) {
	try {
		const expires = new Date(Date.now() + cookie.duration);
		const session = await encrypt({ userId, userName, expires });

		cookies().set(cookie.name, session, { ...cookie.options, expires });

		return { success: true };
	} catch (error) {
		console.error('Session creation error:', error);
		return { success: false, error };
	}
}

export async function verifySession() {
	try {
		const cookieValue = cookies().get(cookie.name)?.value;
		if (!cookieValue) {
			console.log('no session cookie found');
			return null;
		}

		const session = await decrypt(cookieValue);
		// console.log('Verify Session:', session);

		if (!session?.userId) {
			console.log('not logged in');
			return null;
		}

		return { userId: session.userId, userName: session.userName };
	} catch (error) {
		console.error('Session verification error:', error);
		return null;
	}
}

export async function deleteSession() {
	try {
		cookies().delete(cookie.name);
		return { success: true };
	} catch (error) {
		console.error('Error deleting session:', error);
		return { success: false, error };
		// Handle the error, e.g., redirect to an error page or return an error response
	}
}
