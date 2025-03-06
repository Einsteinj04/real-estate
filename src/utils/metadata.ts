"use server";
import { SUBDOMAINS, SITE_DATA } from "@/config";

interface Metadata {
	applicationName: string;
	manifest: string;
	referrer: string;
	robots: {
		index: boolean;
		follow: boolean;
		nocache: boolean;
		googleBot: {
			index: boolean;
			follow: boolean;
			noimageindex: boolean;
			"max-video-preview": number;
			"max-image-preview": string | number;
			"max-snippet": number;
		};
	};
	appleWebApp: {
		capable: boolean;
		statusBarStyle: string;
	};
	other: Record<string, string>;
}

const metadata: Metadata = {
	applicationName: SITE_DATA.NAME,
	manifest: "/manifest.json",
	referrer: "origin-when-cross-origin",
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
	},
	other: {
		"mobile-web-app-capable": "yes",
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
	},
};

interface MetaDataProps {
	title: string;
	host: string;
	url: string;
}

const keywords: string[] = [];
const description = "";
const ogDescription = "";
const twitterDescription = "";

const generateMetaData = async ({ title, host, url }: MetaDataProps): Promise<Record<string, any>> => {
	switch (host) {
		case SUBDOMAINS.ROOT: // buildingplans.ng
			return {
				...metadata,
				title,
				metadataBase: new URL(SUBDOMAINS.ROOT),
				alternates: { canonical: url },
				description,
				keywords,
				openGraph: {
					url,
					title,
					description: ogDescription,
					siteName: SITE_DATA.NAME,
					images: [
						{ url: `${SUBDOMAINS.ROOT}/icons/og.png`, width: 800, height: 600 },
						{ url: `${SUBDOMAINS.ROOT}/icons/og.png`, width: 1920, height: 1920 },
					],
					locale: "en_US",
					type: "website",
				},
				twitter: {
					card: "summary",
					title,
					description: twitterDescription,
					images: [`${SUBDOMAINS.ROOT}/icons/og.png`],
					site: SITE_DATA.TWITTER_HANDLE,
				},
				robots: {
					index: true,
					follow: true,
					nocache: true,
					googleBot: {
						index: true,
						follow: true,
						noimageindex: false,
						"max-video-preview": -1,
						"max-image-preview": "large",
						"max-snippet": -1,
					},
				},
			};
		case SUBDOMAINS.ADMIN:
			return {
				...metadata,
				title,
				metadataBase: new URL(SUBDOMAINS.ADMIN),
			};
		// case SUBDOMAINS.ACCOUNTS:
		// 	return {
		// 		...metadata,
		// 		title,
		// 		metadataBase: new URL(SUBDOMAINS.ACCOUNTS),
		// 	};
		default:
			return {};
	}
};

export default generateMetaData;
