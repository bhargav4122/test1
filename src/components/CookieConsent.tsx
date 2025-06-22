
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { preferences, acceptAll, rejectAll, updatePreferences } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);
  
   useEffect(() => {
    // Check localStorage for previous interaction
    const consentStatus = localStorage.getItem('cookieConsent');
    if (!consentStatus) {
      setShowBanner(true);
    } else if (consentStatus === 'accepted') {
      setIsAccepted(true);
    }
  }, []);

  const handleInteraction = (action: string) => {
    localStorage.setItem('cookieConsent', action);
    setShowBanner(false);
    if (action === 'accepted') {
      setIsAccepted(true);
    }
  };

  const handleAcceptAll = () => {
    acceptAll();
    handleInteraction('accepted');
  };

  const handleRejectAll = () => {
    rejectAll();
    handleInteraction('rejected');
  };

  const handleSavePreferences = () => {
    updatePreferences(tempPreferences);
    handleInteraction('customized');
    setShowPreferences(false);
  };

  // Don't show if user has already accepted
  if (!showBanner) return null;

   return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-background border-t border-border shadow-lg"
          >
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {/* Updated icon - shows Check if accepted, Cookie otherwise */}
                  {isAccepted ? (
                    <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {isAccepted ? 'Preferences Saved' : 'We value your privacy'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {isAccepted ? (
                        'Your cookie preferences have been saved. You can update them anytime.'
                      ) : (
                        'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.'
                      )}
                    </p>
                    {!isAccepted && (
                      <button
                        onClick={() => navigate('/cookies')}
                        className="text-sm text-primary hover:underline"
                      >
                        Learn more about our cookie policy
                      </button>
                    )}
                  </div>
                </div>
                
                {!isAccepted ? (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreferences(true)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Customize
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Accept All
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBanner(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you'd like to accept. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">Required for basic website functionality</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Always Active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">Help us improve our website</p>
              </div>
              <Switch
                checked={tempPreferences.analytics}
                onCheckedChange={(checked) => 
                  setTempPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground">Personalize ads and content</p>
              </div>
              <Switch
                checked={tempPreferences.marketing}
                onCheckedChange={(checked) => 
                  setTempPreferences(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowPreferences(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;