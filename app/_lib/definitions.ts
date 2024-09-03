import { z } from 'zod';

export const signupFormSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().email('Invalid email address'),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(32, 'Password must be no more than 32 characters long')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/\d/, 'Password must contain at least one number')
			.regex(
				/[^a-zA-Z0-9]/,
				'Password must contain at least one special character'
			),
		confirmpassword: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.max(32, 'Password must be no more than 32 characters long'),
	})
	.refine((data) => data.password === data.confirmpassword, {
		path: ['confirmpassword'], //setting path of error msg to 'confirm password'
		message: 'passwords do not match',
	});

export const loginFormSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
