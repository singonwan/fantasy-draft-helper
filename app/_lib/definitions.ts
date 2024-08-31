import { z } from 'zod';

export const signupFormSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters long'),
		confirmpassword: z
			.string()
			.min(6, 'Password must be at least 6 characters long'),
	})
	.refine((data) => data.password === data.confirmpassword, {
		path: ['confirmpassword'], //setting path of error msg to 'confirm password'
		message: 'passwords do not match',
	});

export const loginFormSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
