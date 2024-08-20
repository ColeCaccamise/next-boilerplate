'use server';

import SignupForm from '@/components/ui/signup-form';
import { signUp } from './actions';
import config from '@/config';

export default async function LoginPage() {
	return (
		<>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<h2>Sign up to {config.appName}</h2>
						<p>Ship faster.</p>
					</div>
					<SignupForm signUp={signUp} />
				</div>
			</div>
		</>
	);
}
