
import React, { ReactNode } from 'react';
import {Header, Footer} from '@/components';
// import '@/styles/custom.css';

export default async function WebPagesLayout({ children }: { children: ReactNode }) {
	return (
		<div className='layout'>
			<Header/>
			{children}
			<Footer/>
		</div>
	);
}



