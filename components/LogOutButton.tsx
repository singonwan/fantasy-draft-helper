'use client';
import React, { useContext } from 'react';
import { logout } from '../app/(auth)/actions';
import { UserContext } from '@/store/user-context';

const LogOutButton = () => {
	const userctx = useContext(UserContext);

	const handleClick = () => {
		userctx.removeUser();
		// console.log('userctx after logout', userctx.user);
		logout();
	};

	return (
		<div className="flex items-center gap-x-1">
			<button
				className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
				onClick={handleClick}
			>
				<span>Log Out</span>
			</button>
		</div>
	);
};

export default LogOutButton;
