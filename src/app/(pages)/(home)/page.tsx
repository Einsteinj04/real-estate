import { APP_ROUTES, SUBDOMAINS, SITE_DATA } from '@/config';

import Client from './client';
import generateMetaData from '@/utils/metadata';
import { JSX } from 'react';

interface MetadataParams {
    params: Record<string, string>;
    searchParams: URLSearchParams;
}

export async function generateMetadata({ params, searchParams }: MetadataParams): Promise<ReturnType<typeof generateMetaData>> {
    return await generateMetaData({ title: `Home | ${SITE_DATA.NAME}`, host: SUBDOMAINS.ROOT, url: APP_ROUTES.HOME });
}

const Home = async (): Promise<JSX.Element> => {
    return <Client />;
};

export default Home;
