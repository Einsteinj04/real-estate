'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { APP_ROUTES } from '@/config';
import { LocationOn, Call, Email, AccessTime, Facebook, Twitter, Instagram, LinkedIn, Telegram } from '@mui/icons-material';
import { TextField, InputAdornment } from '@/components/mui';
import { Button } from '@/components/mui';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (): Promise<void> => {
    alert(email);
  };

  return (
    <div className='bg-[var(--secondary)] z-[5] md:relative md:-bottom-[120vh] text-white section-x pt-[50px] md:pt-[80px] pb-[20px] md:pb-[40px]'>
      <div className='flex md:flex-row w-full justify-between flex-col gap-8'>
        <div className='flex flex-col gap-y-4'>
          <div>
            <Link href={APP_ROUTES.HOME} className='text-primary font-[700] font-metro-sans uppercase text-4xl text-[var(--primary)]'>
              Logo
            </Link>
          </div>
          <p className='text-slate-300 max-w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sapiente reiciendis consequuntur, quas at ab necessitatibus veniam fuga iure non!</p>
          <div className='flex w-full max-w-60 justify-between'>
            <Facebook />
            <Twitter />
            <Instagram />
            <LinkedIn />
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-y-2'>
            <h4 className='text-lg'>CONTACT US</h4>
            <div className='text-slate-300'>
              <div className='flex gap-x-2'>
                <div className='text-white'><LocationOn /></div>
                <p>3711-2880 Nulla St, Mankato, Mississippi</p>
              </div>
              <div className='flex gap-x-2'>
                <div className='text-white'><Call /></div>
                <p>(+88) 666 121 4321</p>
              </div>
              <div className='flex gap-x-2'>
                <div className='text-white'><Email /></div>
                <p>info.leramiz@colorlib.com</p>
              </div>
              <div className='flex gap-x-2 items-start'>
                <div className='text-white'><AccessTime /></div>
                <p>Mon - Sat, 08 AM - 06 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-y-2'>
            <h4 className='text-lg'>POPULAR PLACES</h4>
            <div className='grid grid-cols-2 gap-x-10 text-slate-300 md:max-w-full max-w-[50%]'>
              {['Florida', 'New York', 'Washington', 'Los Angeles', 'Chicago', 'St Louis', 'Jacksonville', 'San Jose', 'San Diego', 'Houston'].map((place) => (
                <p key={place}>{place}</p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-y-2'>
            <h4 className='text-lg'>NEWSLETTER</h4>
            <p className='text-slate-300 max-w-60'>Subscribe your email to get the latest news and new offer also discount</p>
            <div>
              <TextField
                fullWidth
                sx={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '5px',
                  '& .MuiInputBase-input::placeholder': { color: 'rgb(148 163 184)' },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
                placeholder='email@example.com'
                variant='outlined'
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button
                        onClick={handleSubmit}
                        sx={{
                          color: '#fff',
                          background: 'var(--primary)',
                          fontSize: '16px',
                          '&:hover': { color: 'var(--primary)', background: '#fff' },
                        }}
                      >
                        <Telegram />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full border bg-slate-700 my-4'></div>
      <p className='text-slate-400 text-xs'>Copyright ©2025 All rights reserved</p>
    </div>
  );
};

export default Footer;
