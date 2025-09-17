import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import LanguageSelector from '../../components/ui/LanguageSelector';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import RegionalSection from './components/RegionalSection';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [emergencyAlert, setEmergencyAlert] = useState(null);

  // Mock emergency alert data
  const mockAlert = {
    id: 1,
    severity: 'high',
    title: 'Heavy Rainfall Alert - Delhi NCR',
    location: 'Delhi, Gurgaon, Noida',
    time: '2 hours ago',
    description: 'Heavy to very heavy rainfall expected in Delhi NCR region. Schools advised to review evacuation procedures and ensure proper drainage systems are functional.',
    actions: [
      'Review school evacuation routes',
      'Check drainage systems',
      'Prepare emergency contact lists',
      'Monitor weather updates regularly'
    ]
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('disasteredpro-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate emergency alert (show for demo purposes)
    const showAlert = Math.random() > 0.7; // 30% chance to show alert
    if (showAlert) {
      setEmergencyAlert(mockAlert);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('disasteredpro-language', languageCode);
  };

  const handleDismissAlert = () => {
    setEmergencyAlert(null);
  };

  // Language-specific content
  const getLocalizedContent = () => {
    const content = {
      en: {
        pageTitle: 'DisasterEd Pro - Disaster Preparedness Education Platform for Indian Schools',
        pageDescription: 'Comprehensive disaster preparedness education platform with interactive learning modules, virtual drills, and gamified experiences for schools across India.'
      },
      hi: {
        pageTitle: 'DisasterEd Pro - भारतीय स्कूलों के लिए आपदा तैयारी शिक्षा मंच',
        pageDescription: 'भारत भर के स्कूलों के लिए इंटरैक्टिव लर्निंग मॉड्यूल, वर्चुअल ड्रिल और गेमिफाइड अनुभवों के साथ व्यापक आपदा तैयारी शिक्षा मंच।'
      }
    };

    return content?.[currentLanguage] || content?.en;
  };

  const localizedContent = getLocalizedContent();

  return (
    <>
      <Helmet>
        <title>{localizedContent?.pageTitle}</title>
        <meta name="description" content={localizedContent?.pageDescription} />
        <meta name="keywords" content="disaster preparedness, education, schools, India, emergency response, virtual drills, safety training" />
        <meta name="author" content="DisasterEd Pro" />
        <meta property="og:title" content={localizedContent?.pageTitle} />
        <meta property="og:description" content={localizedContent?.pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://disasteredpro.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={localizedContent?.pageTitle} />
        <meta name="twitter:description" content={localizedContent?.pageDescription} />
        <link rel="canonical" href="https://disasteredpro.in" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Emergency Alert Banner */}
        {emergencyAlert && (
          <EmergencyAlertBanner
            alert={emergencyAlert}
            onDismiss={handleDismissAlert}
          />
        )}

        {/* Header */}
        <Header />

        {/* Language Selector - Fixed Position */}
        <div className="fixed top-20 right-4 z-40">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            variant="outline"
            position="top-right"
          />
        </div>

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Regional Customization Section */}
          <RegionalSection />

          {/* Registration Section */}
          <RegistrationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default LandingPage;