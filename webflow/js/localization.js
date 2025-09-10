/**
 * GrubTech Localization System for Webflow
 * Main localization script that handles translations and asset loading
 */

class GrubTechLocalization {
  constructor(options = {}) {
    // Default configuration
    // Auto-detect environment and set appropriate domain
    const isProduction = window.location.hostname === 'grubtech.com' || window.location.hostname === 'www.grubtech.com';
    const isTesting = window.location.hostname === 'gt-website-1-2-2e65d3.webflow.io';
    
    // Use CDN URLs for all environments
    const cdnBase = 'https://cdn.jsdelivr.net/gh/SHADYEHABOCOR/grubtech-localization@main';
    
    this.config = {
      defaultLocale: 'en',
      supportedLocales: [
        'en', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NL', 'en-MX', 'en-NORDICS', 'en-ME',
        'ar', 'ar-ME',
        'es', 'es-ES', 'es-US', 'es-MX', 'es-LATAM',
        'fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH',
        'de-DE', 'it-IT', 'pt-PT', 'nl-NL', 'nl-BE', 'sv-SE'
      ],
      translationsPath: `${cdnBase}/src/translations/`,
      assetsPath: `${cdnBase}/public/assets/images/`,
      webhookEndpoint: isProduction ? 'https://grubtech.com/api/webhook/translations' : `${cdnBase}/api/webhook/translations`,
      autoDetect: true,
      savePreference: true,
      rtlSupport: true,
      preloadAssets: true,
      cacheAssets: true,
      lazyLoadImages: true,
      selectors: {
        textElements: '[data-translate]',
        imageElements: '[data-asset]',
        languageSwitcher: '.language-switcher select',
        rtlElements: '[data-rtl]'
      },
      onLanguageChange: null,
      onAssetLoad: null,
      ...options
    };

    // State
    this.currentLocale = this.config.defaultLocale;
    this.translations = new Map();
    this.assets = new Map();
    this.isInitialized = false;
    this.loadingPromises = new Map();

    // Bind methods
    this.init = this.init.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.translate = this.translate.bind(this);
    this.loadAsset = this.loadAsset.bind(this);
  }

  /**
   * Initialize the localization system
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // Detect initial locale
      this.currentLocale = this.detectInitialLocale();

      // Load initial translations
      await this.loadTranslations(this.currentLocale);

      // Set up language switcher
      this.setupLanguageSwitcher();

      // Set up RTL support
      if (this.config.rtlSupport) {
        this.setupRTLSupport();
      }

      // Translate initial content
      this.translatePage();

      // Load initial assets
      if (this.config.preloadAssets) {
        this.preloadCriticalAssets();
      }

      this.isInitialized = true;
      console.log('GrubTech Localization initialized with locale:', this.currentLocale);
    } catch (error) {
      console.error('Failed to initialize localization:', error);
    }
  }

  /**
   * Detect initial locale from browser, URL, or stored preference
   */
  detectInitialLocale() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLocale = urlParams.get('lang');
    if (urlLocale && this.config.supportedLocales.includes(urlLocale)) {
      return urlLocale;
    }

    // Check stored preference
    if (this.config.savePreference) {
      const storedLocale = localStorage.getItem('grubtech-locale');
      if (storedLocale && this.config.supportedLocales.includes(storedLocale)) {
        return storedLocale;
      }
    }

    // Check browser language
    if (this.config.autoDetect) {
      const browserLocale = navigator.language || navigator.languages[0];
      const baseLocale = browserLocale.split('-')[0];
      
      // Try exact match first
      if (this.config.supportedLocales.includes(browserLocale)) {
        return browserLocale;
      }
      
      // Try base language
      if (this.config.supportedLocales.includes(baseLocale)) {
        return baseLocale;
      }
    }

    return this.config.defaultLocale;
  }

  /**
   * Load translations for a specific locale
   */
  async loadTranslations(locale) {
    if (this.translations.has(locale)) {
      return this.translations.get(locale);
    }

    const cacheKey = `translations-${locale}`;
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    const loadPromise = this.fetchTranslations(locale);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const translations = await loadPromise;
      this.translations.set(locale, translations);
      this.loadingPromises.delete(cacheKey);
      return translations;
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      console.warn(`Failed to load translations for ${locale}, falling back to default`);
      
      if (locale !== this.config.defaultLocale) {
        return this.loadTranslations(this.config.defaultLocale);
      }
      throw error;
    }
  }

  /**
   * Fetch translations from server
   */
  async fetchTranslations(locale) {
    const url = `${this.config.translationsPath}${locale}.json`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch translations for ${locale}: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Set up language switcher event listeners
   */
  setupLanguageSwitcher() {
    const switcher = document.querySelector(this.config.selectors.languageSwitcher);
    if (switcher) {
      switcher.addEventListener('change', (e) => {
        this.setLocale(e.target.value);
      });
      
      // Set current locale in switcher
      switcher.value = this.currentLocale;
    }

    // Set up button-based language switchers
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const locale = btn.dataset.locale;
        if (locale && this.config.supportedLocales.includes(locale)) {
          this.setLocale(locale);
        }
      });
    });
  }

  /**
   * Set up RTL support
   */
  setupRTLSupport() {
    this.updateRTLSettings();
  }

  /**
   * Update RTL settings based on current locale
   */
  updateRTLSettings() {
    const isRTL = ['ar', 'he'].includes(this.currentLocale.split('-')[0]);
    const html = document.documentElement;
    
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    html.setAttribute('lang', this.currentLocale);
    
    // Update RTL-specific elements
    document.querySelectorAll(this.config.selectors.rtlElements).forEach(el => {
      el.style.direction = isRTL ? 'rtl' : 'ltr';
      el.style.textAlign = isRTL ? 'right' : 'left';
    });
  }

  /**
   * Set locale and update the page
   */
  async setLocale(locale) {
    if (!this.config.supportedLocales.includes(locale)) {
      console.warn(`Unsupported locale: ${locale}`);
      return;
    }

    if (locale === this.currentLocale) return;

    const oldLocale = this.currentLocale;
    this.currentLocale = locale;

    try {
      // Load translations for new locale
      await this.loadTranslations(locale);

      // Save preference
      if (this.config.savePreference) {
        localStorage.setItem('grubtech-locale', locale);
      }

      // Update language switcher
      const switcher = document.querySelector(this.config.selectors.languageSwitcher);
      if (switcher) {
        switcher.value = locale;
      }

      // Update RTL settings
      if (this.config.rtlSupport) {
        this.updateRTLSettings();
      }

      // Translate page content
      this.translatePage();

      // Load assets for new locale
      this.loadPageAssets();

      // Call custom callback
      if (this.config.onLanguageChange) {
        this.config.onLanguageChange(locale, oldLocale);
      }

      console.log(`Locale changed from ${oldLocale} to ${locale}`);
    } catch (error) {
      console.error('Failed to change locale:', error);
      this.currentLocale = oldLocale; // Revert on error
    }
  }

  /**
   * Translate all text elements on the page
   */
  translatePage() {
    const elements = document.querySelectorAll(this.config.selectors.textElements);
    elements.forEach(element => {
      const key = element.dataset.translate;
      if (key) {
        const translation = this.translate(key);
        if (translation !== key) {
          element.textContent = translation;
        }
      }
    });

    // Translate elements with class-based translation
    document.querySelectorAll('[class*="translate-"]').forEach(element => {
      const classes = element.className.split(' ');
      const translateClass = classes.find(cls => cls.startsWith('translate-'));
      if (translateClass) {
        const key = translateClass.replace('translate-', '').replace(/-/g, '.');
        const translation = this.translate(key);
        if (translation !== key) {
          element.textContent = translation;
        }
      }
    });
  }

  /**
   * Translate a key to the current locale
   */
  translate(key, params = {}) {
    const translations = this.translations.get(this.currentLocale);
    if (!translations) {
      console.warn(`No translations loaded for locale: ${this.currentLocale}`);
      return key;
    }

    const keys = key.split('.');
    let translation = translations;

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to default locale
        const defaultTranslations = this.translations.get(this.config.defaultLocale);
        if (defaultTranslations) {
          translation = defaultTranslations;
          for (const fk of keys) {
            if (translation && typeof translation === 'object' && fk in translation) {
              translation = translation[fk];
            } else {
              return key; // Return key if not found
            }
          }
        } else {
          return key;
        }
        break;
      }
    }

    if (typeof translation === 'string') {
      // Replace parameters
      return this.interpolate(translation, params);
    }

    return key;
  }

  /**
   * Interpolate parameters in translation string
   */
  interpolate(text, params) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Load assets for the current locale
   */
  loadPageAssets() {
    const elements = document.querySelectorAll(this.config.selectors.imageElements);
    elements.forEach(element => {
      const assetKey = element.dataset.asset;
      if (assetKey) {
        this.loadAsset(assetKey, element);
      }
    });

    // Load background images
    document.querySelectorAll('[class*="localized-bg-"]').forEach(element => {
      const classes = element.className.split(' ');
      const bgClass = classes.find(cls => cls.startsWith('localized-bg-'));
      if (bgClass) {
        const assetKey = bgClass.replace('localized-bg-', '');
        this.loadBackgroundAsset(assetKey, element);
      }
    });
  }

  /**
   * Load a specific asset for an element
   */
  async loadAsset(assetKey, element) {
    try {
      const assetPath = this.getAssetPath(assetKey);
      
      if (element.tagName === 'IMG') {
        element.src = assetPath;
        element.alt = this.getAssetAlt(assetKey);
      } else if (element.tagName === 'PICTURE') {
        const img = element.querySelector('img');
        if (img) {
          img.src = assetPath;
          img.alt = this.getAssetAlt(assetKey);
        }
      }

      // Call custom callback
      if (this.config.onAssetLoad) {
        this.config.onAssetLoad(assetKey, assetPath);
      }
    } catch (error) {
      console.error(`Failed to load asset ${assetKey}:`, error);
    }
  }

  /**
   * Load background asset for an element
   */
  async loadBackgroundAsset(assetKey, element) {
    try {
      const assetPath = this.getAssetPath(assetKey);
      element.style.backgroundImage = `url(${assetPath})`;
      
      // Call custom callback
      if (this.config.onAssetLoad) {
        this.config.onAssetLoad(assetKey, assetPath);
      }
    } catch (error) {
      console.error(`Failed to load background asset ${assetKey}:`, error);
    }
  }

  /**
   * Get asset path for current locale
   */
  getAssetPath(assetKey) {
    // Try region-specific asset first
    const regionPath = `${this.config.assetsPath}${this.currentLocale}/${assetKey}`;
    if (this.assetExists(regionPath)) {
      return regionPath;
    }

    // Try language-specific asset
    const language = this.currentLocale.split('-')[0];
    const languagePath = `${this.config.assetsPath}${language}/${assetKey}`;
    if (this.assetExists(languagePath)) {
      return languagePath;
    }

    // Fallback to global asset
    return `${this.config.assetsPath}global/${assetKey}`;
  }

  /**
   * Check if asset exists (simplified check)
   */
  assetExists(path) {
    // In a real implementation, you would check if the asset exists
    // For now, we'll assume all assets exist
    return true;
  }

  /**
   * Get alt text for asset
   */
  getAssetAlt(assetKey) {
    const altKey = `assets.${assetKey}.alt`;
    return this.translate(altKey) || assetKey;
  }

  /**
   * Preload critical assets
   */
  preloadCriticalAssets() {
    const criticalAssets = ['hero-banner', 'logo', 'delivery-truck', 'restaurant-icon'];
    
    criticalAssets.forEach(assetKey => {
      const assetPath = this.getAssetPath(assetKey);
      const img = new Image();
      img.src = assetPath;
    });
  }

  /**
   * Handle webhook updates
   */
  async handleWebhookUpdate(payload) {
    try {
      if (payload.type === 'translation_update') {
        // Update translations cache
        this.translations.set(payload.locale, payload.translations);
        
        // Re-translate if it's the current locale
        if (payload.locale === this.currentLocale) {
          this.translatePage();
        }
      } else if (payload.type === 'asset_update') {
        // Clear asset cache
        this.assets.delete(payload.assetKey);
        
        // Reload assets if it's the current locale
        if (payload.locale === this.currentLocale) {
          this.loadPageAssets();
        }
      }
    } catch (error) {
      console.error('Failed to handle webhook update:', error);
    }
  }

  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.currentLocale;
  }

  /**
   * Get supported locales
   */
  getSupportedLocales() {
    return [...this.config.supportedLocales];
  }

  /**
   * Check if locale is RTL
   */
  isRTL(locale = this.currentLocale) {
    return ['ar', 'he'].includes(locale.split('-')[0]);
  }
}

// Export for use in other scripts
window.GrubTechLocalization = GrubTechLocalization;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.grubtechLocalizationConfig) {
      window.grubtechLocalization = new GrubTechLocalization(window.grubtechLocalizationConfig);
      window.grubtechLocalization.init();
    }
  });
} else {
  if (window.grubtechLocalizationConfig) {
    window.grubtechLocalization = new GrubTechLocalization(window.grubtechLocalizationConfig);
    window.grubtechLocalization.init();
  }
}
