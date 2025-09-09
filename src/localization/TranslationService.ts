/**
 * TranslationService - Core service for managing translations
 * Handles loading, caching, and providing translations with fallback support
 */

export interface TranslationParams {
  [key: string]: string | number;
}

export interface TranslationData {
  [key: string]: any;
}

export interface SupportedLocale {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  currency: {
    code: string;
    symbol: string;
    format: string;
  };
  region: string;
  flag: string;
}

export class TranslationService {
  private translations: Map<string, TranslationData> = new Map();
  private currentLocale: string = 'en';
  private fallbackLocale: string = 'en';
  private loadingPromises: Map<string, Promise<TranslationData>> = new Map();
  private cache: Map<string, TranslationData> = new Map();
  private listeners: Set<(locale: string) => void> = new Set();

  // Supported locales configuration
  public readonly supportedLocales: SupportedLocale[] = [
    // Global/Default
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      rtl: false,
      currency: { code: 'USD', symbol: '$', format: '{amount} {symbol}' },
      region: 'Global',
      flag: '🌐'
    },
    
    // United States
    {
      code: 'en-US',
      name: 'English (US)',
      nativeName: 'English (United States)',
      rtl: false,
      currency: { code: 'USD', symbol: '$', format: '{amount} {symbol}' },
      region: 'United States',
      flag: '🇺🇸'
    },
    {
      code: 'es-US',
      name: 'Spanish (US)',
      nativeName: 'Español (Estados Unidos)',
      rtl: false,
      currency: { code: 'USD', symbol: '$', format: '{amount} {symbol}' },
      region: 'United States',
      flag: '🇺🇸'
    },
    
    // United Kingdom
    {
      code: 'en-GB',
      name: 'English (UK)',
      nativeName: 'English (United Kingdom)',
      rtl: false,
      currency: { code: 'GBP', symbol: '£', format: '{symbol}{amount}' },
      region: 'United Kingdom',
      flag: '🇬🇧'
    },
    
    // Australia
    {
      code: 'en-AU',
      name: 'English (AU)',
      nativeName: 'English (Australia)',
      rtl: false,
      currency: { code: 'AUD', symbol: 'A$', format: '{symbol}{amount}' },
      region: 'Australia',
      flag: '🇦🇺'
    },
    
    // Canada
    {
      code: 'en-CA',
      name: 'English (CA)',
      nativeName: 'English (Canada)',
      rtl: false,
      currency: { code: 'CAD', symbol: 'C$', format: '{symbol}{amount}' },
      region: 'Canada',
      flag: '🇨🇦'
    },
    {
      code: 'fr-CA',
      name: 'French (CA)',
      nativeName: 'Français (Canada)',
      rtl: false,
      currency: { code: 'CAD', symbol: 'C$', format: '{symbol}{amount}' },
      region: 'Canada',
      flag: '🇨🇦'
    },
    
    // France
    {
      code: 'fr-FR',
      name: 'French (FR)',
      nativeName: 'Français (France)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'France',
      flag: '🇫🇷'
    },
    
    // Belgium
    {
      code: 'fr-BE',
      name: 'French (BE)',
      nativeName: 'Français (Belgique)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Belgium',
      flag: '🇧🇪'
    },
    {
      code: 'nl-BE',
      name: 'Dutch (BE)',
      nativeName: 'Nederlands (België)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Belgium',
      flag: '🇧🇪'
    },
    
    // Netherlands
    {
      code: 'nl-NL',
      name: 'Dutch (NL)',
      nativeName: 'Nederlands (Nederland)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Netherlands',
      flag: '🇳🇱'
    },
    {
      code: 'en-NL',
      name: 'English (NL)',
      nativeName: 'English (Netherlands)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Netherlands',
      flag: '🇳🇱'
    },
    
    // Germany
    {
      code: 'de-DE',
      name: 'German (DE)',
      nativeName: 'Deutsch (Deutschland)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Germany',
      flag: '🇩🇪'
    },
    
    // Spain
    {
      code: 'es-ES',
      name: 'Spanish (ES)',
      nativeName: 'Español (España)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Spain',
      flag: '🇪🇸'
    },
    
    // Mexico
    {
      code: 'es-MX',
      name: 'Spanish (MX)',
      nativeName: 'Español (México)',
      rtl: false,
      currency: { code: 'MXN', symbol: '$', format: '{symbol}{amount}' },
      region: 'Mexico',
      flag: '🇲🇽'
    },
    {
      code: 'en-MX',
      name: 'English (MX)',
      nativeName: 'English (Mexico)',
      rtl: false,
      currency: { code: 'MXN', symbol: '$', format: '{symbol}{amount}' },
      region: 'Mexico',
      flag: '🇲🇽'
    },
    
    // LATAM (Latin America)
    {
      code: 'es-LATAM',
      name: 'Spanish (LATAM)',
      nativeName: 'Español (Latinoamérica)',
      rtl: false,
      currency: { code: 'USD', symbol: '$', format: '{symbol}{amount}' },
      region: 'LATAM',
      flag: '🌎'
    },
    
    // Italy
    {
      code: 'it-IT',
      name: 'Italian (IT)',
      nativeName: 'Italiano (Italia)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Italy',
      flag: '🇮🇹'
    },
    
    // Portugal
    {
      code: 'pt-PT',
      name: 'Portuguese (PT)',
      nativeName: 'Português (Portugal)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Portugal',
      flag: '🇵🇹'
    },
    
    // Sweden
    {
      code: 'sv-SE',
      name: 'Swedish (SE)',
      nativeName: 'Svenska (Sverige)',
      rtl: false,
      currency: { code: 'SEK', symbol: 'kr', format: '{amount} {symbol}' },
      region: 'Sweden',
      flag: '🇸🇪'
    },
    
    // Nordics
    {
      code: 'en-NORDICS',
      name: 'English (Nordics)',
      nativeName: 'English (Nordics)',
      rtl: false,
      currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' },
      region: 'Nordics',
      flag: '🏔️'
    },
    
    // Switzerland
    {
      code: 'fr-CH',
      name: 'French (CH)',
      nativeName: 'Français (Suisse)',
      rtl: false,
      currency: { code: 'CHF', symbol: 'CHF', format: '{amount} {symbol}' },
      region: 'Switzerland',
      flag: '🇨🇭'
    },
    
    // Middle East
    {
      code: 'en-ME',
      name: 'English (ME)',
      nativeName: 'English (Middle East)',
      rtl: false,
      currency: { code: 'USD', symbol: '$', format: '{amount} {symbol}' },
      region: 'Middle East',
      flag: '🏜️'
    },
    {
      code: 'ar-ME',
      name: 'Arabic (ME)',
      nativeName: 'العربية (الشرق الأوسط)',
      rtl: true,
      currency: { code: 'USD', symbol: '$', format: '{amount} {symbol}' },
      region: 'Middle East',
      flag: '🏜️'
    }
  ];

  constructor() {
    this.initializeFromStorage();
  }

  /**
   * Initialize service with stored locale preference
   */
  private initializeFromStorage(): void {
    if (typeof window !== 'undefined') {
      const storedLocale = localStorage.getItem('grubtech-locale');
      if (storedLocale && this.isLocaleSupported(storedLocale)) {
        this.currentLocale = storedLocale;
      } else {
        // Auto-detect browser language
        const browserLocale = this.detectBrowserLocale();
        if (browserLocale) {
          this.currentLocale = browserLocale;
        }
      }
    }
  }

  /**
   * Detect browser locale and find best match
   */
  private detectBrowserLocale(): string | null {
    if (typeof window === 'undefined') return null;

    const browserLanguages = navigator.languages || [navigator.language];
    
    for (const browserLang of browserLanguages) {
      const langCode = browserLang.split('-')[0];
      if (this.isLocaleSupported(langCode)) {
        return langCode;
      }
    }

    return null;
  }

  /**
   * Check if locale is supported
   */
  public isLocaleSupported(locale: string): boolean {
    return this.supportedLocales.some(l => l.code === locale);
  }

  /**
   * Get current locale
   */
  public getCurrentLocale(): string {
    return this.currentLocale;
  }

  /**
   * Get current locale configuration
   */
  public getCurrentLocaleConfig(): SupportedLocale | undefined {
    return this.supportedLocales.find(l => l.code === this.currentLocale);
  }

  /**
   * Set current locale
   */
  public async setLocale(locale: string): Promise<void> {
    if (!this.isLocaleSupported(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    if (this.currentLocale === locale) {
      return;
    }

    this.currentLocale = locale;
    
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('grubtech-locale', locale);
    }

    // Load translations if not already loaded
    await this.loadTranslation(locale);

    // Notify listeners
    this.notifyListeners(locale);
  }

  /**
   * Load translation data for a locale
   */
  public async loadTranslation(locale: string): Promise<TranslationData> {
    if (!this.isLocaleSupported(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    // Return cached data if available
    if (this.translations.has(locale)) {
      return this.translations.get(locale)!;
    }

    // Return existing loading promise if already loading
    if (this.loadingPromises.has(locale)) {
      return this.loadingPromises.get(locale)!;
    }

    // Start loading
    const loadingPromise = this.fetchTranslationData(locale);
    this.loadingPromises.set(locale, loadingPromise);

    try {
      const data = await loadingPromise;
      this.translations.set(locale, data);
      this.loadingPromises.delete(locale);
      return data;
    } catch (error) {
      this.loadingPromises.delete(locale);
      throw error;
    }
  }

  /**
   * Fetch translation data from external source
   */
  private async fetchTranslationData(locale: string): Promise<TranslationData> {
    try {
      // Try to load from public translations folder
      const response = await fetch(`/translations/${locale}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${locale}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error loading translations for ${locale}:`, error);
      
      // Fallback to English if not already English
      if (locale !== this.fallbackLocale) {
        console.warn(`Falling back to ${this.fallbackLocale} for ${locale}`);
        return this.loadTranslation(this.fallbackLocale);
      }
      
      throw error;
    }
  }

  /**
   * Get translation for a key with fallback support
   */
  public translate(key: string, params?: TranslationParams): string {
    const translation = this.getTranslationValue(key);
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key; // Return key as fallback
    }

    return this.interpolateParams(translation, params);
  }

  /**
   * Get raw translation value for a key
   */
  private getTranslationValue(key: string): string | null {
    // Try current locale first
    let translation = this.getNestedValue(this.translations.get(this.currentLocale), key);
    
    if (translation) {
      return translation;
    }

    // Fallback to English
    if (this.currentLocale !== this.fallbackLocale) {
      translation = this.getNestedValue(this.translations.get(this.fallbackLocale), key);
      if (translation) {
        console.warn(`Using fallback translation for key: ${key}`);
        return translation;
      }
    }

    return null;
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: any, path: string): string | null {
    if (!obj) return null;

    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }

    return typeof current === 'string' ? current : null;
  }

  /**
   * Interpolate parameters into translation string
   */
  private interpolateParams(translation: string, params?: TranslationParams): string {
    if (!params) return translation;

    return translation.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  /**
   * Check if translation exists for a key
   */
  public hasTranslation(key: string): boolean {
    return this.getTranslationValue(key) !== null;
  }

  /**
   * Get all available translations for a namespace
   */
  public getNamespaceTranslations(namespace: string): Record<string, string> {
    const currentTranslations = this.translations.get(this.currentLocale);
    const fallbackTranslations = this.translations.get(this.fallbackLocale);
    
    const result: Record<string, string> = {};
    
    // Get from current locale
    if (currentTranslations && currentTranslations[namespace]) {
      Object.assign(result, this.flattenObject(currentTranslations[namespace], namespace));
    }
    
    // Fill gaps with fallback
    if (this.currentLocale !== this.fallbackLocale && fallbackTranslations && fallbackTranslations[namespace]) {
      const fallbackFlat = this.flattenObject(fallbackTranslations[namespace], namespace);
      Object.keys(fallbackFlat).forEach(key => {
        if (!(key in result)) {
          result[key] = fallbackFlat[key];
        }
      });
    }
    
    return result;
  }

  /**
   * Flatten nested object to dot notation
   */
  private flattenObject(obj: any, prefix: string = ''): Record<string, string> {
    const result: Record<string, string> = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(result, this.flattenObject(obj[key], newKey));
        } else if (typeof obj[key] === 'string') {
          result[newKey] = obj[key];
        }
      }
    }
    
    return result;
  }

  /**
   * Format currency according to current locale
   */
  public formatCurrency(amount: number): string {
    const localeConfig = this.getCurrentLocaleConfig();
    if (!localeConfig) return `${amount}`;

    const { symbol, format } = localeConfig.currency;
    return format.replace('{amount}', amount.toFixed(2)).replace('{symbol}', symbol);
  }

  /**
   * Format date according to current locale
   */
  public formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const localeConfig = this.getCurrentLocaleConfig();
    const locale = localeConfig?.code || 'en';
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  /**
   * Format number according to current locale
   */
  public formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    const localeConfig = this.getCurrentLocaleConfig();
    const locale = localeConfig?.code || 'en';
    
    return new Intl.NumberFormat(locale, options).format(number);
  }

  /**
   * Add listener for locale changes
   */
  public addLocaleChangeListener(listener: (locale: string) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of locale change
   */
  private notifyListeners(locale: string): void {
    this.listeners.forEach(listener => {
      try {
        listener(locale);
      } catch (error) {
        console.error('Error in locale change listener:', error);
      }
    });
  }

  /**
   * Clear cache and reload translations
   */
  public async clearCache(): Promise<void> {
    this.translations.clear();
    this.cache.clear();
    this.loadingPromises.clear();
    
    // Reload current locale
    await this.loadTranslation(this.currentLocale);
  }

  /**
   * Handle webhook update - clear cache and reload
   */
  public async handleWebhookUpdate(locale?: string): Promise<void> {
    if (locale) {
      // Clear specific locale
      this.translations.delete(locale);
      this.cache.delete(locale);
      this.loadingPromises.delete(locale);
      
      // Reload if it's the current locale
      if (locale === this.currentLocale) {
        await this.loadTranslation(locale);
        this.notifyListeners(locale);
      }
    } else {
      // Clear all cache
      await this.clearCache();
      this.notifyListeners(this.currentLocale);
    }
  }

  /**
   * Get loading state for a locale
   */
  public isLoading(locale: string): boolean {
    return this.loadingPromises.has(locale);
  }

  /**
   * Preload translations for better performance
   */
  public async preloadTranslations(locales: string[] = []): Promise<void> {
    const localesToLoad = locales.length > 0 ? locales : this.supportedLocales.map(l => l.code);
    
    const loadPromises = localesToLoad.map(locale => 
      this.loadTranslation(locale).catch(error => {
        console.warn(`Failed to preload translations for ${locale}:`, error);
      })
    );
    
    await Promise.all(loadPromises);
  }
}

// Create singleton instance
export const translationService = new TranslationService();
