import Image from 'next/image';
import logo from '@/public/logo.png';
import config from '@/config';

export default function Logo() {
	return (
		<Image
			src={logo}
			width={48}
			height={48}
			alt={`${config.appName} logo`}
		/>
	);
}
