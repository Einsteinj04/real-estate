const domain: string = process.env.NEXT_PUBLIC_DOMAIN || "";
const production: boolean = process.env.NEXT_PUBLIC_PUB === "production";

const mainDomain: string = `${production ? "https" : "http"}://${domain}`;
const adminSubDomain: string = `${production ? "https" : "http"}://${domain}/subdomains/admin`;

const ROUTES = {
    HOST: mainDomain,
    ADMIN: adminSubDomain,

    HOME: `${mainDomain}/`,
    ABOUT: `${mainDomain}/about`,
    PROPERTIES: `${mainDomain}/properties`,
    NEWS: `${mainDomain}/blog`,
    CONTACT: `${mainDomain}/contact`,

    LOGIN: `${adminSubDomain}/login`,
};

export default ROUTES;
