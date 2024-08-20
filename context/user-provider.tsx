'use client';

import { useEffect, useState } from 'react';
import type { User as AuthUser } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

type Store = {
	id: number;
	name: string;
};

type User = {
	id: number;
	name: string;
	email: string;
	last_accessed_store_id: number;
};

type UserType = {
	authUser: AuthUser | null;
	loading: boolean;
	store: Store | null;
	user: User | null;
};

const defaultUser: UserType = {
	authUser: null,
	loading: false,
	store: null,
	user: null,
};

const UserContext = createContext<UserType>(defaultUser);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [store, setStore] = useState<Store | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);

			const { data, error } = await supabase.auth.getUser();
			if (error) {
				console.error('Error fetching user:', error);
			} else {
				console.log('data:', data);
				setAuthUser(data.user);
			}

			setLoading(false);
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider
			value={{ authUser, loading, store: null, user: null }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
