"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Card, IconButton } from "@mui/material";
import { Apartment, ArrowBackIos, ArrowForwardIos, HotelOutlined } from "@mui/icons-material";
import { Image } from "@/components";
import { APP_ROUTES, ASSETS } from "@/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface CardItem {
  title: string;
}

interface CarouselProps {
  cards: CardItem[];
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const sliderRef = useRef<Slider>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Ensure slidesToShow does not run on the server
  const getSlidesToShow = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth > 0 ? getSlidesToShow() : 1, // Default to 1 if windowWidth is not set
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: windowWidth >= 768,
    centerMode: false,
    focusOnSelect: true,
    edgeFriction: 0.3,
  };

  return (
    <div className="w-full flex items-center justify-center">
      {windowWidth >= 768 && (
        <IconButton className="bg-white" onClick={() => sliderRef.current?.slickPrev()}>
          <ArrowBackIos />
        </IconButton>
      )}
      <div className="flex-grow overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="flex justify-center px-4 min-h-[510px]">
              <Link href={APP_ROUTES.PROPERTIES}>
                <Card className="shadow-lg transition-transform duration-300 transform sm:hover:scale-105">
                  <div className="w-full">
                    <Image alt="Welcome to Real Estate" src={ASSETS.HOME_HERO} />
                  </div>
                  <div className="px-4 pt-6 flex flex-col gap-x-2">
                    <p className="bg-[var(--primary)] text-lg text-white w-fit rounded px-4 py-1">$ 6734</p>
                    <h3>Apartment</h3>
                    <p className="text-slate-500">
                      Get started by choosing from one of our pre-built page templates to showcase your properties
                    </p>
                  </div>

                  <div className='flex w-full justify-between text-[10px] sm:text-xs px-4'>
                            <div className='flex justify-center gap-1'>
                                <div className="flex items-center text-[var(--primary)]"><HotelOutlined/></div>
                                <p className=" h-full flex items-center text-slate-800">2 bedroom</p>
                            </div>
                            <div className='flex gap-2 justify-center '>
                            <div className="flex items-center text-[var(--primary)]"><HotelOutlined/></div><p className=" h-full flex items-center text-slate-800">2 bedroom</p>
                            </div>
                            <div className='flex justify-center  gap-2'>
                            <div className="flex items-center"><div className="flex items-center text-[var(--primary)]"><Apartment/></div></div><p className=" h-full flex items-center text-slate-800">1050 Sq Ft</p>
                            </div>
                        </div>


                </Card>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      {windowWidth >= 768 && (
        <IconButton className="bg-white" onClick={() => sliderRef.current?.slickNext()}>
          <ArrowForwardIos />
        </IconButton>
      )}
    </div>
  );
};

export default Carousel;

