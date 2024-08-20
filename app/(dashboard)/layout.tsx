import AppSidebar from '@/components/ui/app-sidebar';
import AppNavbar from '@/components/ui/app-navbar';
import { getUser } from '@/lib/auth';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUser();

	return (
		<div className='w-screen h-full flex justify-between'>
			<AppSidebar />
			<div className='flex flex-col flex-grow h-full'>
				<AppNavbar />
				<main className='flex-grow p-8 text-left max-h-screen overflow-auto'>
					{children}
				</main>
			</div>
		</div>
	);
}
