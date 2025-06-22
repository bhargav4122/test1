import { useState, useEffect } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsent {
  hasConsented: boolean;
  preferences: CookiePreferences;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  hideBanner: () => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const useCookieConsent = (): CookieConsent => {
  const [hasConsented, setHasConsented] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    const storedPreferences = localStorage.getItem('cookiePreferences');

    if (storedConsent) {
      setHasConsented(true);
      setShowBanner(false);
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    setHasConsented(true);
    setPreferences(prefs);
    setShowBanner(false);

    // Set actual cookies based on preferences
    if (prefs.analytics) {
      // Enable analytics tracking
      console.log('Analytics cookies enabled');
    }
    
    if (prefs.marketing) {
      // Enable marketing tracking
      console.log('Marketing cookies enabled');
    }
  };

  const acceptAll = () => {
    const allAcceptedPrefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAcceptedPrefs);
  };

  const rejectAll = () => {
    saveConsent(defaultPreferences);
  };

  const updatePreferences = (newPrefs: Partial<CookiePreferences>) => {
    const updatedPrefs = { ...preferences, ...newPrefs };
    saveConsent(updatedPrefs);
  };

  const hideBanner = () => {
    setShowBanner(false);
  };

  return {
    hasConsented,
    preferences,
    showBanner,
    acceptAll,
    rejectAll,
    updatePreferences,
    hideBanner,
  };
};