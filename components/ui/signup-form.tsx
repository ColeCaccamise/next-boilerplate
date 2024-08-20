'use client';

import Input from './input';
import Button from './button';
import Link from 'next/link';
import { useState } from 'react';
import toast from '@/lib/toast';
import config from '@/config';

export default function SignupForm({
	signUp,
}: {
	signUp: (
		nameInput: string,
		emailInput: string,
		passwordInput: string
	) => Promise<any>;
}) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitLoading, setSubmitLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setSubmitLoading(true);

		await signUp(name, email, password)
			.then(() => toast('Account created.', 'success'))
			.catch((err) => toast(err.message, 'error'));

		setSubmitLoading(false);
	}

	return (
		<form
			className='flex flex-col gap-6'
			onSubmit={handleSubmit}
		>
			<div className='flex flex-col gap-6'>
				<Input
					type='text'
					placeholder='Enter your name'
					value={name}
					handleChange={(e) => setName(e.target.value)}
					label='Name'
					htmlFor='name-signup'
					autoFocus
				/>
				<Input
					type='email'
					placeholder='Enter your email'
					handleChange={(e) => setEmail(e.target.value)}
					label='Email'
					htmlFor='email-signup'
				/>
				<Input
					type='password'
					placeholder='Enter password'
					handleChange={(e) => setPassword(e.target.value)}
					label='Password'
					htmlFor='password-signup'
				/>
			</div>
			<div className='flex flex-col gap-6'>
				<Button
					type='submit'
					className='w-full'
					disabled={!name || !email || !password}
					loading={submitLoading}
				>
					Create account
				</Button>

				<div className='flex flex-col py-6 text-center text-sm'>
					<span>
						Already building with {config.appName}?{' '}
						<Link
							className='link-brand'
							href='/login'
						>
							Log in
						</Link>
						.
					</span>
				</div>
			</div>
		</form>
	);
}
