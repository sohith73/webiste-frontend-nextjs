"use client";

import { useEffect } from "react";

type ScrollToSectionProps = {
  targetId: string;
};

export default function ScrollToSection({
  targetId,
}: ScrollToSectionProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const attemptScroll = (attempt = 1, maxAttempts = 10) => {
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const stickyNavbar = document.querySelector('.sticky.top-0') || 
                           document.querySelector('nav') ||
                           document.querySelector('[class*="nav"]');
        const navbarHeight = stickyNavbar 
          ? stickyNavbar.getBoundingClientRect().height 
          : 0;
        
         const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        
        const offset = navbarHeight + 20;
        const offsetPosition = Math.max(0, elementTop - offset);
        
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'instant' as ScrollBehavior,
        });
        
        console.log(`✅ Jumped to section start: ${targetId}`);
      } else if (attempt < maxAttempts) {
        console.log(`⏳ Waiting for section "${targetId}" to render (attempt ${attempt}/${maxAttempts})...`);
        setTimeout(() => attemptScroll(attempt + 1, maxAttempts), 100);
      } else {
        console.warn(`❌ Could not find section with id="${targetId}" after ${maxAttempts} attempts`);
      }
    };

    const scrollTimer = setTimeout(() => attemptScroll(), 100);

    return () => clearTimeout(scrollTimer);
  }, [targetId]);

  return null;
}

