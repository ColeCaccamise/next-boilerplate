import { checkTLD, checkDomain } from 'tlds2';

export function isValidEmail(email: string): boolean {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	return emailPattern.test(email) && isValidDomain(email.split('@')[1]);
}

export function isValidDomain(domain: string): boolean {
	const validTld = checkTLD(domain).validTLD;
	const validDomain = checkDomain(domain).error === null;

	return validTld && validDomain;
}

export function validateEmail(email: string) {
	if (!isValidEmail(email)) {
		throw new Error('Invalid email');
	}
}

export function validatePassword(password: string) {
	if (password.length < 8) {
		throw new Error('Password must be at least 8 characters');
	}

	const hasLowerCase = /[a-z]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const hasDigit = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	if (!hasLowerCase || !hasUpperCase || !hasDigit || !hasSpecialChar) {
		throw new Error(
			'Password must contain a lowercase letter, an uppercase letter, a digit, and a symbol.'
		);
	}
}
