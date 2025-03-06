
import React, { ReactNode } from 'react';
import {Header} from '@/components';
// import '@/styles/custom.css';

export default async function WebPagesLayout({ children }: { children: ReactNode }) {
	return (
		<div className='layout'>
			<Header/>
			{children}
		</div>
	);
}



