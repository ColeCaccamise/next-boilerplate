'use server';

import { sendConfirmationEmail } from '@/app/api/send';
import { createClient } from '@/lib/supabase/server';
import axios from 'axios';
const BASE_URL = process.env.BASE_URL;
const API_BASE_URL = process.env.API_BASE_URL;

export const verifyLoginCode = async (email: string, token: string) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.verifyOtp({
		email,
		token,
		type: 'email',
	});

	if (!error) {
		return;
	}

	throw new Error('Login code invalid or expired');
};

export const resendVerificationEmail = async (email: string) => {
	const supabase = await createClient();

	const userExists = await axios
		.get(`${API_BASE_URL}/users/?by=email&value=${email}`)
		.then((res) => res.data?.length > 0)
		.catch(() => {
			throw new Error('There was an error sending the email. Please try again');
		});

	if (userExists) {
		throw new Error(
			'Email already confirmed. Reset your password if you have trouble logging in.'
		);
	}

	const { data, error } = await supabase.auth.admin.generateLink({
		type: 'recovery',
		email,
	});

	if (error) {
		return;
	}

	const { hashed_token, email_otp: code } = data.properties;
	const url = `${BASE_URL}/auth/confirm?token=${hashed_token}&type=recovery`;

	sendConfirmationEmail(email, url, code);

	return;
};
