import Link from 'next/link';

export default function DropdownMenuItem({
	icon,
	label,
	href,
	kbd,
	handleClick,
}: {
	icon: any;
	label: string;
	href?: string;
	kbd?: string;
	handleClick?: () => void;
}) {
	const iconStyles =
		'ml-auto hidden font-sans text-xs text-white/50 group-hover:inline';
	const buttonStyles =
		'flex items-center gap-2 cursor-pointer hover:bg-hover w-full p-2 rounded-md data-[focus]:bg-white/10 group no-underline';

	if (href) {
		return (
			<span>
				<Link
					href={href}
					className={buttonStyles}
				>
					{icon}
					<span>{label}</span>
					<kbd className={iconStyles}>{kbd}</kbd>
				</Link>
			</span>
		);
	} else {
		return (
			<span>
				<button
					className={buttonStyles}
					onClick={handleClick}
				>
					{icon}
					<span>{label}</span>
					<kbd className={iconStyles}>{kbd}</kbd>
				</button>
			</span>
		);
	}
}
