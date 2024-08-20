import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getSession();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 401 });
	}

	if (!data) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	}

	return NextResponse.json({ data });
}
