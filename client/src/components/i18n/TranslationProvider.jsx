import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation context
const TranslationContext = createContext();

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.reports': 'Reports',
    'nav.invoices': 'Invoices',
    'nav.settings': 'Settings',
    'nav.enterprise': 'Enterprise',
    'nav.ai': 'AI/ML',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.view': 'View',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.refresh': 'Refresh',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.copy': 'Copy',
    'common.share': 'Share',
    'common.print': 'Print',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.website': 'Website',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.name': 'Name',
    'common.description': 'Description',
    'common.category': 'Category',
    'common.type': 'Type',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.pending': 'Pending',
    'common.completed': 'Completed',
    'common.failed': 'Failed',
    'common.cancelled': 'Cancelled',
    
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.signup': 'Sign Up',
    'auth.forgot': 'Forgot Password?',
    'auth.remember': 'Remember me',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.welcome': 'Welcome',
    'auth.loginSuccess': 'Login successful',
    'auth.loginError': 'Login failed',
    'auth.invalidCredentials': 'Invalid credentials',
    'auth.accountCreated': 'Account created successfully',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.stats': 'Statistics',
    'dashboard.totalUsers': 'Total Users',
    'dashboard.totalProjects': 'Total Projects',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.growth': 'Growth',
    
    // Projects
    'projects.title': 'Projects',
    'projects.create': 'Create Project',
    'projects.edit': 'Edit Project',
    'projects.delete': 'Delete Project',
    'projects.name': 'Project Name',
    'projects.description': 'Project Description',
    'projects.status': 'Project Status',
    'projects.startDate': 'Start Date',
    'projects.endDate': 'End Date',
    'projects.budget': 'Budget',
    'projects.team': 'Team',
    'projects.progress': 'Progress',
    'projects.tasks': 'Tasks',
    'project.planning': 'Planning',
    'project.inProgress': 'In Progress',
    'project.completed': 'Completed',
    'project.onHold': 'On Hold',
    'project.cancelled': 'Cancelled',
    
    // Reports
    'reports.title': 'Reports',
    'reports.generate': 'Generate Report',
    'reports.download': 'Download Report',
    'reports.filter': 'Filter Reports',
    'reports.dateRange': 'Date Range',
    'reports.type': 'Report Type',
    'reports.summary': 'Summary',
    'reports.details': 'Details',
    'reports.charts': 'Charts',
    'reports.export': 'Export',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.security': 'Security',
    'settings.preferences': 'Preferences',
    'settings.notifications': 'Notifications',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.privacy': 'Privacy',
    'settings.account': 'Account',
    'settings.changePassword': 'Change Password',
    'settings.twoFactor': 'Two-Factor Authentication',
    'settings.sessionTimeout': 'Session Timeout',
    
    // Enterprise
    'enterprise.title': 'Enterprise',
    'enterprise.sso': 'SSO Management',
    'enterprise.roles': 'Role Management',
    'enterprise.audit': 'Audit Logs',
    'enterprise.governance': 'Data Governance',
    'enterprise.analytics': 'Enterprise Analytics',
    'enterprise.security': 'Security',
    'enterprise.compliance': 'Compliance',
    
    // AI/ML
    'ai.title': 'AI/ML Platform',
    'ai.models': 'Models',
    'ai.training': 'Training',
    'ai.inference': 'Inference',
    'ai.datasets': 'Datasets',
    'ai.experiments': 'Experiments',
    'ai.deployment': 'Deployment',
    'ai.monitoring': 'Monitoring',
    'ai.computerVision': 'Computer Vision',
    'ai.nlp': 'Natural Language Processing',
    'ai.predictive': 'Predictive Analytics',
    
    // Forms
    'form.required': 'This field is required',
    'form.invalidEmail': 'Please enter a valid email',
    'form.minLength': 'Minimum length is {min} characters',
    'form.maxLength': 'Maximum length is {max} characters',
    'form.invalidNumber': 'Please enter a valid number',
    'form.invalidDate': 'Please enter a valid date',
    'form.passwordMismatch': 'Passwords do not match',
    'form.strongPassword': 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters',
    
    // Messages
    'msg.saved': 'Saved successfully',
    'msg.updated': 'Updated successfully',
    'msg.deleted': 'Deleted successfully',
    'msg.created': 'Created successfully',
    'msg.error': 'An error occurred',
    'msg.networkError': 'Network error. Please try again.',
    'msg.noData': 'No data available',
    'msg.loading': 'Loading...',
    'msg.processing': 'Processing...',
    'msg.confirmDelete': 'Are you sure you want to delete this item?',
    'msg.deleteSuccess': 'Item deleted successfully',
    'msg.deleteError': 'Failed to delete item',
    'msg.unsavedChanges': 'You have unsaved changes. Are you sure you want to leave?',
    
    // Time
    'time.now': 'Now',
    'time.minutesAgo': '{count} minutes ago',
    'time.hoursAgo': '{count} hours ago',
    'time.daysAgo': '{count} days ago',
    'time.weeksAgo': '{count} weeks ago',
    'time.monthsAgo': '{count} months ago',
    'time.yearsAgo': '{count} years ago',
    'time.justNow': 'Just now',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.tomorrow': 'Tomorrow',
    
    // Units
    'unit.bytes': 'Bytes',
    'unit.kb': 'KB',
    'unit.mb': 'MB',
    'unit.gb': 'GB',
    'unit.tb': 'TB',
    'unit.seconds': 'seconds',
    'unit.minutes': 'minutes',
    'unit.hours': 'hours',
    'unit.days': 'days',
    'unit.weeks': 'weeks',
    'unit.months': 'months',
    'unit.years': 'years'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel',
    'nav.projects': 'Proyectos',
    'nav.reports': 'Informes',
    'nav.invoices': 'Facturas',
    'nav.settings': 'Configuración',
    'nav.enterprise': 'Empresa',
    'nav.ai': 'IA/ML',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.create': 'Crear',
    'common.update': 'Actualizar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.view': 'Ver',
    'common.close': 'Cerrar',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.submit': 'Enviar',
    'common.reset': 'Restablecer',
    'common.refresh': 'Actualizar',
    'common.download': 'Descargar',
    'common.upload': 'Subir',
    'common.copy': 'Copiar',
    'common.share': 'Compartir',
    'common.print': 'Imprimir',
    'common.email': 'Correo',
    'common.phone': 'Teléfono',
    'common.address': 'Dirección',
    'common.website': 'Sitio web',
    'common.status': 'Estado',
    'common.date': 'Fecha',
    'common.time': 'Hora',
    'common.name': 'Nombre',
    'common.description': 'Descripción',
    'common.category': 'Categoría',
    'common.type': 'Tipo',
    'common.price': 'Precio',
    'common.quantity': 'Cantidad',
    'common.total': 'Total',
    'common.active': 'Activo',
    'common.inactive': 'Inactivo',
    'common.pending': 'Pendiente',
    'common.completed': 'Completado',
    'common.failed': 'Fallido',
    'common.cancelled': 'Cancelado',
    
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.logout': 'Cerrar sesión',
    'auth.signup': 'Registrarse',
    'auth.forgot': '¿Olvidaste tu contraseña?',
    'auth.remember': 'Recordarme',
    'auth.email': 'Correo',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar contraseña',
    'auth.firstName': 'Nombre',
    'auth.lastName': 'Apellido',
    'auth.welcome': 'Bienvenido',
    'auth.loginSuccess': 'Inicio de sesión exitoso',
    'auth.loginError': 'Error de inicio de sesión',
    'auth.invalidCredentials': 'Credenciales inválidas',
    'auth.accountCreated': 'Cuenta creada exitosamente',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.overview': 'Resumen',
    'dashboard.recentActivity': 'Actividad reciente',
    'dashboard.quickActions': 'Acciones rápidas',
    'dashboard.stats': 'Estadísticas',
    'dashboard.totalUsers': 'Usuarios totales',
    'dashboard.totalProjects': 'Proyectos totales',
    'dashboard.totalRevenue': 'Ingresos totales',
    'dashboard.growth': 'Crecimiento',
    
    // Projects
    'projects.title': 'Proyectos',
    'projects.create': 'Crear proyecto',
    'projects.edit': 'Editar proyecto',
    'projects.delete': 'Eliminar proyecto',
    'projects.name': 'Nombre del proyecto',
    'projects.description': 'Descripción del proyecto',
    'projects.status': 'Estado del proyecto',
    'projects.startDate': 'Fecha de inicio',
    'projects.endDate': 'Fecha de finalización',
    'projects.budget': 'Presupuesto',
    'projects.team': 'Equipo',
    'projects.progress': 'Progreso',
    'projects.tasks': 'Tareas',
    'project.planning': 'Planificación',
    'project.inProgress': 'En progreso',
    'project.completed': 'Completado',
    'project.onHold': 'En espera',
    'project.cancelled': 'Cancelado',
    
    // Reports
    'reports.title': 'Informes',
    'reports.generate': 'Generar informe',
    'reports.download': 'Descargar informe',
    'reports.filter': 'Filtrar informes',
    'reports.dateRange': 'Rango de fechas',
    'reports.type': 'Tipo de informe',
    'reports.summary': 'Resumen',
    'reports.details': 'Detalles',
    'reports.charts': 'Gráficos',
    'reports.export': 'Exportar',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.profile': 'Perfil',
    'settings.security': 'Seguridad',
    'settings.preferences': 'Preferencias',
    'settings.notifications': 'Notificaciones',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.privacy': 'Privacidad',
    'settings.account': 'Cuenta',
    'settings.changePassword': 'Cambiar contraseña',
    'settings.twoFactor': 'Autenticación de dos factores',
    'settings.sessionTimeout': 'Tiempo de espera de sesión',
    
    // Enterprise
    'enterprise.title': 'Empresa',
    'enterprise.sso': 'Gestión SSO',
    'enterprise.roles': 'Gestión de roles',
    'enterprise.audit': 'Registros de auditoría',
    'enterprise.governance': 'Gobernanza de datos',
    'enterprise.analytics': 'Análisis empresarial',
    'enterprise.security': 'Seguridad',
    'enterprise.compliance': 'Cumplimiento',
    
    // AI/ML
    'ai.title': 'Plataforma IA/ML',
    'ai.models': 'Modelos',
    'ai.training': 'Entrenamiento',
    'ai.inference': 'Inferencia',
    'ai.datasets': 'Conjuntos de datos',
    'ai.experiments': 'Experimentos',
    'ai.deployment': 'Despliegue',
    'ai.monitoring': 'Monitoreo',
    'ai.computerVision': 'Visión por computadora',
    'ai.nlp': 'Procesamiento de lenguaje natural',
    'ai.predictive': 'Análisis predictivo',
    
    // Forms
    'form.required': 'Este campo es obligatorio',
    'form.invalidEmail': 'Por favor ingrese un correo válido',
    'form.minLength': 'La longitud mínima es de {min} caracteres',
    'form.maxLength': 'La longitud máxima es de {max} caracteres',
    'form.invalidNumber': 'Por favor ingrese un número válido',
    'form.invalidDate': 'Por favor ingrese una fecha válida',
    'form.passwordMismatch': 'Las contraseñas no coinciden',
    'form.strongPassword': 'La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales',
    
    // Messages
    'msg.saved': 'Guardado exitosamente',
    'msg.updated': 'Actualizado exitosamente',
    'msg.deleted': 'Eliminado exitosamente',
    'msg.created': 'Creado exitosamente',
    'msg.error': 'Ocurrió un error',
    'msg.networkError': 'Error de red. Por favor intente nuevamente.',
    'msg.noData': 'No hay datos disponibles',
    'msg.loading': 'Cargando...',
    'msg.processing': 'Procesando...',
    'msg.confirmDelete': '¿Está seguro de que desea eliminar este elemento?',
    'msg.deleteSuccess': 'Elemento eliminado exitosamente',
    'msg.deleteError': 'Error al eliminar elemento',
    'msg.unsavedChanges': 'Tiene cambios no guardados. ¿Está seguro de que desea salir?',
    
    // Time
    'time.now': 'Ahora',
    'time.minutesAgo': 'hace {count} minutos',
    'time.hoursAgo': 'hace {count} horas',
    'time.daysAgo': 'hace {count} días',
    'time.weeksAgo': 'hace {count} semanas',
    'time.monthsAgo': 'hace {count} meses',
    'time.yearsAgo': 'hace {count} años',
    'time.justNow': 'Ahora mismo',
    'time.today': 'Hoy',
    'time.yesterday': 'Ayer',
    'time.tomorrow': 'Mañana',
    
    // Units
    'unit.bytes': 'Bytes',
    'unit.kb': 'KB',
    'unit.mb': 'MB',
    'unit.gb': 'GB',
    'unit.tb': 'TB',
    'unit.seconds': 'segundos',
    'unit.minutes': 'minutos',
    'unit.hours': 'horas',
    'unit.days': 'días',
    'unit.weeks': 'semanas',
    'unit.months': 'meses',
    'unit.years': 'años'
  },
  
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.dashboard': 'Panel',
    'nav.projects': 'Projeler',
    'nav.reports': 'Raporlar',
    'nav.invoices': 'Faturalar',
    'nav.settings': 'Ayarlar',
    'nav.enterprise': 'Kurumsal',
    'nav.ai': 'Yapay Zeka',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.create': 'Oluştur',
    'common.update': 'Güncelle',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.export': 'Dışa Aktar',
    'common.import': 'İçe Aktar',
    'common.view': 'Görüntüle',
    'common.close': 'Kapat',
    'common.confirm': 'Onayla',
    'common.yes': 'Evet',
    'common.no': 'Hayır',
    'common.submit': 'Gönder',
    'common.reset': 'Sıfırla',
    'common.refresh': 'Yenile',
    'common.download': 'İndir',
    'common.upload': 'Yükle',
    'common.copy': 'Kopyala',
    'common.share': 'Paylaş',
    'common.print': 'Yazdır',
    'common.email': 'E-posta',
    'common.phone': 'Telefon',
    'common.address': 'Adres',
    'common.website': 'Web Sitesi',
    'common.status': 'Durum',
    'common.date': 'Tarih',
    'common.time': 'Zaman',
    'common.name': 'Ad',
    'common.description': 'Açıklama',
    'common.category': 'Kategori',
    'common.type': 'Tür',
    'common.price': 'Fiyat',
    'common.quantity': 'Miktar',
    'common.total': 'Toplam',
    'common.active': 'Aktif',
    'common.inactive': 'Pasif',
    'common.pending': 'Beklemede',
    'common.completed': 'Tamamlandı',
    'common.failed': 'Başarısız',
    'common.cancelled': 'İptal Edildi',
    
    // Auth
    'auth.login': 'Giriş Yap',
    'auth.logout': 'Çıkış Yap',
    'auth.signup': 'Kayıt Ol',
    'auth.forgot': 'Şifremi Unuttum?',
    'auth.remember': 'Beni Hatırla',
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.confirmPassword': 'Şifreyi Onayla',
    'auth.firstName': 'Ad',
    'auth.lastName': 'Soyad',
    'auth.welcome': 'Hoş Geldiniz',
    'auth.loginSuccess': 'Giriş başarılı',
    'auth.loginError': 'Giriş başarısız',
    'auth.invalidCredentials': 'Geçersiz kimlik bilgileri',
    'auth.accountCreated': 'Hesap başarıyla oluşturuldu',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.overview': 'Genel Bakış',
    'dashboard.recentActivity': 'Son Aktiviteler',
    'dashboard.quickActions': 'Hızlı Eylemler',
    'dashboard.stats': 'İstatistikler',
    'dashboard.totalUsers': 'Toplam Kullanıcı',
    'dashboard.totalProjects': 'Toplam Proje',
    'dashboard.totalRevenue': 'Toplam Gelir',
    'dashboard.growth': 'Büyüme',
    
    // Projects
    'projects.title': 'Projeler',
    'projects.create': 'Proje Oluştur',
    'projects.edit': 'Projeyi Düzenle',
    'projects.delete': 'Projeyi Sil',
    'projects.name': 'Proje Adı',
    'projects.description': 'Proje Açıklaması',
    'projects.status': 'Proje Durumu',
    'projects.startDate': 'Başlangıç Tarihi',
    'projects.endDate': 'Bitiş Tarihi',
    'projects.budget': 'Bütçe',
    'projects.team': 'Ekip',
    'projects.progress': 'İlerleme',
    'projects.tasks': 'Görevler',
    'project.planning': 'Planlama',
    'project.inProgress': 'Devam Ediyor',
    'project.completed': 'Tamamlandı',
    'project.onHold': 'Beklemede',
    'project.cancelled': 'İptal Edildi',
    
    // Reports
    'reports.title': 'Raporlar',
    'reports.generate': 'Rapor Oluştur',
    'reports.download': 'Rapor İndir',
    'reports.filter': 'Raporları Filtrele',
    'reports.dateRange': 'Tarih Aralığı',
    'reports.type': 'Rapor Türü',
    'reports.summary': 'Özet',
    'reports.details': 'Detaylar',
    'reports.charts': 'Grafikler',
    'reports.export': 'Dışa Aktar',
    
    // Settings
    'settings.title': 'Ayarlar',
    'settings.profile': 'Profil',
    'settings.security': 'Güvenlik',
    'settings.preferences': 'Tercihler',
    'settings.notifications': 'Bildirimler',
    'settings.language': 'Dil',
    'settings.theme': 'Tema',
    'settings.privacy': 'Gizlilik',
    'settings.account': 'Hesap',
    'settings.changePassword': 'Şifre Değiştir',
    'settings.twoFactor': 'İki Faktörlü Kimlik Doğrulama',
    'settings.sessionTimeout': 'Oturum Zaman Aşımı',
    
    // Enterprise
    'enterprise.title': 'Kurumsal',
    'enterprise.sso': 'SSO Yönetimi',
    'enterprise.roles': 'Rol Yönetimi',
    'enterprise.audit': 'Denetim Kayıtları',
    'enterprise.governance': 'Veri Yönetişimi',
    'enterprise.analytics': 'Kurumsal Analitik',
    'enterprise.security': 'Güvenlik',
    'enterprise.compliance': 'Uyumluluk',
    
    // AI/ML
    'ai.title': 'Yapay Zeka Platformu',
    'ai.models': 'Modeller',
    'ai.training': 'Eğitim',
    'ai.inference': 'Çıkarım',
    'ai.datasets': 'Veri Setleri',
    'ai.experiments': 'Deneyler',
    'ai.deployment': 'Dağıtım',
    'ai.monitoring': 'İzleme',
    'ai.computerVision': 'Bilgisayarlı Görü',
    'ai.nlp': 'Doğal Dil İşleme',
    'ai.predictive': 'Öngörüsel Analitik',
    
    // Forms
    'form.required': 'Bu alan zorunludur',
    'form.invalidEmail': 'Lütfen geçerli bir e-posta girin',
    'form.minLength': 'Minimum uzunluk {min} karakterdir',
    'form.maxLength': 'Maksimum uzunluk {max} karakterdir',
    'form.invalidNumber': 'Lütfen geçerli bir sayı girin',
    'form.invalidDate': 'Lütfen geçerli bir tarih girin',
    'form.passwordMismatch': 'Şifreler eşleşmiyor',
    'form.strongPassword': 'Şifre en az 8 karakter içermeli, büyük harf, küçük harf, sayılar ve özel karakterler dahil',
    
    // Messages
    'msg.saved': 'Başarıyla kaydedildi',
    'msg.updated': 'Başarıyla güncellendi',
    'msg.deleted': 'Başarıyla silindi',
    'msg.created': 'Başarıyla oluşturuldu',
    'msg.error': 'Bir hata oluştu',
    'msg.networkError': 'Ağ hatası. Lütfen tekrar deneyin.',
    'msg.noData': 'Veri mevcut değil',
    'msg.loading': 'Yükleniyor...',
    'msg.processing': 'İşleniyor...',
    'msg.confirmDelete': 'Bu öğeyi silmek istediğinizden emin misiniz?',
    'msg.deleteSuccess': 'Öğe başarıyla silindi',
    'msg.deleteError': 'Öğe silinemedi',
    'msg.unsavedChanges': 'Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinizden emin misiniz?',
    
    // Time
    'time.now': 'Şimdi',
    'time.minutesAgo': '{count} dakika önce',
    'time.hoursAgo': '{count} saat önce',
    'time.daysAgo': '{count} gün önce',
    'time.weeksAgo': '{count} hafta önce',
    'time.monthsAgo': '{count} ay önce',
    'time.yearsAgo': '{count} yıl önce',
    'time.justNow': 'Şimdi',
    'time.today': 'Bugün',
    'time.yesterday': 'Dün',
    'time.tomorrow': 'Yarın',
    
    // Units
    'unit.bytes': 'Bayt',
    'unit.kb': 'KB',
    'unit.mb': 'MB',
    'unit.gb': 'GB',
    'unit.tb': 'TB',
    'unit.seconds': 'saniye',
    'unit.minutes': 'dakika',
    'unit.hours': 'saat',
    'unit.days': 'gün',
    'unit.weeks': 'hafta',
    'unit.months': 'ay',
    'unit.years': 'yıl'
  }
};

// Custom hook for translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
};

// Translation provider component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to browser language
    const saved = localStorage.getItem('preferred-language');
    if (saved && translations[saved]) {
      return saved;
    }
    
    // Try to get browser language
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    // Load translations asynchronously if needed
    const loadTranslations = async () => {
      try {
        // In a real app, you might load translations from API or separate files
        setTranslationsLoaded(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setTranslationsLoaded(true);
      }
    };

    loadTranslations();
  }, []);

  const t = (key, params = {}) => {
    if (!translationsLoaded) return key;
    
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // Fallback to English if translation not found
    if (!value && language !== 'en') {
      let fallback = translations.en;
      for (const k of keys) {
        if (fallback && typeof fallback === 'object') {
          fallback = fallback[k];
        } else {
          break;
        }
      }
      value = fallback;
    }
    
    // Return key if no translation found
    if (!value) {
      return key;
    }
    
    // Replace parameters in translation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), params[param]);
      }, value);
    }
    
    return value;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('preferred-language', newLanguage);
      
      // Update document direction for RTL languages
      const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
      document.documentElement.dir = rtlLanguages.includes(newLanguage) ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    translationsLoaded,
    availableLanguages: Object.keys(translations)
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
