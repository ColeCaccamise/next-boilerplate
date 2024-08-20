'use client';

import { createClient } from '@/lib/supabase/client';
import toast from '@/lib/toast';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import DropdownMenuItem from '@/components/ui/dropdown-menu-item';

import {
	Link2Icon,
	ExitIcon,
	ChevronDownIcon,
	MoonIcon,
	ListBulletIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

// Reference: https://headlessui.com/react/menu

export default function DropdownMenu({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	async function handleLogout() {
		const supabase = createClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			toast('Could not log out.', 'error');
		} else {
			router.push('/login');
		}
	}

	const menuItems = [
		{
			id: 'homepage-icon',
			icon: <Link2Icon />,
			label: 'Homepage',
			href: '/home',
			kbd: 'G then H',
		},
		{
			id: 'onboarding-item',
			icon: <ListBulletIcon />,
			label: 'Onboarding',
			kbd: 'G then O',
		},
		{
			id: 'logout-item',
			icon: <ExitIcon />,
			label: 'Logout',
			kbd: 'G then L',
			handleClick: handleLogout,
		},
	];
	return (
		<>
			<div className=''>
				<Menu>
					<MenuButton className=''>{children}</MenuButton>

					<MenuItems
						transition
						anchor='bottom end'
						className='w-52 origin-top-right rounded-lg border border-stroke-weak bg-fill-solid p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
					>
						{menuItems.map((item) => {
							return (
								<DropdownMenuItem
									key={item.id}
									icon={item.icon}
									label={item.label}
									kbd={item.kbd}
									href={item.href}
									handleClick={item.handleClick}
								/>
							);
						})}
					</MenuItems>
				</Menu>
			</div>
		</>
	);
}
