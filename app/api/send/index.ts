'use server';

import ConfirmEmail from '@/emails/confirm-email';
import { Resend } from 'resend';
import LoginEmail from '@/emails/login-email';
import PasswordResetEmail from '@/emails/password-reset-email';
import config from '@/config';
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (
	email: string,
	subject: string,
	template: JSX.Element
) => {
	const { data, error } = await resend.emails.send({
		from: `Payments <payments@mail.colecaccamise.com>`,
		to: [email],
		subject: subject,
		react: template,
	});

	return { data, error };
};

// TRANSACTIONAL
export async function sendConfirmationEmail(
	email: string,
	url: string,
	code: string
) {
	const template = ConfirmEmail({
		email: email,
		url: url,
		validationCode: code,
	});

	const { data: emailData, error: emailError } = await sendEmail(
		email,
		'Confirm your email',
		template
	);

	return emailError ? false : true;
}

export async function sendPasswordResetEmail(
	email: string,
	url: string,
	name?: string
) {
	const template = PasswordResetEmail({
		email: email,
		url: url,
	});

	await sendEmail(email, `Reset your ${config.appName} password`, template);
}

export async function sendLoginEmail(email: string, url: string, code: string) {
	const template = LoginEmail({
		email: email,
		url: url,
		validationCode: code,
	});

	const { data: emailData, error: emailError } = await sendEmail(
		email,
		`Login to Payments`,
		template
	);

	return emailError ? false : true;
}

export default sendEmail;
