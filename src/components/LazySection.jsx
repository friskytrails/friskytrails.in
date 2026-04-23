import React, { useState, useEffect, useRef, Suspense } from 'react';
import Skeleton from './Skeleton';

const LazySection = ({ children, height = "400px", skeleton = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before it enters the viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible ? (
        <Suspense fallback={skeleton ? <Skeleton height={height} width="100%" borderRadius="1rem" /> : null}>
          {children}
        </Suspense>
      ) : (
        skeleton && <Skeleton height={height} width="100%" borderRadius="1rem" />
      )}
    </div>
  );
};

export default LazySection;
