# Webflow Integration Guide

## 🌍 GrubTech Localization System for Webflow

This guide shows you how to integrate the GrubTech localization system with your Webflow project. The system provides **25+ regional variants** with proper asset localization and real-time translation updates.

## 🎯 What You Get

### ✅ **Multi-language Support**
- **25+ Regional Variants** including English (Global, US, UK, AU, CA, NL, MX, Nordics, ME), Arabic (Global, ME), Spanish (Global, ES, US, MX, LATAM), French (Global, FR, CA, BE, CH), German (DE), Italian (IT), Portuguese (PT), Dutch (NL, BE), Swedish (SE)
- **RTL Support** for Arabic languages
- **Regional Currency Formatting** for each locale
- **Cultural Asset Localization** with region-specific images and icons

### ✅ **Real-time Updates**
- **Webhook Integration** for live translation updates
- **Asset Updates** without code changes
- **Cache Management** for optimal performance

## 📁 Project Structure (Cleaned for Webflow)

```
Grubtech Localization files/
├── src/
│   ├── localization/
│   │   ├── TranslationService.js          # Core translation service
│   │   ├── AssetService.js                # Asset localization service
│   │   └── types.js                       # Type definitions
│   └── translations/                      # Translation files
│       ├── en.json, en-US.json, en-GB.json, etc.
│       ├── ar.json, ar-ME.json
│       ├── es.json, es-ES.json, es-US.json, etc.
│       ├── fr.json, fr-FR.json, fr-CA.json, etc.
│       ├── de.json, it.json, pt.json, nl.json, sv.json
│       └── ... (all 25+ regional variants)
├── public/
│   └── assets/
│       └── images/                        # Localized assets
│           ├── global/
│           ├── en-US/, en-GB/, en-AU/, etc.
│           ├── ar/, ar-ME/
│           ├── es/, es-ES/, es-US/, etc.
│           └── ... (all regional directories)
├── webflow/
│   ├── js/
│   │   ├── localization.js                # Webflow integration script
│   │   ├── language-switcher.js           # Language switcher component
│   │   └── asset-loader.js                # Asset loading for Webflow
│   ├── css/
│   │   ├── localization.css               # Localization styles
│   │   └── rtl-support.css                # RTL support styles
│   └── html/
│       ├── language-switcher.html         # Language switcher HTML
│       └── webflow-elements.html          # Webflow element examples
└── docs/
    ├── WEBFLOW_INTEGRATION_GUIDE.md       # This guide
    ├── WEBFLOW_SETUP_INSTRUCTIONS.md      # Setup instructions
    └── WEBFLOW_CUSTOMIZATION_GUIDE.md     # Customization guide
```

## 🚀 Quick Start

### Step 1: Add JavaScript Files to Webflow

1. **Upload the localization files** to your Webflow project's custom code section
2. **Add the main script** to your site's head or before closing body tag
3. **Initialize the system** with your configuration

### Step 2: Add CSS for Styling

1. **Upload the CSS files** to your Webflow project
2. **Customize the styles** to match your design
3. **Test RTL support** for Arabic languages

### Step 3: Set Up Webflow Elements

1. **Add language switcher** to your navigation
2. **Set up translatable text elements** with data attributes
3. **Configure asset elements** for localized images

## 📝 Implementation Steps

### 1. Add JavaScript to Webflow

#### In Webflow Designer:
1. Go to **Project Settings** → **Custom Code**
2. Add to **Head Code**:
```html
<!-- Localization System -->
<script src="https://grubtech.com/webflow/js/localization.js"></script>
<script src="https://grubtech.com/webflow/js/language-switcher.js"></script>
<script src="https://grubtech.com/webflow/js/asset-loader.js"></script>
```

#### Or add to **Footer Code**:
```html
<script>
  // Initialize localization system
  document.addEventListener('DOMContentLoaded', function() {
    const localization = new GrubTechLocalization({
      defaultLocale: 'en',
      supportedLocales: [
        'en', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NL', 'en-MX', 'en-NORDICS', 'en-ME',
        'ar', 'ar-ME',
        'es', 'es-ES', 'es-US', 'es-MX', 'es-LATAM',
        'fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH',
        'de-DE', 'it-IT', 'pt-PT', 'nl-NL', 'nl-BE', 'sv-SE'
      ],
      translationsPath: 'https://grubtech.com/src/translations/',
      assetsPath: 'https://grubtech.com/public/assets/images/',
      webhookEndpoint: 'https://grubtech.com/api/webhook/translations'
    });
    
    localization.init();
  });
</script>
```

### 2. Add CSS to Webflow

#### In Webflow Designer:
1. Go to **Project Settings** → **Custom Code**
2. Add to **Head Code**:
```html
<!-- Localization Styles -->
<link rel="stylesheet" href="https://grubtech.com/webflow/css/localization.css">
<link rel="stylesheet" href="https://grubtech.com/webflow/css/rtl-support.css">
```

### 3. Set Up Webflow Elements

#### Language Switcher
Add this HTML to a **Text Element** or **Embed Element**:
```html
<div class="language-switcher">
  <select id="language-selector">
    <option value="en">🇺🇸 English</option>
    <option value="en-US">🇺🇸 English (US)</option>
    <option value="en-GB">🇬🇧 English (UK)</option>
    <option value="en-AU">🇦🇺 English (AU)</option>
    <option value="en-CA">🇨🇦 English (CA)</option>
    <option value="ar">🇸🇦 العربية</option>
    <option value="ar-ME">🏜️ العربية (الشرق الأوسط)</option>
    <option value="es">🇪🇸 Español</option>
    <option value="es-ES">🇪🇸 Español (España)</option>
    <option value="es-US">🇺🇸 Español (US)</option>
    <option value="es-MX">🇲🇽 Español (México)</option>
    <option value="fr">🇫🇷 Français</option>
    <option value="fr-FR">🇫🇷 Français (France)</option>
    <option value="fr-CA">🇨🇦 Français (Canada)</option>
    <option value="de-DE">🇩🇪 Deutsch</option>
    <option value="it-IT">🇮🇹 Italiano</option>
    <option value="pt-PT">🇵🇹 Português</option>
    <option value="nl-NL">🇳🇱 Nederlands</option>
    <option value="sv-SE">🇸🇪 Svenska</option>
  </select>
</div>
```

#### Translatable Text Elements
Add `data-translate` attributes to your text elements:
```html
<!-- In Webflow, add these as custom attributes to your text elements -->
<h1 data-translate="home.hero_title">Delicious Food Delivered Fast</h1>
<p data-translate="home.hero_subtitle">Order from your favorite restaurants</p>
<button data-translate="home.cta_button">Order Now</button>
```

#### Localized Images
Add `data-asset` attributes to your image elements:
```html
<!-- In Webflow, add these as custom attributes to your image elements -->
<img data-asset="hero-banner" alt="Hero banner" />
<img data-asset="logo" alt="GrubTech Logo" />
<img data-asset="delivery-truck" alt="Delivery truck" />
```

## 🎨 Webflow-Specific Implementation

### 1. Text Translation in Webflow

#### Method 1: Data Attributes (Recommended)
1. **Select your text element** in Webflow Designer
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-translate` with value like `home.hero_title`
4. **Set default text** in the element

#### Method 2: Class-based Translation
1. **Add a class** like `translate-home-hero-title` to your text element
2. **The system will automatically** find and translate elements with this pattern

### 2. Image Localization in Webflow

#### Method 1: Data Attributes (Recommended)
1. **Select your image element** in Webflow Designer
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-asset` with value like `hero-banner`
4. **Set a default image** in the element

#### Method 2: Background Images
1. **Add a class** like `localized-bg-hero-banner` to your element
2. **The system will automatically** set the appropriate background image

### 3. Language Switcher in Webflow

#### Option 1: Dropdown (Recommended)
1. **Add a Select element** to your navigation
2. **Add the language options** as shown above
3. **Add the class** `language-switcher` to the select element

#### Option 2: Button Group
1. **Add button elements** for each language
2. **Add classes** like `lang-btn-en`, `lang-btn-ar`, etc.
3. **The system will handle** the click events automatically

## 🔧 Configuration Options

### Basic Configuration
```javascript
const localization = new GrubTechLocalization({
  // Default language
  defaultLocale: 'en',
  
  // Supported languages
  supportedLocales: ['en', 'en-US', 'ar', 'es', 'fr'],
  
  // Path to translation files
  translationsPath: 'https://your-domain.com/src/translations/',
  
  // Path to asset files
  assetsPath: 'https://your-domain.com/public/assets/images/',
  
  // Webhook endpoint for updates
  webhookEndpoint: 'https://your-domain.com/api/webhook/translations',
  
  // Auto-detect user language
  autoDetect: true,
  
  // Save language preference
  savePreference: true,
  
  // Enable RTL support
  rtlSupport: true
});
```

### Advanced Configuration
```javascript
const localization = new GrubTechLocalization({
  // ... basic config
  
  // Custom selectors
  selectors: {
    textElements: '[data-translate]',
    imageElements: '[data-asset]',
    languageSwitcher: '.language-switcher select',
    rtlElements: '[data-rtl]'
  },
  
  // Custom callbacks
  onLanguageChange: function(newLocale, oldLocale) {
    console.log(`Language changed from ${oldLocale} to ${newLocale}`);
    // Custom logic here
  },
  
  onAssetLoad: function(assetKey, assetPath) {
    console.log(`Asset loaded: ${assetKey} -> ${assetPath}`);
    // Custom logic here
  },
  
  // Performance options
  preloadAssets: true,
  cacheAssets: true,
  lazyLoadImages: true
});
```

## 📱 Responsive Design

### Mobile Language Switcher
```css
/* Mobile-specific language switcher */
@media (max-width: 768px) {
  .language-switcher select {
    font-size: 14px;
    padding: 8px;
  }
  
  .language-switcher {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }
}
```

### RTL Support
```css
/* RTL-specific styles */
[dir="rtl"] .language-switcher {
  left: 10px;
  right: auto;
}

[dir="rtl"] .hero-content {
  text-align: right;
}

[dir="rtl"] .navigation {
  direction: rtl;
}
```

## 🔄 Webhook Integration

### Set Up Webhook Endpoint
1. **Create a webhook endpoint** on your server
2. **Configure it to receive** translation updates
3. **Set up the endpoint** in your localization configuration

### Webhook Payload Example
```json
{
  "type": "translation_update",
  "locale": "en-US",
  "translations": {
    "home": {
      "hero_title": "Fast Food Delivery in the US",
      "hero_subtitle": "Get your favorite meals delivered quickly"
    }
  },
  "assets": {
    "hero-banner": "hero/hero-banner-us-v2.jpg"
  }
}
```

## 🧪 Testing

### Test Language Switching
1. **Open your Webflow site**
2. **Use the language switcher** to change languages
3. **Verify text changes** to the new language
4. **Check RTL support** for Arabic languages
5. **Test asset loading** for different regions

### Test Asset Localization
1. **Switch to different regions** (US, UK, Middle East)
2. **Verify images change** to region-appropriate versions
3. **Check fallback behavior** when assets are missing
4. **Test responsive images** on different screen sizes

## 🚀 Deployment

### 1. Upload Files
1. **Upload translation files** to your CDN or server
2. **Upload asset files** to your CDN or server
3. **Upload JavaScript and CSS files** to your CDN or server

### 2. Configure Webflow
1. **Add custom code** to your Webflow project
2. **Set up elements** with proper data attributes
3. **Test the integration** thoroughly

### 3. Set Up Webhooks
1. **Create webhook endpoint** for real-time updates
2. **Configure your CMS** to send webhook notifications
3. **Test webhook functionality**

## 🎉 Benefits for Webflow

### ✅ **No Code Required**
- **Visual implementation** using Webflow Designer
- **Data attributes** for easy setup
- **Automatic translation** of text elements

### ✅ **Performance Optimized**
- **Lazy loading** of translations and assets
- **Caching** for better performance
- **CDN-ready** asset delivery

### ✅ **SEO Friendly**
- **Proper language tags** for search engines
- **RTL support** for Arabic content
- **Structured data** for better indexing

### ✅ **Real-time Updates**
- **Webhook integration** for live updates
- **No redeployment** required for content changes
- **Instant language switching**

## 📞 Support

For questions about Webflow integration:
1. **Check the documentation** in the `docs/` folder
2. **Review the examples** in the `webflow/html/` folder
3. **Test the implementation** using the provided test files

The system is designed to work seamlessly with Webflow while providing enterprise-level localization capabilities! 🌍
