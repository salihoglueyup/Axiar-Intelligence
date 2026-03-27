import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ChevronDown, 
  Check, 
  Languages,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Flag
} from 'lucide-react';

const LanguageSelector = ({ onLanguageChange, currentLanguage = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      region: 'US',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      rtl: false
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      region: 'ES',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'EUR',
      rtl: false
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      region: 'FR',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'EUR',
      rtl: false
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      region: 'DE',
      dateFormat: 'DD.MM.YYYY',
      timeFormat: '24h',
      currency: 'EUR',
      rtl: false
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      region: 'IT',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'EUR',
      rtl: false
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      region: 'PT',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'EUR',
      rtl: false
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      region: 'RU',
      dateFormat: 'DD.MM.YYYY',
      timeFormat: '24h',
      currency: 'RUB',
      rtl: false
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      region: 'CN',
      dateFormat: 'YYYY/MM/DD',
      timeFormat: '24h',
      currency: 'CNY',
      rtl: false
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      region: 'JP',
      dateFormat: 'YYYY/MM/DD',
      timeFormat: '24h',
      currency: 'JPY',
      rtl: false
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      region: 'KR',
      dateFormat: 'YYYY.MM.DD',
      timeFormat: '24h',
      currency: 'KRW',
      rtl: false
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      region: 'SA',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '12h',
      currency: 'SAR',
      rtl: true
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      region: 'IN',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '12h',
      currency: 'INR',
      rtl: false
    },
    {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      flag: '🇹🇷',
      region: 'TR',
      dateFormat: 'DD.MM.YYYY',
      timeFormat: '24h',
      currency: 'TRY',
      rtl: false
    }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsOpen(false);
    
    // Update document direction for RTL languages
    document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language.code;
    
    // Notify parent component
    if (onLanguageChange) {
      onLanguageChange(language);
    }
    
    // Store preference
    localStorage.setItem('preferred-language', language.code);
  };

  return (
    <div className="language-selector relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500 transition-colors"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-white text-sm font-medium">{currentLang.nativeName}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center space-x-2 px-3 py-2 mb-2 text-gray-400 text-sm">
              <Globe className="w-4 h-4" />
              <span>Select Language</span>
            </div>
            
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                  selectedLanguage === language.code
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{language.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-400">{language.name}</div>
                  </div>
                </div>
                
                {selectedLanguage === language.code && (
                  <Check className="w-4 h-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-800 p-3">
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>Region:</span>
                <span className="text-gray-300">{currentLang.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date Format:</span>
                <span className="text-gray-300">{currentLang.dateFormat}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time Format:</span>
                <span className="text-gray-300">{currentLang.timeFormat}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Currency:</span>
                <span className="text-gray-300">{currentLang.currency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
