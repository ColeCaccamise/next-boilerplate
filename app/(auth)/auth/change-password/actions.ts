'use server';

import { createClient } from '@/lib/supabase/server';
import { validatePassword } from '@/lib/validation';

export async function changePassword(
	password: string,
	confirmPassword: string,
	token: string,
	type: string
) {
	if (password !== confirmPassword) {
		throw new Error('Passwords do not match.');
	}

	if (type !== 'recovery') {
		throw new Error('Invalid token. Please request a new reset email.');
	}

	if (password.length < 8) {
		throw new Error('Password must be at least 8 characters long.');
	}

	validatePassword(password);

	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.verifyOtp({
		token_hash: token,
		type: 'recovery',
	});

	if (error) {
		throw new Error('Token is invalid or expired.');
	}

	const { data: updateData, error: updateError } =
		await supabase.auth.admin.updateUserById(user?.id || '', {
			password: password,
		});

	if (updateError) {
		console.log(error);
		throw new Error('Invalid token. Please request a new reset email.');
	}

	return updateData;
}
