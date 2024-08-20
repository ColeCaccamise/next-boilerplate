import Link from 'next/link';

export default function SidebarItem({
	icon,
	label,
	selected = false,
	href = '',
	notifcationCount,
}: {
	icon: any;
	label: string;
	selected?: boolean;
	href?: string;
	notifcationCount?: number;
}) {
	return (
		<Link
			href={href}
			className={`flex justify-between items-center gap-3 transition-none p-2 rounded-md text-md cursor-pointer active:bg-fill no-underline select-none text-typography-weak hover:text-typography-strong ${
				selected ? 'bg-fill' : 'hover:bg-hover'
			}`}
		>
			<div className='flex items-center gap-3'>
				{icon}

				<span className='text-high-contrast-text'>{label}</span>
			</div>
			{notifcationCount && (
				<div className='bg-ui-component-pressed-selected text-high-contrast-text flex justify-center items-center p-1 w-6 h-6 rounded-md'>
					<span className='text-xs'>{notifcationCount}</span>
				</div>
			)}
		</Link>
	);
}
