'use client';

import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useState } from 'react';
import { changePassword } from './actions';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/logo';
import toast from '@/lib/toast';
import config from '@/config';
import Link from 'next/link';

export default function ChangePasswordPage() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const token = searchParams.get('token_hash') || '';
		const type = searchParams.get('type') || '';

		setSubmitLoading(true);

		await changePassword(password, confirmPassword, token, type)
			.then(() => {
				setPasswordChanged(true);
			})
			.catch((err) => {
				toast(err.message, 'error');
			});

		setSubmitLoading(false);
	}

	if (passwordChanged) {
		return (
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4'>
					<Logo />
					<div className='flex flex-col gap-2'>
						<h2>Password changed!</h2>
						<p>
							You can now log in to your {config.appName} account with your new
							password.
						</p>
					</div>
				</div>
				<Link
					href='/login'
					className='btn btn-brand w-full'
				>
					Back to login
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4'>
					<Logo />
					<div className='flex flex-col gap-2'>
						<h2>Set up a new password</h2>
						<p>
							Your password must contain at least one uppercase letter, one
							lowercase letter, a number, and a symbol.
						</p>
					</div>
				</div>
				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit}
				>
					<Input
						autoFocus
						type='password'
						placeholder='Enter your password'
						label='New password'
						htmlFor='new-password'
						value={password}
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						type='password'
						placeholder='Enter your password again'
						label='Confirm new password'
						htmlFor='confirm-new-password'
						value={confirmPassword}
						handleChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<div className='flex flex-col gap-6'>
						<Button
							type='submit'
							disabled={!password || !confirmPassword}
							loading={submitLoading}
							className='w-full'
						>
							Update password
						</Button>

						<span className='text-center'>
							<Link
								className='link-brand'
								href='/auth/reset'
							>
								Request a new reset email
							</Link>
						</span>
					</div>
				</form>
			</div>
		</>
	);
}
