"use client";

import React from "react";
import Link from "next/link";
import { Image, Button , Card} from "@/components";
import { CustomizedTextField, CustomizedSelect } from "@/components/field";
import { APP_ROUTES, ASSETS } from "@/config";
import { KeyboardArrowDownOutlined, SearchOutlined} from "@mui/icons-material";


// Define type for search cards
interface SearchCardType {
  title: string;
  type: "search" | "options";
  icon: React.ReactNode;
}

const SearchCard: SearchCardType[] = [
  { title: "Keyword", type: "search", icon: <SearchOutlined /> },
  { title: "Property Type", type: "options", icon: <KeyboardArrowDownOutlined /> },
  { title: "Location", type: "search", icon: <SearchOutlined /> },
  { title: "Price", type: "options", icon: <KeyboardArrowDownOutlined /> },
];

const cards = [
  { title: "Card 1" },
  { title: "Card 2" },
  { title: "Card 3" },
  { title: "Card 4" },
  { title: "Card 5" },
  { title: "Card 6" },
];

interface HeroTextProps {
  className?: string;
}

const HeroText: React.FC<HeroTextProps> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <h1 className="text-[#fff] md:text-[55px] sm:text-5xl text-5xl md:text-start sm:text-center text-start">
          Find Perfect House From Your Area.
        </h1>
      </div>
      <p className="text-slate-200 md:text-base text-sm sm:text-center md:text-start text-start w-[80%] md:py-4 py-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit esse voluptas iusto reiciendis ratione ullam id, repellendus tempore blanditiis velit!
      </p>
      <Link href={APP_ROUTES.PROPERTIES} className="max-w-52 sm:mx-auto md:mx-0 flex justify-start">
        <Button
          color="#fff"
          background="var(--primary)"
          className="w-full h-[38px] lg:h-[45px] p-[38px] rounded-[30px] normal-case font-[300] text-xs md:text-[15px]"
        >
          VIEW ALL PROPERTIES
        </Button>
      </Link>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="md:fixed flex justify-center items-center section-x w-full h-[100vh]">
      <div className="w-full h-full absolute z-[2] top-0 right-0 bottom-0 left-0 max-w-[2000px]">
        <Image alt="Welcome to Real Estate" src={ASSETS.HOME_HERO} className="w-full h-[100vh] object-cover" />
      </div>
      <div className="absolute inset-0 bg-slate-600 opacity-50 min-h-screen z-[3] w-full max-w-[2000px]" />
      <HeroText className="absolute z-[5] flex flex-col md:top-[30%] md:left-[6%] md:max-w-2xl md:gap-3 gap-2 md:w-full sm:w-[90%] w-[95%] p-4 md:hidden sm:items-center" />
    </section>
  );
};

const SearchPropertyCard: React.FC = () => {
  return (
    <div className="bg-white section-x md:py-0 md:pb-[60px] py-[50px]">
      <HeroText className="md:-top-[568px] absolute z-[5] md:max-w-2xl md:gap-3 gap-2 md:w-full sm:w-[90%] w-[95%] p-4 md:block hidden top-[40%]" />
      <div className="md:relative flex justify-center w-full md:-top-14">
        <div className="bg-[#020122] rounded-lg shadow-lg text-slate-300 flex-col md:flex-row flex justify-between md:w-[820px] w-full md:py-0 p-4">
          {SearchCard.map((card, index) => (
            <div key={index} className="w-full sm:p-4 p-2">
              <div className="flex w-full gap-x-2">
                <div>{card.title}</div>
              </div>
              <div className="py-2 flex gap-x-2 justify-center items-center">
                {card.type === "search" ? (
                  <CustomizedTextField className="" placeholder="search" icon={card.icon} />
                ) : (
                  <CustomizedSelect
                    className=""
                    icon={card.icon}
                    placeholder="select"
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                    ]}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="w-full flex items-center justify-center h-full p-4">
            <Button color="#fff" background="var(--primary)" className="h-14 w-full">
              SEARCH
            </Button>
          </div>
        </div>
      </div>


    </div>
  );
};

const FeaturedProperties: React.FC = () => {
  return <section className="section-x">

            <div className="flex flex-col md:gap-4 gap-2">
              <div className = 'text-slate-500 text-center '>THE BEST DEALS</div>
              <h2 className="text-center text-slate-800 md:text-5xl">Featured Properties</h2>
            </div>

            <div className="py-6">
              <Card cards={cards}/>
            </div>





          </section>;
};

const Client: React.FC = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <div className="md:relative md:-bottom-[120vh] bg-white">
        <SearchPropertyCard />
        <FeaturedProperties  />
      </div>
    </div>
  );
};

export default Client;
