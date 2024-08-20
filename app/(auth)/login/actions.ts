'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { sendConfirmationEmail } from '@/app/api/send';
import { isValidEmail } from '@/lib/validation';
const BASE_URL = process.env.BASE_URL;

export async function signIn(email: string, password: string) {
	'use server';

	if (!email) {
		throw new Error('Email is required');
	}

	if (!password) {
		throw new Error('Password is required');
	}

	if (!isValidEmail(email)) {
		throw new Error('Invalid email address');
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		if (error.status === 400 && error.message === 'Email not confirmed') {
			const { data: linkData, error: linkError } =
				await supabase.auth.admin.generateLink({
					type: 'signup',
					email: email,
					password: password,
				});

			if (linkError) {
				throw new Error('Something went wrong. Please try again.');
			}

			const url = `${BASE_URL}/auth/confirm?token_hash=${linkData.properties?.hashed_token}&type=signup`;
			const code = linkData?.properties?.email_otp;

			sendConfirmationEmail(email, url, code);
			return redirect(`/auth/confirm-email?email=${encodeURIComponent(email)}`);
		}

		throw new Error('Invalid login credentials');
	} else {
		return redirect('/dashboard');
	}
}

export async function generateMagicLink(email: string, password: string) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.admin.generateLink({
		type: 'signup',
		email: email,
		password: password,
	});

	if (error) {
		throw new Error('Could not generate magic link.');
	}

	const token = data?.properties?.hashed_token;
	const code = data?.properties?.email_otp;
	const id = data?.user?.id;

	const url = `${process.env.BASE_URL}/auth/confirm?token_hash=${token}&type=email`;

	return { url, code, id };
}
