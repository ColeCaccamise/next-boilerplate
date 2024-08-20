'use server';

import { createClient } from './server';

export async function getBearerHeader() {
	const supabase = await createClient();

	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();
	if (error) {
		console.error('Error fetching session:', error);
		return;
	}

	const token = session?.access_token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	return config;
}
