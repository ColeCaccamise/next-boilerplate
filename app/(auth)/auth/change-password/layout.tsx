import { Suspense } from 'react';

export default function ChangePasswordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Suspense>{children}</Suspense>
		</>
	);
}
