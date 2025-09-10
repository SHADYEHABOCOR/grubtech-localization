/**
 * Asset Loader for Webflow
 * Handles loading and caching of localized assets
 */

class AssetLoader {
  constructor(options = {}) {
    // Use CDN URLs for all environments
    const cdnBase = 'https://cdn.jsdelivr.net/gh/SHADYEHABOCOR/grubtech-localization@main';
    
    this.config = {
      assetsPath: `${cdnBase}/public/assets/images/`,
      cacheEnabled: true,
      preloadEnabled: true,
      lazyLoadEnabled: true,
      fallbackEnabled: true,
      supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
      ...options
    };

    this.cache = new Map();
    this.preloadedAssets = new Set();
    this.loadingPromises = new Map();
    this.observer = null;

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.preloadCriticalAssets();
  }

  /**
   * Setup intersection observer for lazy loading
   */
  setupIntersectionObserver() {
    if (!this.config.lazyLoadEnabled || !('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const assetKey = element.dataset.asset || element.dataset.lazyAsset;
          if (assetKey) {
            this.loadAsset(assetKey, element);
            this.observer.unobserve(element);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Observe elements with lazy loading
    document.querySelectorAll('[data-lazy-asset]').forEach(element => {
      this.observer.observe(element);
    });
  }

  /**
   * Load asset for an element
   */
  async loadAsset(assetKey, element, locale = null) {
    if (!assetKey || !element) return;

    const currentLocale = locale || this.getCurrentLocale();
    const cacheKey = `${assetKey}-${currentLocale}`;

    // Check cache first
    if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
      this.applyAsset(element, this.cache.get(cacheKey));
      return;
    }

    // Check if already loading
    if (this.loadingPromises.has(cacheKey)) {
      const assetPath = await this.loadingPromises.get(cacheKey);
      this.applyAsset(element, assetPath);
      return;
    }

    // Load asset
    const loadPromise = this.fetchAsset(assetKey, currentLocale);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const assetPath = await loadPromise;
      
      // Cache the result
      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, assetPath);
      }

      // Apply to element
      this.applyAsset(element, assetPath);

      // Mark as preloaded
      this.preloadedAssets.add(cacheKey);

      this.loadingPromises.delete(cacheKey);
    } catch (error) {
      console.error(`Failed to load asset ${assetKey}:`, error);
      this.loadingPromises.delete(cacheKey);
      
      // Try fallback
      if (this.config.fallbackEnabled) {
        this.loadFallbackAsset(assetKey, element);
      }
    }
  }

  /**
   * Fetch asset path for a given key and locale
   */
  async fetchAsset(assetKey, locale) {
    // Try region-specific asset first
    let assetPath = `${this.config.assetsPath}${locale}/${assetKey}`;
    if (await this.assetExists(assetPath)) {
      return assetPath;
    }

    // Try language-specific asset
    const language = locale.split('-')[0];
    assetPath = `${this.config.assetsPath}${language}/${assetKey}`;
    if (await this.assetExists(assetPath)) {
      return assetPath;
    }

    // Fallback to global asset
    assetPath = `${this.config.assetsPath}global/${assetKey}`;
    if (await this.assetExists(assetPath)) {
      return assetPath;
    }

    // Final fallback
    return `${this.config.assetsPath}${assetKey}`;
  }

  /**
   * Check if asset exists
   */
  async assetExists(path) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Apply asset to element
   */
  applyAsset(element, assetPath) {
    if (element.tagName === 'IMG') {
      element.src = assetPath;
      element.alt = this.getAssetAlt(element.dataset.asset);
    } else if (element.tagName === 'PICTURE') {
      const img = element.querySelector('img');
      if (img) {
        img.src = assetPath;
        img.alt = this.getAssetAlt(element.dataset.asset);
      }
    } else if (element.dataset.assetType === 'background') {
      element.style.backgroundImage = `url(${assetPath})`;
    } else {
      // Default to src attribute
      element.src = assetPath;
    }

    // Add loaded class
    element.classList.add('asset-loaded');
    
    // Trigger custom event
    const event = new CustomEvent('assetLoaded', {
      detail: { element, assetPath }
    });
    element.dispatchEvent(event);
  }

  /**
   * Load fallback asset
   */
  loadFallbackAsset(assetKey, element) {
    const fallbackPath = `${this.config.assetsPath}fallback/${assetKey}`;
    this.applyAsset(element, fallbackPath);
  }

  /**
   * Get asset alt text
   */
  getAssetAlt(assetKey) {
    const altMap = {
      'hero-banner': 'Hero banner',
      'logo': 'Logo',
      'delivery-truck': 'Delivery truck',
      'restaurant-icon': 'Restaurant icon',
      'payment-methods': 'Payment methods',
      'food-category': 'Food category',
      'app-icon': 'App icon'
    };
    return altMap[assetKey] || assetKey;
  }

  /**
   * Preload critical assets
   */
  preloadCriticalAssets() {
    if (!this.config.preloadEnabled) return;

    const criticalAssets = [
      'hero-banner',
      'logo',
      'delivery-truck',
      'restaurant-icon',
      'payment-methods'
    ];

    const currentLocale = this.getCurrentLocale();

    criticalAssets.forEach(assetKey => {
      this.preloadAsset(assetKey, currentLocale);
    });
  }

  /**
   * Preload a specific asset
   */
  async preloadAsset(assetKey, locale) {
    const cacheKey = `${assetKey}-${locale}`;
    
    if (this.preloadedAssets.has(cacheKey)) {
      return;
    }

    try {
      const assetPath = await this.fetchAsset(assetKey, locale);
      
      // Create image element to preload
      const img = new Image();
      img.src = assetPath;
      
      this.preloadedAssets.add(cacheKey);
      
      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, assetPath);
      }
    } catch (error) {
      console.warn(`Failed to preload asset ${assetKey}:`, error);
    }
  }

  /**
   * Load responsive images
   */
  loadResponsiveImages(assetKey, element, locale = null) {
    const currentLocale = locale || this.getCurrentLocale();
    const basePath = this.getAssetBasePath(assetKey, currentLocale);
    
    const sizes = [
      { suffix: '-sm', width: 320 },
      { suffix: '-md', width: 768 },
      { suffix: '-lg', width: 1024 },
      { suffix: '-xl', width: 1920 }
    ];

    const srcSet = sizes.map(size => {
      const path = `${basePath}${size.suffix}.jpg`;
      return `${path} ${size.width}w`;
    }).join(', ');

    const sizesAttr = sizes.map(size => {
      return `(max-width: ${size.width}px) ${size.width}px`;
    }).join(', ') + ', 100vw';

    if (element.tagName === 'IMG') {
      element.srcset = srcSet;
      element.sizes = sizesAttr;
    } else if (element.tagName === 'PICTURE') {
      const img = element.querySelector('img');
      if (img) {
        img.srcset = srcSet;
        img.sizes = sizesAttr;
      }
    }
  }

  /**
   * Get asset base path
   */
  getAssetBasePath(assetKey, locale) {
    // Try region-specific path first
    let basePath = `${this.config.assetsPath}${locale}/${assetKey}`;
    if (this.assetExists(basePath)) {
      return basePath;
    }

    // Try language-specific path
    const language = locale.split('-')[0];
    basePath = `${this.config.assetsPath}${language}/${assetKey}`;
    if (this.assetExists(basePath)) {
      return basePath;
    }

    // Fallback to global path
    return `${this.config.assetsPath}global/${assetKey}`;
  }

  /**
   * Get current locale
   */
  getCurrentLocale() {
    if (window.grubtechLocalization) {
      return window.grubtechLocalization.getCurrentLocale();
    }
    return 'en';
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    this.preloadedAssets.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      cachedAssets: this.cache.size,
      preloadedAssets: this.preloadedAssets.size,
      loadingAssets: this.loadingPromises.size
    };
  }

  /**
   * Handle webhook updates
   */
  async handleWebhookUpdate(payload) {
    if (payload.type === 'asset_update') {
      const cacheKey = `${payload.assetKey}-${payload.locale}`;
      
      // Clear cache for updated asset
      this.cache.delete(cacheKey);
      this.preloadedAssets.delete(cacheKey);
      
      // Reload asset if it's currently displayed
      const elements = document.querySelectorAll(`[data-asset="${payload.assetKey}"]`);
      elements.forEach(element => {
        this.loadAsset(payload.assetKey, element, payload.locale);
      });
    }
  }
}

// Export for use in other scripts
window.AssetLoader = AssetLoader;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.assetLoader = new AssetLoader();
  });
} else {
  window.assetLoader = new AssetLoader();
}
