# Asset Localization Guide

## 🌍 Overview

The GrubTech localization system now supports **localized assets** - images, icons, and other media that change based on language and region. This allows for cultural adaptation, regional branding, and localized visual content.

## 🎯 Key Features

### ✅ **Regional Asset Support**
- **25+ Regional Variants** with region-specific assets
- **Cultural Adaptation** - Different images for different cultures
- **Regional Branding** - Localized logos, icons, and visual elements
- **Fallback System** - Graceful degradation when assets are missing

### ✅ **Asset Types Supported**
- **Images**: Hero banners, backgrounds, product photos
- **Icons**: Delivery trucks, payment methods, restaurant types
- **Logos**: Region-specific branding
- **UI Elements**: Buttons, patterns, decorative elements

### ✅ **Performance Features**
- **Lazy Loading** - Assets load only when needed
- **Preloading** - Critical assets preloaded for better UX
- **Responsive Images** - Multiple sizes for different screen sizes
- **Caching** - Asset caching for better performance

## 📁 Directory Structure

```
public/assets/images/
├── global/                    # Global fallback assets
│   ├── hero/
│   ├── logo/
│   ├── icons/
│   └── backgrounds/
├── en/                        # English (Global)
├── en-US/                     # United States
├── en-GB/                     # United Kingdom
├── en-AU/                     # Australia
├── en-CA/                     # Canada
├── en-NL/                     # Netherlands
├── en-MX/                     # Mexico
├── en-NORDICS/                # Nordic countries
├── en-ME/                     # Middle East
├── ar/                        # Arabic (Global)
├── ar-ME/                     # Arabic (Middle East)
├── es/                        # Spanish (Global)
├── es-ES/                     # Spain
├── es-US/                     # Spanish (US)
├── es-MX/                     # Mexico
├── es-LATAM/                  # Latin America
├── fr/                        # French (Global)
├── fr-FR/                     # France
├── fr-CA/                     # Canada
├── fr-BE/                     # Belgium
├── fr-CH/                     # Switzerland
├── de-DE/                     # Germany
├── it-IT/                     # Italy
├── pt-PT/                     # Portugal
├── nl-NL/                     # Netherlands
├── nl-BE/                     # Belgium
└── sv-SE/                     # Sweden
```

## 🚀 Usage Examples

### Basic Localized Image

```tsx
import LocalizedImage from '../localization/LocalizedImage';

// Simple localized image
<LocalizedImage
  assetKey="hero-banner"
  alt="Hero banner"
  width={1920}
  height={1080}
  responsive={true}
  preload={true}
/>
```

### Localized Icon

```tsx
import { LocalizedIcon } from '../localization/LocalizedImage';

// Region-specific delivery icon
<LocalizedIcon
  iconKey="delivery-truck"
  size={48}
  alt="Delivery truck"
/>
```

### Localized Background

```tsx
import { LocalizedBackground } from '../localization/LocalizedImage';

// Background with overlay
<LocalizedBackground
  assetKey="hero-banner"
  overlay={true}
  overlayColor="rgba(0, 0, 0, 0.4)"
  overlayOpacity={0.4}
>
  <h1>Hero Content</h1>
</LocalizedBackground>
```

### Using the Hook

```tsx
import { useLocalizedAsset } from '../localization/useLocalizedAsset';

const MyComponent = () => {
  const { assetPath, alt, isLoading, error } = useLocalizedAsset('hero-banner');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading image</div>;
  
  return <img src={assetPath} alt={alt} />;
};
```

## 🎨 Asset Examples by Region

### Hero Banners
- **Global**: Generic food delivery scene
- **US**: American-style food trucks and delivery
- **UK**: British pub food and delivery vans
- **Middle East**: Arabic food and local delivery methods
- **Germany**: German cuisine and delivery bikes

### Delivery Icons
- **US**: Large delivery trucks
- **UK**: Delivery vans
- **Netherlands**: Bicycles (common delivery method)
- **Middle East**: Motorcycles (popular delivery method)
- **Mexico**: Bicycles and motorcycles

### Payment Methods
- **US**: Credit cards, PayPal, Apple Pay
- **UK**: Debit cards, PayPal, contactless
- **Germany**: EC cards, SEPA
- **Netherlands**: iDEAL, Bancontact
- **Sweden**: Swish, Klarna

### Restaurant Icons
- **US**: American diners and fast food
- **France**: Bistros and cafes
- **Italy**: Trattorias and pizzerias
- **Spain**: Tapas bars
- **Japan**: Sushi restaurants and ramen shops

## 🔧 Configuration

### Asset Manifest

The system uses an `asset-manifest.json` file to define available assets:

```json
{
  "assets": {
    "hero-banner": {
      "global": {
        "path": "hero/hero-banner.jpg",
        "alt": "Delicious food delivery hero banner",
        "width": 1920,
        "height": 1080,
        "formats": ["jpg", "webp"],
        "sizes": ["sm", "md", "lg", "xl"]
      },
      "en-US": {
        "path": "hero/hero-banner-us.jpg",
        "alt": "Fast food delivery in the United States"
      }
    }
  }
}
```

### Asset Service Configuration

```typescript
const assetService = new AssetService({
  basePath: '/assets/images',
  fallbackPath: '/assets/images/global',
  supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
  preloadCritical: true
});
```

## 🎯 Fallback Strategy

The system uses a sophisticated fallback strategy:

1. **Region-specific** (e.g., `en-US/hero-banner.jpg`)
2. **Language-specific** (e.g., `en/hero-banner.jpg`)
3. **Custom fallback** (if provided)
4. **Global fallback** (e.g., `global/hero-banner.jpg`)
5. **Base path** (final fallback)

## 📱 Responsive Images

The system automatically generates responsive image sources:

```tsx
<LocalizedImage
  assetKey="hero-banner"
  responsive={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

This generates:
- `hero-banner-sm.jpg` (320px)
- `hero-banner-md.jpg` (768px)
- `hero-banner-lg.jpg` (1024px)
- `hero-banner-xl.jpg` (1920px)

## ⚡ Performance Optimization

### Preloading Critical Assets

```tsx
import { useAssetPreloader } from '../localization/useLocalizedAsset';

const MyComponent = () => {
  const { preloadCriticalAssets } = useAssetPreloader();
  
  useEffect(() => {
    preloadCriticalAssets();
  }, []);
};
```

### Lazy Loading

```tsx
<LocalizedImage
  assetKey="hero-banner"
  loading="lazy"
  preload={false}
/>
```

### Caching

```tsx
import { useAssetCache } from '../localization/useLocalizedAsset';

const { clearCache, getCacheStats } = useAssetCache();
```

## 🎨 Cultural Considerations

### RTL Support
- Arabic assets are automatically mirrored for RTL layouts
- Icons and UI elements adapted for right-to-left reading

### Color Schemes
- Regional color preferences (e.g., red for China, green for Islamic countries)
- Cultural color associations

### Imagery
- Local food and cuisine
- Regional architecture and landscapes
- Cultural symbols and icons
- Local delivery methods and vehicles

## 🔄 Webhook Integration

Assets can be updated in real-time via webhooks:

```javascript
// Webhook payload
{
  "type": "asset_update",
  "locale": "en-US",
  "assetKey": "hero-banner",
  "assetPath": "hero/hero-banner-us-v2.jpg",
  "metadata": {
    "width": 1920,
    "height": 1080,
    "format": "webp"
  }
}
```

## 📊 Asset Management

### Adding New Assets

1. **Create the asset file** in the appropriate locale directory
2. **Update the manifest** with asset metadata
3. **Test the fallback** system
4. **Update translations** if needed

### Asset Naming Convention

```
{category}/{asset-name}-{locale}.{extension}
```

Examples:
- `hero/hero-banner-en-US.jpg`
- `icons/delivery-truck-uk.svg`
- `logo/grubtech-logo-ar.png`

### Asset Optimization

- **WebP format** for better compression
- **Multiple sizes** for responsive design
- **Lazy loading** for non-critical assets
- **Preloading** for above-the-fold content

## 🧪 Testing

### Testing Asset Fallbacks

```tsx
// Test with missing asset
<LocalizedImage
  assetKey="non-existent-asset"
  fallbackToLanguage={true}
  fallbackToGlobal={true}
  customFallback="fallback-image.jpg"
/>
```

### Testing Regional Variants

```tsx
// Test different locales
const locales = ['en-US', 'en-GB', 'ar', 'es-MX'];

locales.forEach(locale => {
  // Switch locale and test asset loading
  translationService.setLocale(locale);
  // Verify correct asset is loaded
});
```

## 🚀 Best Practices

### 1. **Asset Organization**
- Use consistent naming conventions
- Organize by category and locale
- Keep global fallbacks updated

### 2. **Performance**
- Optimize images for web
- Use appropriate formats (WebP, SVG)
- Implement lazy loading
- Preload critical assets

### 3. **Accessibility**
- Provide meaningful alt text
- Ensure sufficient color contrast
- Test with screen readers

### 4. **Cultural Sensitivity**
- Research local preferences
- Avoid cultural stereotypes
- Use appropriate imagery
- Respect local customs

### 5. **Fallback Strategy**
- Always provide fallbacks
- Test fallback scenarios
- Keep global assets updated
- Monitor asset loading errors

## 📈 Monitoring

### Asset Loading Metrics

```typescript
const { getCacheStats } = useAssetCache();
const stats = getCacheStats();
console.log('Cached assets:', stats.cachedAssets);
console.log('Preloaded assets:', stats.preloadedAssets);
```

### Error Tracking

```tsx
<LocalizedImage
  assetKey="hero-banner"
  onError={(error) => {
    console.error('Asset loading error:', error);
    // Send to analytics
  }}
/>
```

## 🎉 Conclusion

The asset localization system provides:

- **25+ Regional Variants** with proper asset support
- **Cultural Adaptation** for better user experience
- **Performance Optimization** with lazy loading and caching
- **Fallback System** for reliability
- **Real-time Updates** via webhooks
- **Responsive Design** with multiple image sizes

This system ensures that GrubTech can provide a truly localized experience with region-appropriate visuals, cultural sensitivity, and optimal performance across all supported markets! 🌍
