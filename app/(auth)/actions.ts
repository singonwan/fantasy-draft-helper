'use server';

import prisma from '@/utils/db';
import { loginFormSchema, signupFormSchema } from '../_lib/definitions';
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from '../_lib/session';
import { redirect } from 'next/navigation';

export async function signup(state, formData) {
	// 1.validate fields
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

	const { name, email, password } = validationResult.data;
	// console.log(name, email, password);

	try {
		// Check for unique email
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return {
				errors: { email: ['Email is already in use.'] },
			};
		}

		// 2. create user
		// hash user's password
		const hashedPassword = await bcrypt.hash(password, 12);

		//ORM to create user
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		console.log('User created:', user);

		// 3.create session
		await createSession(user.id, user.name);
	} catch (error) {
		console.error('Signup error:', error);
		return {
			errors: { general: ['An error occurred during signup.'] },
		};
	}
	redirect('/myrankings');
}

export async function login(state, formData) {
	// 1. validate fields
	const validationResult = loginFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});
	if (!validationResult.success) {
		return {
			errors: validationResult.error.flatten().fieldErrors,
		};
	}
	const { email, password } = validationResult.data;
	// console.log(email, password);

	try {
		// check if email exists in database
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			return { errors: { email: ['User with this email does not exist.'] } };
		}
		// console.log(user);

		// compare hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		// console.log(user.password);
		if (!isPasswordValid) {
			console.log('invalid password');
			return {
				errors: { password: ['Invalid password.'] },
			};
		}

		// create session
		await createSession(user.id, user.name);
		//redirect must happen outside of try/catch cus it throws an error

		// return {
		// 	success: true,
		// 	user,
		// };
	} catch (error) {
		console.error('Login error:', error);
		return {
			errors: { general: ['An error occurred during login.'] },
		};
	}
	redirect('/myrankings');
}

export async function logout() {
	try {
		await deleteSession();
		// Additional cleanup tasks can be added here if needed
	} catch (error) {
		console.error('Logout error:', error);
		// redirect to error page
	}
	redirect('/login');
}
