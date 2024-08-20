'use server';

import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

export default async function oauthSignIn() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${process.env.BASE_URL}/dashboard`,
		},
	});

	if (error) {
		console.log(error);
	}

	if (data.url) {
		redirect(data.url);
	}
}
