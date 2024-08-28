'use server';

import { signupFormSchema } from '../_lib/definitions';

export async function signup(state, formData) {
	//validate fields
	const validationResult = signupFormSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmpassword: formData.get('confirmpassword'),
	});
	if (!validationResult.success) {
		return {
			errors: validationResult.error.flatten().fieldErrors,
		};
	}
	// return state;
	//create user
	//create session
}
