import Image from 'next/image';
import React, { useRef } from 'react';

export default function ImageInput({
	src,
	alt = 'Avatar image',
	handleChange,
}: {
	src: string;
	alt: string;
	handleChange: (e: any) => any;
}) {
	const fallbackUrl =
		'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
	const fileInput = useRef<HTMLInputElement>(null);

	console.log(src);

	return (
		<>
			<input
				type='file'
				className='hidden'
				accept='.jpg,.jpeg,.png,.gif'
				ref={fileInput}
				onChange={handleChange}
			/>
			{/* TODO: show loading state for image (rather than showing default) */}
			<Image
				className='w-24 h-24 object-cover rounded-full cursor-pointer hover:opacity-80'
				width={24}
				height={24}
				src={src || fallbackUrl}
				alt={alt}
				onClick={() => {
					fileInput?.current?.click();
				}}
			/>
		</>
	);
}
