"use server";
import { SUBDOMAINS, SITE_DATA } from "@/config";

// Define more specific Metadata type for better type safety
interface GoogleBotMetadata {
  index: boolean;
  follow: boolean;
  noimageindex: boolean;
  "max-video-preview": number;
  "max-image-preview": string | number;
  "max-snippet": number;
}

interface RobotsMetadata {
  index: boolean;
  follow: boolean;
  nocache: boolean;
  googleBot: GoogleBotMetadata;
}

interface AppleWebAppMetadata {
  capable: boolean;
  statusBarStyle: string;
}

interface OpenGraphMetadata {
  url: string;
  title: string;
  description: string;
  siteName: string;
  images: { url: string; width: number; height: number }[];
  locale: string;
  type: string;
}

interface TwitterMetadata {
  card: string;
  title: string;
  description: string;
  images: string[];
  site: string;
}

interface Metadata {
  title: string;
  metadataBase?: URL;
  alternates?: { canonical: string };
  description?: string;
  keywords?: string[];
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
  applicationName: string;
  manifest: string;
  referrer: string;
  robots: RobotsMetadata;
  appleWebApp: AppleWebAppMetadata;
  other: Record<string, string>;
}

const metadata: Metadata = {
  title: SITE_DATA.NAME,
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
  twitter: {
    card: "summary",
    title: SITE_DATA.NAME,
    description: "Your site description",
    images: [`${SUBDOMAINS.ROOT}/icons/og.png`],
    site: SITE_DATA.TWITTER_HANDLE,
  },
};

// Define the expected properties for generateMetaData
interface MetaDataProps {
  title: string;
  host: string;
  url: string;
}

const keywords: string[] = [];
const description = ""; // Consider setting dynamic description or use default value
const ogDescription = ""; // Consider setting dynamic ogDescription or use default value
const twitterDescription = ""; // Consider setting dynamic twitterDescription or use default value

const generateMetaData = async ({
  title,
  host,
  url,
}: MetaDataProps): Promise<Metadata | null> => {
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
    // Uncomment and modify as needed for other subdomains
    // case SUBDOMAINS.ACCOUNTS:
    //   return {
    //     ...metadata,
    //     title,
    //     metadataBase: new URL(SUBDOMAINS.ACCOUNTS),
    //   };
    default:
      return null; // Return null for unhandled subdomains
  }
};

export default generateMetaData;
