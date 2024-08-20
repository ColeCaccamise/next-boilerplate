'use client';

import config from '@/config';
import {
	DashboardIcon,
	GearIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import SidebarItem from '@/components/ui/sidebar-item';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppSidebar() {
	const pathname = usePathname();

	const items = [
		{
			key: 'dashboard',
			icon: <DashboardIcon />,
			label: 'Dashboard',
			href: '/dashboard',
			selected: pathname === '/dashboard',
		},
	];

	return (
		<>
			<aside className='bg-sidebar-bg w-64 h-full flex flex-col border-r border-stroke-weak max-h-screen'>
				<div>
					<Link
						href='/dashboard'
						className='flex justify-between items-center h-20 p-4 border-b border-stroke-weak  no-underline'
					>
						<span className='text-lg font-medium'>{config.appName}</span>
					</Link>
				</div>

				<div className='max-h-screen-minus-20 h-full overflow-auto flex flex-col justify-between'>
					<ul className='flex flex-col p-4 gap-1'>
						{items.map((item) => (
							<SidebarItem
								key={item.key}
								icon={item.icon}
								label={item.label}
								href={item.href}
								selected={item.selected}
							/>
						))}
					</ul>

					<div>
						<div>
							<ul className='flex flex-col gap-1 p-4'>
								<SidebarItem
									icon={<GearIcon />}
									label='Settings'
									href='/settings'
									selected={/^\/settings(\/.*)?$/.test(pathname)}
								/>
								<SidebarItem
									icon={<QuestionMarkCircledIcon />}
									label='Help Center'
									href='/support'
								/>
							</ul>
						</div>

						<div className='border-t border-stroke-weak p-4 text-center'>
							<p className='text-sm'>&copy; 2024</p>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
