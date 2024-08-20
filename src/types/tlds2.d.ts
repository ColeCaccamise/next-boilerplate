declare module 'tlds2' {
	export function checkTLD(tld: string): { validTLD: boolean };
	export function checkDomain(domain: string): { error: boolean };
}
