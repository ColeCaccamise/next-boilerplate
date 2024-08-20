'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { CommandIcon } from 'lucide-react';
import Avatar from '@/components/ui/avatar';
import DropdownMenu from './dropdown-menu';

export default function AppNavbar() {
	return (
		<nav className='flex justify-end items-center p-4 min-h-20 border-b border-stroke-weak'>
			<DropdownMenu>
				<Avatar />
			</DropdownMenu>
		</nav>
	);
}
