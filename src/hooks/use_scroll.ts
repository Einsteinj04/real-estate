"use client";
import { useEffect, useState, RefObject, useRef } from "react";

// Smooth scrolling function
export const SmoothScrollToLink = ({
  element,
  elementAttributeName,
}: {
  element: string;
  elementAttributeName: string;
}) => {
  useEffect(() => {
    const handleScroll = (e: Event, anchor: Element) => {
      e.preventDefault();

      const targetId = anchor.getAttribute(elementAttributeName)?.substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.scrollTo({
          top: rect.top + scrollTop,
          behavior: "smooth",
        });
      }
    };

    const anchors = document.querySelectorAll<HTMLElement>(element);
    anchors.forEach((anchor) => anchor.addEventListener("click", (e) => handleScroll(e, anchor)));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", (e) => handleScroll(e, anchor)));
    };
  }, [element, elementAttributeName]);
};

// Hide/Show Navbar on Scroll
interface HideShowNavbarProps {
  initialScrollLength: number;
  furtherScrollLength: number;
}

export const HideShowNavbarOnScroll = ({ initialScrollLength, furtherScrollLength }: HideShowNavbarProps) => {
  const [hideNavbar, setHideNavBar] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > initialScrollLength);

    if (currentScrollY > furtherScrollLength && currentScrollY > lastScrollY.current) {
      setHideNavBar(true);
    } else if (currentScrollY < lastScrollY.current) {
      setHideNavBar(false);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { hideNavbar, isScrolled };
};

// Change class name at a specific scroll position
interface ChangeClassNameAtPositionProps {
  targetRef: RefObject<HTMLElement>;
  startPosition: number;
  className: string;
}

export const ChangeClassNameAtPosition = ({ targetRef, startPosition, className }: ChangeClassNameAtPositionProps) => {
  useEffect(() => {
    const handleFunction = () => {
      if (!targetRef.current) return;
      if (window.scrollY > startPosition) {
        targetRef.current.classList.add(...className.split(" "));
      } else {
        targetRef.current.classList.remove(...className.split(" "));
      }
    };

    window.addEventListener("scroll", handleFunction);
    return () => window.removeEventListener("scroll", handleFunction);
  }, [targetRef, startPosition, className]);
};

// Load more data when reaching the bottom of the window
interface LoadMoreDataAtWindowBottomProps {
  fetching: boolean;
}

export const LoadMoreDataAtWindowBottom = ({ fetching }: LoadMoreDataAtWindowBottomProps) => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [scrollPos, setScrollPos] = useState<number>(0);

  useEffect(() => {
    const handleFunction = () => {
      if (fetching) return;
      if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
        setLoadMore(true);
        setScrollPos(window.scrollY);
      } else {
        if (fetching) return;
        setLoadMore(false);
      }
    };

    window.addEventListener("scroll", handleFunction);
    return () => window.removeEventListener("scroll", handleFunction);
  }, [fetching]);

  return { loadMore, scrollPos };
};

// Show or hide element at a specific scroll position
interface ShowElementAtPositionProps {
  targetRef: RefObject<HTMLElement>;
  position: number;
}

export const ShowElementAtPosition = ({ targetRef, position }: ShowElementAtPositionProps) => {
  useEffect(() => {
    const handleFunction = () => {
      if (!targetRef.current) return;
      if (window.scrollY > position || document.documentElement.scrollTop > position) {
        targetRef.current.style.display = "block";
      } else {
        targetRef.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleFunction);
    return () => window.removeEventListener("scroll", handleFunction);
  }, [targetRef, position]);
};
