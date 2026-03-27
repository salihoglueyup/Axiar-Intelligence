// Internationalization API endpoints
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang');
    const namespace = searchParams.get('namespace') || 'common';
    
    let data;
    
    if (language) {
      data = await getTranslations(language, namespace);
    } else {
      data = await getSupportedLanguages();
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, translationData } = body;

    switch (action) {
      case 'translate':
        const translation = await translateText(translationData);
        return new Response(JSON.stringify({
          success: true,
          data: translation
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'upload':
        const uploadResult = await uploadTranslations(translationData);
        return new Response(JSON.stringify({
          success: true,
          data: uploadResult
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'validate':
        const validation = await validateTranslations(translationData);
        return new Response(JSON.stringify({
          success: true,
          data: validation
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
async function getSupportedLanguages() {
  // Mock data - replace with actual database query
  return [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      region: 'US',
      rtl: false,
      completion: 100,
      lastUpdated: '2024-03-20T10:00:00Z'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      region: 'ES',
      rtl: false,
      completion: 95,
      lastUpdated: '2024-03-18T15:30:00Z'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      region: 'FR',
      rtl: false,
      completion: 92,
      lastUpdated: '2024-03-15T09:00:00Z'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      region: 'DE',
      rtl: false,
      completion: 88,
      lastUpdated: '2024-03-12T14:20:00Z'
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      region: 'IT',
      rtl: false,
      completion: 85,
      lastUpdated: '2024-03-10T11:45:00Z'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      region: 'PT',
      rtl: false,
      completion: 82,
      lastUpdated: '2024-03-08T16:30:00Z'
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      region: 'RU',
      rtl: false,
      completion: 78,
      lastUpdated: '2024-03-05T13:15:00Z'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      region: 'CN',
      rtl: false,
      completion: 75,
      lastUpdated: '2024-03-03T10:00:00Z'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      region: 'JP',
      rtl: false,
      completion: 80,
      lastUpdated: '2024-03-07T12:00:00Z'
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      region: 'KR',
      rtl: false,
      completion: 72,
      lastUpdated: '2024-03-01T09:30:00Z'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      region: 'SA',
      rtl: true,
      completion: 68,
      lastUpdated: '2024-02-28T14:45:00Z'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      region: 'IN',
      rtl: false,
      completion: 65,
      lastUpdated: '2024-02-25T11:20:00Z'
    },
    {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      flag: '🇹🇷',
      region: 'TR',
      rtl: false,
      completion: 90,
      lastUpdated: '2024-03-19T15:00:00Z'
    }
  ];
}

async function getTranslations(language, namespace) {
  // Mock translation data - replace with actual database query
  const translations = {
    en: {
      common: {
        'welcome': 'Welcome',
        'login': 'Login',
        'logout': 'Logout',
        'save': 'Save',
        'cancel': 'Cancel',
        'delete': 'Delete',
        'edit': 'Edit',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success'
      },
      navigation: {
        'home': 'Home',
        'dashboard': 'Dashboard',
        'projects': 'Projects',
        'reports': 'Reports',
        'settings': 'Settings'
      }
    },
    es: {
      common: {
        'welcome': 'Bienvenido',
        'login': 'Iniciar sesión',
        'logout': 'Cerrar sesión',
        'save': 'Guardar',
        'cancel': 'Cancelar',
        'delete': 'Eliminar',
        'edit': 'Editar',
        'loading': 'Cargando...',
        'error': 'Error',
        'success': 'Éxito'
      },
      navigation: {
        'home': 'Inicio',
        'dashboard': 'Panel',
        'projects': 'Proyectos',
        'reports': 'Informes',
        'settings': 'Configuración'
      }
    },
    tr: {
      common: {
        'welcome': 'Hoş Geldiniz',
        'login': 'Giriş Yap',
        'logout': 'Çıkış Yap',
        'save': 'Kaydet',
        'cancel': 'İptal',
        'delete': 'Sil',
        'edit': 'Düzenle',
        'loading': 'Yükleniyor...',
        'error': 'Hata',
        'success': 'Başarılı'
      },
      navigation: {
        'home': 'Ana Sayfa',
        'dashboard': 'Panel',
        'projects': 'Projeler',
        'reports': 'Raporlar',
        'settings': 'Ayarlar'
      }
    }
  };

  const langTranslations = translations[language];
  
  if (!langTranslations) {
    throw new Error(`Language '${language}' not supported`);
  }

  const namespaceTranslations = langTranslations[namespace];
  
  if (!namespaceTranslations) {
    throw new Error(`Namespace '${namespace}' not found for language '${language}'`);
  }

  return {
    language: language,
    namespace: namespace,
    translations: namespaceTranslations,
    rtl: getLanguageRTL(language),
    lastUpdated: new Date().toISOString()
  };
}

async function translateText(translationData) {
  const { text, targetLanguage, sourceLanguage = 'auto' } = translationData;
  
  // Mock translation - replace with actual translation service
  const mockTranslations = {
    'hello': {
      es: 'Hola',
      fr: 'Bonjour',
      de: 'Hallo',
      it: 'Ciao',
      pt: 'Olá',
      ru: 'Привет',
      zh: '你好',
      ja: 'こんにちは',
      ko: '안녕하세요',
      ar: 'مرحبا',
      hi: 'नमस्ते',
      tr: 'Merhaba'
    },
    'welcome': {
      es: 'Bienvenido',
      fr: 'Bienvenue',
      de: 'Willkommen',
      it: 'Benvenuto',
      pt: 'Bem-vindo',
      ru: 'Добро пожаловать',
      zh: '欢迎',
      ja: 'ようこそ',
      ko: '환영합니다',
      ar: 'أهلا بك',
      hi: 'स्वागतम',
      tr: 'Hoş geldiniz'
    }
  };

  const lowerText = text.toLowerCase();
  const translation = mockTranslations[lowerText]?.[targetLanguage];
  
  if (!translation) {
    // Fallback to original text if no translation found
    return {
      originalText: text,
      translatedText: text,
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      confidence: 0.1,
      detectedLanguage: 'unknown'
    };
  }

  return {
    originalText: text,
    translatedText: translation,
    sourceLanguage: sourceLanguage,
    targetLanguage: targetLanguage,
    confidence: 0.95,
    detectedLanguage: 'en'
  };
}

async function uploadTranslations(translationData) {
  const { language, namespace, translations, overwrite = false } = translationData;
  
  // Validate input
  if (!language || !namespace || !translations) {
    throw new Error('Language, namespace, and translations are required');
  }

  // Validate translations format
  if (typeof translations !== 'object') {
    throw new Error('Translations must be an object');
  }

  // Check for existing translations
  const existing = await getTranslations(language, namespace);
  
  if (existing && !overwrite) {
    throw new Error(`Translations already exist for ${language}/${namespace}. Use overwrite=true to replace.`);
  }

  // Save translations (mock implementation)
  const result = {
    language: language,
    namespace: namespace,
    keysCount: Object.keys(translations).length,
    uploadedAt: new Date().toISOString(),
    status: 'uploaded',
    overwrite: overwrite
  };

  // In production, this would save to database
  console.log('Uploading translations:', result);
  
  return result;
}

async function validateTranslations(translationData) {
  const { language, namespace, translations } = translationData;
  
  const validation = {
    language: language,
    namespace: namespace,
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalKeys: 0,
      emptyKeys: 0,
      duplicateKeys: 0,
      missingKeys: 0
    }
  };

  // Check if translations exist
  try {
    const existing = await getTranslations(language, namespace);
    validation.stats.missingKeys = Object.keys(existing.translations).length;
  } catch (error) {
    // No existing translations
    validation.stats.missingKeys = 0;
  }

  // Validate translation keys
  const keys = Object.keys(translations);
  validation.stats.totalKeys = keys.length;
  
  // Check for empty translations
  for (const [key, value] of Object.entries(translations)) {
    if (!value || value.trim() === '') {
      validation.stats.emptyKeys++;
      validation.warnings.push(`Empty translation for key: ${key}`);
    }
  }

  // Check for duplicate keys (case-insensitive)
  const lowerKeys = keys.map(k => k.toLowerCase());
  const uniqueKeys = new Set(lowerKeys);
  validation.stats.duplicateKeys = lowerKeys.length - uniqueKeys.size;
  
  if (validation.stats.duplicateKeys > 0) {
    validation.isValid = false;
    validation.errors.push(`${validation.stats.duplicateKeys} duplicate keys found`);
  }

  // Validate language support
  const supportedLanguages = await getSupportedLanguages();
  const isSupported = supportedLanguages.some(lang => lang.code === language);
  
  if (!isSupported) {
    validation.isValid = false;
    validation.errors.push(`Language '${language}' is not supported`);
  }

  // Check for common translation patterns
  const commonPatterns = {
    placeholders: /\{[^}]+\}/g,
    htmlTags: /<[^>]+>/g,
    specialChars: /[^\w\s\-\.\,\!\?\:\;'"@#$%^&*()_+=\[\]{}|\\\/]/g
  };

  for (const [key, value] of Object.entries(translations)) {
    // Check for placeholders
    const placeholders = value.match(commonPatterns.placeholders);
    if (placeholders && placeholders.length > 0) {
      validation.warnings.push(`Placeholders found in translation: ${key} (${placeholders.join(', ')})`);
    }

    // Check for HTML tags
    const htmlTags = value.match(commonPatterns.htmlTags);
    if (htmlTags && htmlTags.length > 0) {
      validation.warnings.push(`HTML tags found in translation: ${key} (${htmlTags.join(', ')})`);
    }
  }

  return validation;
}

function getLanguageRTL(language) {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi'];
  return rtlLanguages.includes(language);
}

// Database operations (mock implementations)
async function saveTranslation(language, namespace, translations) {
  console.log('Saving translations:', { language, namespace, count: Object.keys(translations).length });
}
