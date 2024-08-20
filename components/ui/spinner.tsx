import { Loader2 } from 'lucide-react';

export default function Spinner({ variant = 'light' }) {
	if (variant === 'dark') {
		return (
			<Loader2 className='text-typography-strong mr-2 h-4 w-4 animate-spin' />
		);
	} else {
		return <Loader2 className='text-background mr-2 h-4 w-4 animate-spin' />;
	}
}
