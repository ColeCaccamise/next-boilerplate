import Link from 'next/link';

export default function SettingsTab({
	href,
	label,
	selected,
}: {
	href: string;
	label: string;
	selected: boolean;
}) {
	return (
		<li>
			<Link
				className={`p-2 rounded-md hover:bg-ui-component-default ${
					selected ? 'bg-ui-component-default' : ''
				}`}
				href={href}
			>
				{label}
			</Link>
		</li>
	);
}
