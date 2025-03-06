"use client";
import { APP_ROUTES } from "@/config";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const defaultURL: string = APP_ROUTES.HOME;

const useWindowLocation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [windowLocation, setWindowLocation] = useState<string>(defaultURL);

  useEffect(() => {
    setWindowLocation(window.location.href);
  }, [pathname, searchParams]);

  return { windowLocation, pathname, searchParams };
};

export default useWindowLocation;
