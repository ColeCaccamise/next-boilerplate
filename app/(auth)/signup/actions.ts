'use server';

import { redirect } from 'next/navigation';
import { sendConfirmationEmail } from '@/app/api/send/';
import { validatePassword, validateEmail } from '@/lib/validation';
import { createClient } from '@/lib/supabase/server';
import axios from 'axios';
const BASE_URL = process.env.BASE_URL;
const API_BASE_URL = process.env.API_BASE_URL;
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;

export const signUp = async (name: string, email: string, password: string) => {
	validateEmail(email);
	validatePassword(password);

	const existingUser = await axios.get(
		`${API_BASE_URL}/users?by=email&value=${email}`
	);

	if (existingUser.data.length > 0) {
		throw new Error('Email taken.');
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.admin.generateLink({
		type: 'signup',
		email: email,
		password: password,
	});

	if (error) {
		if (error.code === 'email_exists') throw new Error('Email taken.');

		throw new Error('Could not create your account. Please try again.');
	}

	const user = await axios
		.post(`${API_BASE_URL}/users`, {
			email,
			name,
			user_id: data.user.id,
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.log(error);
			throw new Error('Could not create your account. Please try again.');
		});

	await supabase.auth.getUser();

	const { error: updateError } = await supabase.auth.admin.updateUserById(
		data.user.id,
		{
			user_metadata: { user_id: user.id },
		}
	);

	if (updateError) {
		throw new Error(
			`Your account was created, but there was a problem on our end. Please reach out to support at ${SUPPORT_EMAIL}`
		);
	}

	const url = `${BASE_URL}/auth/confirm?token_hash=${data.properties?.hashed_token}&type=signup`;
	const code = data.properties.email_otp;

	await sendConfirmationEmail(email, url, code);

	return redirect(
		`/auth/confirm-email?email=${encodeURIComponent(email)}&from=signup`
	);
};
