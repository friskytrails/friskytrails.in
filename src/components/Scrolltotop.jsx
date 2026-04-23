import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Scrolltotop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Aggressive scroll to top for all possible scroll containers
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    };

    // Execute immediately before paint
    scrollToTop();

    // Still use a tiny timeout just in case of slow rendering or Suspense
    const timeoutId = setTimeout(scrollToTop, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default Scrolltotop;
