import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSelector = ({ 
  currentLanguage = 'en',
  onLanguageChange,
  position = 'top-right',
  variant = 'default',
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ];

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('disasteredpro-language');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setSelectedLanguage(savedLanguage);
      if (onLanguageChange) {
        onLanguageChange(savedLanguage);
      }
    }
  }, []);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('disasteredpro-language', languageCode);
    setIsOpen(false);
    
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === selectedLanguage) || languages?.[0];
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'right-0 mt-2';
      case 'bottom-right':
        return 'right-0 mb-2 bottom-full';
      case 'bottom-left':
        return 'left-0 mb-2 bottom-full';
      default: // top-right
        return 'right-0 mt-2';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'border-0 bg-transparent hover:bg-muted';
      case 'outline':
        return 'border border-border bg-background hover:bg-muted';
      default:
        return 'bg-card border border-border hover:bg-muted';
    }
  };

  const currentLang = getCurrentLanguage();

  return (
    <div className={`relative ${className}`}>
      {/* Language Selector Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${getVariantStyles()}`}
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline font-medium text-sm">
          {currentLang?.code?.toUpperCase()}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground"
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Modal Overlay */}
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-sm max-h-96 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-lg">
                  Select Language
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1"
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {languages?.map((language) => (
                  <button
                    key={language?.code}
                    onClick={() => handleLanguageSelect(language?.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-200 ${
                      selectedLanguage === language?.code 
                        ? 'bg-primary/10 text-primary' :'text-foreground'
                    }`}
                  >
                    <span className="text-xl">{language?.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{language?.nativeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {language?.name}
                      </div>
                    </div>
                    {selectedLanguage === language?.code && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Dropdown */}
          <div className={`hidden md:block absolute ${getPositionStyles()} w-64 bg-popover border border-border rounded-md shadow-dropdown z-50`}>
            <div className="py-1 max-h-80 overflow-y-auto">
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageSelect(language?.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted transition-colors duration-200 ${
                    selectedLanguage === language?.code 
                      ? 'bg-primary/10 text-primary' :'text-popover-foreground'
                  }`}
                >
                  <span className="text-lg">{language?.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{language?.nativeName}</div>
                    <div className="text-xs text-muted-foreground">
                      {language?.name}
                    </div>
                  </div>
                  {selectedLanguage === language?.code && (
                    <Icon name="Check" size={14} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {/* Click outside handler */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;