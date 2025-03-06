"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Image } from "@/components";
import { APP_ROUTES, ASSETS } from "@/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ApartmentOutlined,HotelOutlined} from '@mui/icons-material';

interface CardItem {
  title: string;
}

interface CarouselProps {
  cards: CardItem[];
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const sliderRef = useRef<Slider>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine slidesToShow based on screen size
  const getSlidesToShow = () => {
    if (windowWidth < 768) return 1; // Mobile
    if (windowWidth < 1024) return 2; // Tablet
    return 3; // Desktop
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust speed as needed
    arrows: windowWidth >= 768, // Hide arrows on mobile
    centerMode: false, // Disable centering to show only full cards
    focusOnSelect: true, // Allow focus on each card
    edgeFriction: 0.3, // Prevent extreme edge snapping
  };

  return (
    <div className="w-full flex items-center justify-center">
      {/* Left Arrow - Visible on larger screens */}
      {windowWidth >= 768 && (
        <div className="flex-none">
          <IconButton
            className="bg-white"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ArrowBack />
          </IconButton>
        </div>
      )}

      {/* Slider */}
      <div className="flex-grow overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="flex justify-center px-4 min-h-[510px]">
                <Link href={APP_ROUTES.PROPERTIES} className="">

                        <Card className="border transition-transform duration-300 transform sm:hover:scale-105">
                        {/* <CardContent> */}
                        <div className="w-full ">
                            <Image
                                alt="Welcome to Real Estate"
                                src={ASSETS.HOME_HERO}
                                className=""
                            />
                        </div>
                        {/* <div className="absolute inset-0 hover:bg-slate-600 opacity-50 z-[3] w-full " /> */}
                        <div className="px-4 pt-6 flex flex-col gap-x-2">
                            <p className="bg-[var(--primary)] text-lg text-white w-fit rounded px-4 py-1">$ 6734</p>
                            <h3 className="">Apartment</h3>
                            <p className="text-slate-500">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>

                        <div className='flex w-full justify-between text-[10px] md:text-xs px-4'>
                            <div className='flex justify-center gap-1'>
                                <div className="flex items-center text-[var(--primary)]"><HotelOutlined/></div>
                                <p className=" h-full flex items-center text-slate-800">2 bedroom</p>
                            </div>
                            <div className='flex gap-2 justify-center '>
                            <div className="flex items-center text-[var(--primary)]"><HotelOutlined/></div><p className=" h-full flex items-center text-slate-800">2 bedroom</p>
                            </div>
                            <div className='flex justify-center  gap-2'>
                            <div className="flex items-center"><div className="flex items-center text-[var(--primary)]"><HotelOutlined/></div></div><p className=" h-full flex items-center text-slate-800">1050 Sq Ft</p>
                            </div>
                        </div>
                        {/* <Typography variant="h6">{card.title}</Typography> */}
                        {/* </CardContent> */}
                    </Card>
                </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Arrow - Visible on larger screens */}
      {windowWidth >= 768 && (
        <div className="flex-none">
          <IconButton
            className="bg-white"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ArrowForward />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Carousel;
