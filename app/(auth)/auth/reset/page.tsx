'use client';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { resetPassword } from './actions';
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/logo';
import { useSearchParams } from 'next/navigation';
import toast from '@/lib/toast';
import { isValidEmail } from '@/lib/validation';
import Link from 'next/link';

export default function ResetPasswordPage() {
	const [email, setEmail] = useState('');
	const [submitLoading, setSubmitLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const searchParams = useSearchParams();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!email) return toast('Email is required', 'error');

		if (!isValidEmail(email)) return toast('Invalid email', 'error');

		setSubmitLoading(true);

		try {
			await resetPassword(email);
			toast('Email sent', 'success');
		} catch (error) {
			setSubmitLoading(false);
			return toast('Something went wrong. Please try again.', 'error');
		}

		setSubmitLoading(false);

		setEmailSent(true);
	}

	useEffect(() => {
		const error = searchParams.get('error') || '';

		if (!error) return;

		if (error === 'InvalidOrExpired') {
			toast('Invalid reset link. Please request a new one.', 'error');
		}
	}, [searchParams]);

	if (emailSent) {
		return (
			<>
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col gap-4'>
						<Logo />
						<div className='flex flex-col gap-2'>
							<h2>Check your inbox</h2>
							<p>
								We&apos;ve sent a password reset link to {email} if it&apos;s
								associated with an account.
							</p>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-6 text-center'>
							<Button
								className='w-full'
								type='submit'
								disabled={!email}
								loading={submitLoading}
							>
								Resend email
							</Button>
							<Link
								href='/login'
								className='link-brand'
							>
								Back to login
							</Link>
						</div>
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4'>
					<Logo />
					<div className='flex flex-col gap-2'>
						<h2>Reset your password</h2>
						<p>
							We&apos;ll email instructions to reset your password to your
							account&apos;s email address.
						</p>
					</div>
				</div>
				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit}
				>
					<Input
						type='email'
						placeholder='Enter your email'
						label='Email'
						htmlFor='email-reset'
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<div className='flex flex-col gap-6 text-center'>
						<Button
							className='w-full'
							type='submit'
							disabled={!email}
							loading={submitLoading}
						>
							Send reset instructions
						</Button>
						<Link
							href='/login'
							className='link-brand'
						>
							Back to login
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
