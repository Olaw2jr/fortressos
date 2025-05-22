"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'x-large';
  setFontSize: (size: 'normal' | 'large' | 'x-large') => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  announceMessage: (message: string, assertive?: boolean) => void;
}

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  toggleHighContrast: () => { },
  fontSize: 'normal',
  setFontSize: () => { },
  reducedMotion: false,
  toggleReducedMotion: () => { },
  announceMessage: () => { },
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'x-large'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState<'assertive' | 'polite'>('polite');

  // Load settings from localStorage on component mount
  useEffect(() => {
    // High contrast
    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast) {
      setHighContrast(savedHighContrast === 'true');
    } else {
      // Check system preference
      const prefersDarkColorScheme = window.matchMedia('(prefers-contrast: more)').matches;
      setHighContrast(prefersDarkColorScheme);
    }

    // Font size
    const savedFontSize = localStorage.getItem('fontSize') as 'normal' | 'large' | 'x-large';
    if (savedFontSize && ['normal', 'large', 'x-large'].includes(savedFontSize)) {
      setFontSize(savedFontSize);
    }

    // Reduced motion
    const savedReducedMotion = localStorage.getItem('reducedMotion');
    if (savedReducedMotion) {
      setReducedMotion(savedReducedMotion === 'true');
    } else {
      // Check system preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(prefersReducedMotion);
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('highContrast', String(highContrast));
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.dataset.fontSize = fontSize;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('reducedMotion', String(reducedMotion));
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  // Clear announcements after they're read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => {
        setAnnouncement('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  const announceMessage = (message: string, assertive = false) => {
    setAnnouncement(message);
    setAnnouncementType(assertive ? 'assertive' : 'polite');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        toggleReducedMotion,
        announceMessage,
      }}
    >
      {children}
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live={announcementType} aria-atomic="true">
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}
