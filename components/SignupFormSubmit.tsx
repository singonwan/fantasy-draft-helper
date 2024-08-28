'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const SignupFormSubmit = () => {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500"
		>
			{pending ? 'Creating...' : 'Create Account'}
		</button>
	);
};

export default SignupFormSubmit;
