'use client';

import { createContext, useState } from 'react';

export const UserContext = createContext({
	user: null, // {id, name}
	setUser: ({ id, name }: { id: string; name: string }) => {},
	removeUser: () => {},
});

export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<{} | null>(null);

	function removeUser() {
		setUser(null);
	}

	const context = {
		user: user,
		setUser: setUser,
		removeUser: removeUser,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
}
