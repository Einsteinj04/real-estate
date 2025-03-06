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

    const anchors = document.querySelectorAll(element);
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
  const [hideNavbar, setHideNavBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0); // useRef for tracking previous scroll position

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    setIsScrolled(currentScrollY > initialScrollLength);

    if (currentScrollY > furtherScrollLength && currentScrollY > lastScrollY.current) {
      setHideNavBar(true);
    } else if (currentScrollY < lastScrollY.current) {
      setHideNavBar(false);
    }

    lastScrollY.current = currentScrollY; // Updating useRef value
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { hideNavbar, isScrolled };
};


// export const HideShowNavbarOnScroll = ({
//   targetRef,
//   className,
//   startPosition,
// }: {
//   targetRef: RefObject<HTMLElement>;
//   className: string;
//   startPosition: number;
// }) => {
//   useEffect(() => {
//     let prevScrollpos = window.pageYOffset;

//     const handleFunction = () => {
//       if (!targetRef?.current) return;
//       if (window.scrollY === 0) targetRef.current.classList.remove(...className.split(" "));
//       if (window.scrollY < startPosition) return;

//       let currentScrollPos = window.pageYOffset;
//       if (prevScrollpos > currentScrollPos) targetRef.current.classList.remove(...className.split(" "));
//       else targetRef.current.classList.add(...className.split(" "));
//       prevScrollpos = currentScrollPos;
//     };

//     window.addEventListener("scroll", handleFunction);
//     return () => window.removeEventListener("scroll", handleFunction);
//   }, [targetRef, className, startPosition]);
// };

// Change class name at a specific scroll position
export const ChangeClassNameAtPosition = ({
  targetRef,
  startPosition,
  className,
}: {
  targetRef: RefObject<HTMLElement>;
  startPosition: number;
  className: string;
}) => {
  useEffect(() => {
    const handleFunction = () => {
      if (!targetRef?.current) return;
      if (window.scrollY > startPosition) targetRef.current.classList.add(...className.split(" "));
      else targetRef.current.classList.remove(...className.split(" "));
    };

    window.addEventListener("scroll", handleFunction);
    return () => window.removeEventListener("scroll", handleFunction);
  }, [targetRef, startPosition, className]);
};

// Load more data when reaching the bottom of the window
export const LoadMoreDataAtWindowBottom = ({ fetching }: { fetching: boolean }) => {
  const [loadMore, setLoadMore] = useState(false);
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
export const ShowElementAtPosition = ({
  targetRef,
  position,
}: {
  targetRef: RefObject<HTMLElement>;
  position: number;
}) => {
  useEffect(() => {
    const handleFunction = () => {
      if (!targetRef?.current) return;
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
