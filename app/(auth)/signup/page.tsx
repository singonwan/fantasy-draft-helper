'use client';

import React from 'react';
import Link from 'next/link';
import { signup } from '../actions';
import { useFormState } from 'react-dom';
import SignupFormSubmit from '../../../components/SignupFormSubmit';

const SignUpPage = () => {
	const [state, action] = useFormState(signup, null);

	// console.log(state?.errors);

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create a Fantasy Draft Helper Account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action={action} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="name"
									// required
									autoComplete="name"
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{state?.errors?.name && (
								<p className="text-red-600 text-xs pt-1">{state.errors.name}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									// type="email"
									// required
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{state?.errors?.email && (
								<p className="text-red-600 text-xs pt-1">
									{state.errors.email}
								</p>
							)}
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									// required
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{state?.errors?.password && (
								<p className="text-red-600 text-xs pt-1">
									{state.errors.password}
								</p>
							)}
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="confirmpassword"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Confirm Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="confirmpassword"
									name="confirmpassword"
									type="password"
									// required
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{state?.errors?.confirmpassword && (
								<p className="text-red-600 text-xs pt-1">
									{state.errors.confirmpassword}
								</p>
							)}
						</div>

						<div>
							<SignupFormSubmit />
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{' '}
						<Link
							href="/login"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SignUpPage;
