import { z } from 'zod';

export const signupFormSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters long'),
		confirmPassword: z
			.string()
			.min(6, 'Password must be at least 6 characters long'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'], //setting path of error msg to 'confirm password'
		message: 'passwords do not match',
	});
