'use server';

import { sendPasswordResetEmail } from '@/app/api/send';
import { createClient } from '@/lib/supabase/server';

export async function resetPassword(email: string) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.admin.generateLink({
		type: 'recovery',
		email: email,
	});

	if (error) return;

	if (data) {
		const url = `${process.env.BASE_URL}/auth/change-password?token_hash=${data.properties?.hashed_token}&type=recovery`;

		await sendPasswordResetEmail(email, url);
	}
}
