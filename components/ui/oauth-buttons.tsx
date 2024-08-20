import OAuthIcon from '@/components/ui/oauth-icon';
import oauthSignIn from '@/lib/oauth';

export default function OAuthButtons({ mode = 'login' }) {
	const oauthProviders: string[] = ['google', 'github'];

	return (
		<div className='w-full flex gap-2 py-2 flex-col sm:flex-row'>
			{oauthProviders.map((provider: string) => (
				<OAuthIcon
					key={provider}
					provider={provider}
					mode={mode}
					signIn={oauthSignIn}
				/>
			))}
		</div>
	);
}
