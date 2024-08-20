'use client';

import Image from 'next/image';
import { useUser } from '@/context/user-provider';
import { User } from '@supabase/supabase-js';

export default function Avatar() {
	const { authUser: user }: { authUser: User | null } = useUser();

	const name = user?.user_metadata?.full_name;
	const initials = name
		?.split(' ')
		?.map((n: any) => n.charAt(0).toUpperCase())
		?.join('');
	const profile = user?.user_metadata?.avatar_url;
	return (
		<span className='flex items-center justify-center bg-ui-component-default border border-stroke-weak rounded-full w-10 h-10 cursor-pointer hover:bg-ui-component-hover select-none overflow-hidden'>
			{profile ? (
				<Image
					width={40}
					height={40}
					src={profile}
					alt={`Image of ${name}`}
					className='hover:opacity-80 transition-effect'
					draggable={false}
				/>
			) : (
				initials
			)}
		</span>
	);
}
