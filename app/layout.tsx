import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Payments',
	description: 'Sell digital products.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-background text-typography-weak`}>
				<Toaster
					toastOptions={{
						duration: 4000,
						className: 'select-none',
					}}
				/>

				<div className='min-h-screen max-w-3xl mx-auto h-full px-4 flex flex-col gap-8 '>
					<div className='flex flex-col flex-grow w-full items-center justify-center'>
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
