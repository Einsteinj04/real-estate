'use client';

import React, { useRef } from 'react';
import { useWindowLocation } from '@/hooks';
import { APP_ROUTES } from '@/config';
import { Button } from '@/components';
import { IconButton } from '@/components/mui';
import { HideShowNavbarOnScroll } from '@/hooks/use_scroll';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface Navigation {
  title: string;
  href: string;
}

interface NavigationLinkProps {
  navigation: Navigation;
  onClick?: () => void;
  isScrolled?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ navigation, onClick, isScrolled }) => {
  const { windowLocation } = useWindowLocation();
  const { title, href } = navigation;
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`${isScrolled && windowLocation !== href ? 'text-white md:text-slate-600' : ''} ${
        windowLocation === href ? 'font-[600] text-slate-300' : 'font-[500] text-[#fff]'
      } flex font-inter hover:text-primary items-center justify-center gap-x-[3px] transition-all duration-300`}
    >
      {title.toUpperCase()}
    </Link>
  );
};

const Header: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  const handleOpenSideBar = () => {
    wrapperRef.current?.classList.toggle('translate-y-[-100vh]');
    sideBarRef.current?.classList.toggle('translate-y-[-100vh]');
    document.body.classList.toggle('overflow-hidden');
  };

  const { hideNavbar, isScrolled } = HideShowNavbarOnScroll({
    initialScrollLength: 50,
    furtherScrollLength: 200,
  });

  const desktopNavigations: Navigation[] = [
    { title: 'Home', href: APP_ROUTES.HOME },
    { title: 'About', href: APP_ROUTES.ABOUT },
    { title: 'Properties', href: APP_ROUTES.PROPERTIES },
    { title: 'News', href: APP_ROUTES.NEWS },
    { title: 'Contact Us', href: APP_ROUTES.CONTACT },
  ];

  return (
    <>
      <nav
        // bg-[#020122]
        ref={wrapperRef}
        className={`fixed top-0 left-0 w-full transition-all mx-auto duration-300 z-50 px-10 py-2
          ${isScrolled ? 'bg-white shadow-md' : 'bg-[var(--primary)]'} 
          ${hideNavbar ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className='flex items-center justify-between max-w-[2000px] mx-auto'>
          <div className='w-full flex max-w-40 justify-start items-center text-[#fff]'>
            <Link href={APP_ROUTES.HOME} className={`text-primary font-[700] font-metro-sans uppercase text-2xl ${isScrolled ? 'text-slate-600' : ''}`}>
              Logo
            </Link>
          </div>

          <div className='hidden max-w-xl justify-between w-[calc(100%_-_400px)] md:flex'>
            {desktopNavigations.map((navigation, index) => (
              <NavigationLink key={index} navigation={navigation} isScrolled={isScrolled} />
            ))}
          </div>

          <div className='w-full flex justify-end max-w-40 items-center '>
            <Link className='hidden md:flex font-[700] font-metro-sans' href={APP_ROUTES.LOGIN}>
              <Button color={`${isScrolled ? '#fff':'var(--primary)'}`} background={`${isScrolled? 'var(--primary)':'#fff'}`} className={`h-[35px] font-[700] font-metro-sans`}>
                LOGIN
              </Button>
            </Link>
            <div className='md:hidden block'>
              <IconButton onClick={handleOpenSideBar}>
                <MenuIcon className={` text-[19px] base:text-[22px] sm:text-[25px]  ${isScrolled ? 'text-slate-600' : 'text-white'}`} />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      <nav ref={sideBarRef} className='fixed z-[2000] top-0 right-0 left-0 bottom-0 w-full h-full max-h-full transition-all ease-out duration-300 md:hidden translate-y-[-100vh] bg-[var(--primary)] px-10 py-2'>
        <div className='flex'>
          <div className='w-full flex max-w-40 sm:justify-center justify-start items-center'>
            <Link href={APP_ROUTES.HOME} className='text-primary font-[700] font-metro-sans uppercase text-2xl text-white'>
              Logo
            </Link>
          </div>
          <div className='flex justify-end w-full'>
            <IconButton onClick={handleOpenSideBar}>
              <CloseIcon className={`text-white text-[19px] base:text-[22px] sm:text-[25px]  ${isScrolled ? 'text-slate-600' : ''}`} />
            </IconButton>
          </div>
        </div>

        <div className='h-full flex flex-col justify-center gap-6'>
        {desktopNavigations.map((navigation, index) => (
              <NavigationLink key={index} navigation={navigation} isScrolled={isScrolled} />
            ))}
          <Link className='font-metro-sans' href={APP_ROUTES.LOGIN}>
              <Button color='var(--primary)' background='#fff' className={`h-[35px] font-[700] font-metro-sans`}>
                LOGIN
              </Button>
            </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
