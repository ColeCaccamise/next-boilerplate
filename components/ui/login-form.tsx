'use client';

import Link from 'next/link';
import Input from './input';
import Button from './button';
import { useState } from 'react';
import toast from '@/lib/toast';

export default function LoginForm({
	signIn,
}: {
	signIn: (emailInput: string, passwordInput: string) => Promise<any>;
}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitLoading, setSubmitLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setSubmitLoading(true);

		try {
			await signIn(email, password);
		} catch (err: any) {
			toast(err.message, 'error');
		} finally {
			setSubmitLoading(false);
		}
	}

	return (
		<form
			className='flex flex-col gap-6'
			onSubmit={handleSubmit}
		>
			<Input
				type='email'
				placeholder='Enter your email'
				value={email}
				handleChange={(e) => setEmail(e.target.value)}
				label='Email'
				htmlFor='email-login'
				autoFocus
			/>

			<Input
				type='password'
				placeholder='Enter your password'
				value={password}
				handleChange={(e) => setPassword(e.target.value)}
				label='Password'
				htmlFor='password-login'
			/>

			<div className='flex flex-col gap-6'>
				<Button
					className='w-full'
					type='submit'
					disabled={!email || !password}
					loading={submitLoading}
				>
					Login
				</Button>

				<div className='flex flex-col py-6 gap-6 text-center'>
					<span>
						<Link
							className='link-brand'
							href='/auth/reset'
						>
							Forgot password?
						</Link>
					</span>
					<span>
						Don&apos;t have an account?{' '}
						<Link
							className='link-brand'
							href='/signup'
						>
							Sign up
						</Link>
						.
					</span>
				</div>
			</div>
		</form>
	);
}
