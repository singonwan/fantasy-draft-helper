import Link from 'next/link';
import React from 'react';
import { verifySession } from '@/app/_lib/session';
import LogOutButton from '../components/LogOutButton';

const NavBar = async () => {
	const session = await verifySession();

	console.log(session);

	return (
		<nav className="block w-full max-w-screen-xl px-4 py-2 mx-auto text-white bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
			<div className="container flex items-center justify-between mx-auto text-blue-gray-900">
				<Link
					href="/"
					className="mr-4 text-slate-800 block cursor-pointer py-1.5 font-sans text-base  leading-relaxed antialiased font-bold"
				>
					Fantasy Draft Helper
				</Link>
				{session !== null && (
					<>
						<div>
							<p className="text-slate-800 text-xs font-bold">
								welcome, {session.userName}!
							</p>
						</div>
						<LogOutButton />
					</>
				)}
				{!session && (
					<div className="flex items-center gap-x-1">
						<Link
							className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
							href="/login"
						>
							<span>Log In</span>
						</Link>
						<Link
							className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
							href="/signup"
						>
							<span>Sign up</span>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
