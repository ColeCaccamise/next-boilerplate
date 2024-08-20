'use client';

import Link from 'next/link';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { verifyLoginCode } from '@/app/(auth)/auth/confirm-email/actions';
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/logo';
import toast from '@/lib/toast';
import { isValidEmail } from '@/lib/validation';
import { resendVerificationEmail } from './actions';

export default function ConfirmEmailPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get('email')?.replace(/\+/g, '%2B') || '';
	const from = searchParams.get('from');
	const decodedEmail = isValidEmail(email) ? decodeURIComponent(email) : '';
	const [code, setCode] = useState('');
	const [enterManually, setEnterManually] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);

		if (!code) return setLoading(false);

		await verifyLoginCode(decodedEmail, code).catch((err) => {
			toast(err.message, 'error');
		});

		setLoading(false);
	};

	const resendLink = async () => {
		if (!decodedEmail) return;
		await resendVerificationEmail(decodedEmail)
			.then(() => {
				toast('If an account exists, a new link has been sent.', 'success');
			})
			.catch((err) => {
				return toast(err.message, 'error');
			});
	};

	useEffect(() => {
		const error = searchParams.get('error');
		if (error && error === 'InvalidOrExpired') {
			toast(
				'The link is invalid or expired. Please request a new one.',
				'error'
			);
		}
	}, [searchParams]);

	// TODO: when decoded email doesnt exost - resend link opens up a form to request new code with a text link to enter code manually

	return (
		<>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4'>
					<Logo />
					<div className='flex flex-col gap-2'>
						<h2>Check your email</h2>

						<p>
							We sent an email to
							{decodedEmail ? (
								<>
									{' '}
									<span className='font-medium text-typography-strong'>
										{decodedEmail}
									</span>
								</>
							) : (
								' you'
							)}
							. It contains a magic link to verify your account.
						</p>
					</div>
				</div>
				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit}
				>
					{enterManually && (
						<>
							<Input
								type='text'
								placeholder='Enter code'
								label='One-time code'
								htmlFor='login-code'
								value={code}
								handleChange={(e) => setCode(e.target.value)}
							/>
							<div className='flex flex-col gap-6'>
								<Button
									loading={loading}
									disabled={!code}
									type='submit'
									className='w-full'
								>
									Verify
								</Button>
							</div>
						</>
					)}

					<div className='w-full flex flex-col gap-6 justify-center items-center text-typography-weak'>
						{!enterManually && isValidEmail(email || '') && (
							<Button
								className='w-full'
								handleClick={() => setEnterManually(true)}
							>
								Enter code manually
							</Button>
						)}

						{decodedEmail && (
							<button
								className='link-brand'
								onClick={resendLink}
							>
								Resend link
							</button>
						)}

						{from === 'signup' ? (
							<span>
								Don&apos;t have an account?{' '}
								<Link
									className='link-brand'
									href='/login'
								>
									Sign up
								</Link>
							</span>
						) : (
							<span>
								Already confirmed?{' '}
								<Link
									className='link-brand'
									href='/login'
								>
									Log in
								</Link>
							</span>
						)}
					</div>
				</form>
			</div>
		</>
	);
}
