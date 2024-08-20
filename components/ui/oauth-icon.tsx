'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OAuthIcon({
	provider,
	mode,
	signIn,
}: {
	provider: string;
	mode: string;
	signIn: () => any;
}) {
	let icon: IconDefinition;
	let text: string;

	if (provider == 'google') {
		icon = faGoogle;
		text = 'Google';
	} else if (provider == 'github') {
		icon = faGithub;
		text = 'GitHub';
	} else {
		return null;
	}

	async function handleSignIn() {
		await signIn();
	}

	return (
		<a
			className='w-full flex justify-center items-center gap-2 p-4 sm:p-2 rounded-md bg-app-bg dark:bg-ui-component-default hover:bg-ui-component-hover focus:bg-ui-component-pressed-selected font-medium border border-subtle-borders-interactive hover:border-stronger-borders-interactive-focus-rings transition duration-200 cursor-wait select-none'
			onClick={handleSignIn}
		>
			<FontAwesomeIcon
				className='w-4 h-4'
				icon={icon}
			/>
			<span className='text-sm'>
				{mode === 'login' ? 'Sign in' : 'Sign up'} with {text}
			</span>
		</a>
	);
}
