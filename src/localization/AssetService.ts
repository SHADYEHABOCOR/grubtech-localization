/**
 * AssetService - Service for managing localized assets
 * Handles images, icons, and other assets based on language and region
 */

export interface AssetConfig {
  basePath: string;
  fallbackPath: string;
  supportedFormats: string[];
  preloadCritical: boolean;
}

export interface LocalizedAsset {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export interface AssetVariant {
  locale: string;
  region?: string;
  path: string;
  alt: string;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    size?: number;
  };
}

export class AssetService {
  private assetCache: Map<string, string> = new Map();
  private preloadedAssets: Set<string> = new Set();
  private config: AssetConfig;

  constructor(config: AssetConfig) {
    this.config = config;
  }

  /**
   * Get localized asset path with fallback support
   */
  public getLocalizedAsset(
    assetKey: string,
    locale: string,
    region?: string,
    options?: {
      fallbackToLanguage?: boolean;
      fallbackToGlobal?: boolean;
      customFallback?: string;
    }
  ): string {
    const {
      fallbackToLanguage = true,
      fallbackToGlobal = true,
      customFallback
    } = options || {};

    // Try region-specific asset first (e.g., en-US, fr-CA)
    if (region) {
      const regionPath = this.buildAssetPath(assetKey, locale, region);
      if (this.assetExists(regionPath)) {
        return regionPath;
      }
    }

    // Try language-specific asset (e.g., en, fr)
    if (fallbackToLanguage) {
      const languagePath = this.buildAssetPath(assetKey, locale);
      if (this.assetExists(languagePath)) {
        return languagePath;
      }
    }

    // Try custom fallback
    if (customFallback) {
      const customPath = this.buildAssetPath(customFallback);
      if (this.assetExists(customPath)) {
        return customPath;
      }
    }

    // Fallback to global asset
    if (fallbackToGlobal) {
      const globalPath = this.buildAssetPath(assetKey);
      if (this.assetExists(globalPath)) {
        return globalPath;
      }
    }

    // Final fallback to base path
    return this.buildAssetPath(assetKey);
  }

  /**
   * Get multiple asset variants for a single asset key
   */
  public getAssetVariants(assetKey: string): AssetVariant[] {
    const variants: AssetVariant[] = [];
    
    // Add global variant
    variants.push({
      locale: 'global',
      path: this.buildAssetPath(assetKey),
      alt: this.getAssetAlt(assetKey, 'global')
    });

    // Add language variants
    const languages = ['en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'sv'];
    languages.forEach(lang => {
      const path = this.buildAssetPath(assetKey, lang);
      if (this.assetExists(path)) {
        variants.push({
          locale: lang,
          path,
          alt: this.getAssetAlt(assetKey, lang)
        });
      }
    });

    // Add regional variants
    const regions = [
      'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NL', 'en-MX', 'en-NORDICS', 'en-ME',
      'ar-ME', 'es-ES', 'es-US', 'es-MX', 'es-LATAM',
      'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH',
      'de-DE', 'it-IT', 'pt-PT', 'nl-NL', 'nl-BE', 'sv-SE'
    ];

    regions.forEach(region => {
      const path = this.buildAssetPath(assetKey, region);
      if (this.assetExists(path)) {
        variants.push({
          locale: region,
          path,
          alt: this.getAssetAlt(assetKey, region)
        });
      }
    });

    return variants;
  }

  /**
   * Build asset path based on locale and region
   */
  private buildAssetPath(assetKey: string, locale?: string, region?: string): string {
    let path = this.config.basePath;
    
    if (region) {
      // Region-specific path: /assets/images/hero/en-US/hero-banner.jpg
      path += `/${region}/${assetKey}`;
    } else if (locale) {
      // Language-specific path: /assets/images/hero/en/hero-banner.jpg
      path += `/${locale}/${assetKey}`;
    } else {
      // Global path: /assets/images/hero/hero-banner.jpg
      path += `/${assetKey}`;
    }

    return path;
  }

  /**
   * Check if asset exists (in a real implementation, this would check the file system or API)
   */
  private assetExists(path: string): boolean {
    // In a real implementation, you would:
    // 1. Check if the file exists in the public directory
    // 2. Make a HEAD request to check if the asset exists
    // 3. Use a manifest file to check available assets
    
    // For now, we'll use a simple heuristic based on common patterns
    const commonAssets = [
      'hero-banner',
      'logo',
      'app-icon',
      'payment-methods',
      'delivery-truck',
      'restaurant-icon',
      'menu-background',
      'food-category',
      'promotion-banner',
      'social-proof',
      'testimonial-avatar',
      'feature-icon',
      'cta-background',
      'footer-pattern',
      'loading-spinner'
    ];

    const assetName = path.split('/').pop()?.split('.')[0];
    return commonAssets.includes(assetName || '');
  }

  /**
   * Get localized alt text for asset
   */
  private getAssetAlt(assetKey: string, locale: string): string {
    // In a real implementation, you would load alt text from translation files
    const altTexts: Record<string, Record<string, string>> = {
      'hero-banner': {
        'global': 'Delicious food delivery hero banner',
        'en': 'Delicious food delivery hero banner',
        'en-US': 'Fast food delivery in the United States',
        'en-GB': 'Quick food delivery in the United Kingdom',
        'ar': 'لافتة تسليم الطعام اللذيذ',
        'es': 'Banner de entrega de comida deliciosa',
        'fr': 'Bannière de livraison de nourriture délicieuse',
        'de': 'Leckeres Essen Lieferung Hero Banner',
        'it': 'Banner eroe consegna cibo delizioso',
        'pt': 'Banner de entrega de comida deliciosa',
        'nl': 'Heerlijk eten bezorging hero banner',
        'sv': 'Läckert mat leverans hero banner'
      },
      'logo': {
        'global': 'GrubTech Logo',
        'en': 'GrubTech Logo',
        'ar': 'شعار جرابتك',
        'es': 'Logo de GrubTech',
        'fr': 'Logo GrubTech',
        'de': 'GrubTech Logo',
        'it': 'Logo GrubTech',
        'pt': 'Logo GrubTech',
        'nl': 'GrubTech Logo',
        'sv': 'GrubTech Logo'
      }
    };

    return altTexts[assetKey]?.[locale] || altTexts[assetKey]?.['global'] || assetKey;
  }

  /**
   * Preload critical assets for better performance
   */
  public async preloadAssets(assetKeys: string[], locale: string, region?: string): Promise<void> {
    const preloadPromises = assetKeys.map(async (assetKey) => {
      const assetPath = this.getLocalizedAsset(assetKey, locale, region);
      
      if (!this.preloadedAssets.has(assetPath)) {
        try {
          await this.preloadAsset(assetPath);
          this.preloadedAssets.add(assetPath);
        } catch (error) {
          console.warn(`Failed to preload asset: ${assetPath}`, error);
        }
      }
    });

    await Promise.all(preloadPromises);
  }

  /**
   * Preload a single asset
   */
  private async preloadAsset(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load asset: ${path}`));
      img.src = path;
    });
  }

  /**
   * Get asset metadata (dimensions, format, etc.)
   */
  public async getAssetMetadata(path: string): Promise<{
    width: number;
    height: number;
    format: string;
    size: number;
  } | null> {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (!response.ok) return null;

      const contentType = response.headers.get('content-type') || '';
      const contentLength = response.headers.get('content-length');
      
      // Get dimensions from image
      const img = new Image();
      return new Promise((resolve) => {
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
            format: contentType.split('/')[1] || 'unknown',
            size: contentLength ? parseInt(contentLength) : 0
          });
        };
        img.onerror = () => resolve(null);
        img.src = path;
      });
    } catch (error) {
      console.warn(`Failed to get metadata for asset: ${path}`, error);
      return null;
    }
  }

  /**
   * Generate responsive image sources for different screen sizes
   */
  public getResponsiveSources(
    assetKey: string,
    locale: string,
    region?: string,
    sizes: { width: number; suffix: string }[] = [
      { width: 320, suffix: '-sm' },
      { width: 768, suffix: '-md' },
      { width: 1024, suffix: '-lg' },
      { width: 1920, suffix: '-xl' }
    ]
  ): { src: string; srcSet: string; sizes: string } {
    const baseAsset = this.getLocalizedAsset(assetKey, locale, region);
    const baseName = baseAsset.split('.')[0];
    const extension = baseAsset.split('.').pop();

    const srcSet = sizes
      .map(size => {
        const responsivePath = `${baseName}${size.suffix}.${extension}`;
        return `${responsivePath} ${size.width}w`;
      })
      .join(', ');

    const sizesAttr = sizes
      .map(size => `(max-width: ${size.width}px) ${size.width}px`)
      .join(', ') + ', 100vw';

    return {
      src: baseAsset,
      srcSet,
      sizes: sizesAttr
    };
  }

  /**
   * Get localized icon based on region/culture
   */
  public getLocalizedIcon(
    iconKey: string,
    locale: string,
    region?: string
  ): string {
    // Map common icons to culturally appropriate alternatives
    const iconMappings: Record<string, Record<string, string>> = {
      'delivery-truck': {
        'en-US': 'delivery-truck-us',
        'en-GB': 'delivery-van-uk',
        'ar': 'delivery-motorcycle-ar',
        'es-MX': 'delivery-bike-mx',
        'nl-NL': 'delivery-bike-nl'
      },
      'payment-card': {
        'en-US': 'credit-card-us',
        'en-GB': 'debit-card-uk',
        'de-DE': 'ec-card-de',
        'nl-NL': 'ideal-payment-nl'
      },
      'restaurant': {
        'en-US': 'restaurant-us',
        'fr-FR': 'bistro-fr',
        'it-IT': 'trattoria-it',
        'es-ES': 'tapas-bar-es'
      }
    };

    const mapping = iconMappings[iconKey];
    if (mapping) {
      // Try region-specific icon first
      if (region && mapping[region]) {
        return this.getLocalizedAsset(mapping[region], locale, region);
      }
      
      // Try language-specific icon
      if (mapping[locale]) {
        return this.getLocalizedAsset(mapping[locale], locale);
      }
    }

    // Fallback to default icon
    return this.getLocalizedAsset(iconKey, locale, region);
  }

  /**
   * Clear asset cache
   */
  public clearCache(): void {
    this.assetCache.clear();
    this.preloadedAssets.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): {
    cachedAssets: number;
    preloadedAssets: number;
    cacheSize: number;
  } {
    return {
      cachedAssets: this.assetCache.size,
      preloadedAssets: this.preloadedAssets.size,
      cacheSize: this.assetCache.size + this.preloadedAssets.size
    };
  }
}

// Create singleton instance
export const assetService = new AssetService({
  basePath: '/assets/images',
  fallbackPath: '/assets/images/global',
  supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
  preloadCritical: true
});
