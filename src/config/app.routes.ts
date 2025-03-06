const domain = process.env.NEXT_PUBLIC_DOMAIN || "";
const production = process.env.NEXT_PUBLIC_PUB === 'production';

// const mainDomain = `${production ? 'https' : 'http'}://${domain}`;
// const adminSubDomain = `${production ? 'https' : 'http'}://admin.${domain}`;

const mainDomain = `${production ? 'https' : 'http'}://${domain}`;
const adminSubDomain = `${production ? 'https' : 'http'}://${domain}/subdomains/admin`;

export default {

	HOST: `${mainDomain}`,
	ADMIN: `${adminSubDomain}`,

	HOME: `${mainDomain}/`,
	ABOUT: `${mainDomain}/about`,
	PROPERTIES: `${mainDomain}/properties`,
	NEWS: `${mainDomain}/blog`,
	CONTACT: `${mainDomain}/contact`,



	LOGIN: `${adminSubDomain}/login`,
}