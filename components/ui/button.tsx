import Spinner from './spinner';
import Link from 'next/link';

export default function Button({
	className,
	color,
	children,
	type = 'button',
	variant,
	loading = false,
	disabled,
	handleClick,
	href,
}: {
	className?: string;
	color?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	variant?: string;
	loading?: boolean;
	disabled?: boolean;
	handleClick?: () => any;
	href?: string;
}) {
	// const backgroundColor = color ? `bg-${color}` : undefined;
	// TODO: create variants for destructive, outline, ghost, link, icon, text w/ icon
	// reference: https://ui.shadcn.com/docs/components/button

	if (variant === 'link') {
		return (
			<Link
				className='text-low-contrast-text hover:text-high-contrast-text'
				onClick={handleClick}
				href={href || ''}
			>
				{children}
			</Link>
		);
	}

	if (variant === 'destructive') {
		return (
			<button
				type={type}
				disabled={loading || disabled}
				className={`btn btn-destructive whitespace-nowrap ${
					(loading || disabled) && 'btn-disabled'
				}`}
				onClick={handleClick}
			>
				{loading && <Spinner />}

				{children}
			</button>
		);
	}

	if (variant === 'unstyled') {
		return (
			<button
				type={type}
				disabled={loading || disabled}
				className={`${className} whitespace-nowrap ${
					(loading || disabled) && 'btn-disabled'
				} group flex items-center`}
				onClick={handleClick}
			>
				<span className={loading ? 'pr-2' : ''}>{loading && <Spinner />}</span>

				{children}
			</button>
		);
	}

	return (
		<button
			type={type}
			disabled={loading || disabled}
			className={`${className} btn btn-brand whitespace-nowrap ${
				(loading || disabled) && 'btn-disabled'
			} group flex items-center`}
			onClick={handleClick}
		>
			<span className={loading ? 'pr-2' : ''}>
				{loading && <Spinner variant='light' />}
			</span>

			{children}
		</button>
	);
}
