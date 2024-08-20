import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const next = searchParams.get('next') ?? '/auth/reset';

	if (token_hash && type && type === 'recovery') {
		const supabase = await createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			redirect(next + `&user_id=${user?.id}`);
		}
	}

	redirect(`/auth/reset?error=InvalidOrExpired`);
}
