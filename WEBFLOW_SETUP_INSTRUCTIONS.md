# Webflow Setup Instructions

## 🚀 Quick Setup Guide

Follow these steps to integrate the GrubTech localization system with your Webflow project.

## 📋 Prerequisites

- Webflow account with Designer access
- Access to your project's custom code section
- Basic understanding of HTML/CSS/JavaScript

## 🔧 Step-by-Step Setup

### Step 1: Upload Files to Your Server

1. **Upload the JavaScript files** to your server or CDN:
   - `webflow/js/localization.js`
   - `webflow/js/language-switcher.js`
   - `webflow/js/asset-loader.js`

2. **Upload the CSS files** to your server or CDN:
   - `webflow/css/localization.css`
   - `webflow/css/rtl-support.css`

3. **Upload the translation files** to your server or CDN:
   - All files from `src/translations/` directory

4. **Upload the asset files** to your server or CDN:
   - All files from `public/assets/images/` directory

### Step 2: Add Custom Code to Webflow

#### In Webflow Designer:

1. **Go to Project Settings** → **Custom Code**

2. **Add to Head Code**:
```html
<!-- Localization System CSS -->
<link rel="stylesheet" href="https://your-domain.com/webflow/css/localization.css">
<link rel="stylesheet" href="https://your-domain.com/webflow/css/rtl-support.css">

<!-- Localization System JavaScript -->
<script src="https://your-domain.com/webflow/js/localization.js"></script>
<script src="https://your-domain.com/webflow/js/language-switcher.js"></script>
<script src="https://your-domain.com/webflow/js/asset-loader.js"></script>

<!-- Configuration -->
<script>
  window.grubtechLocalizationConfig = {
    defaultLocale: 'en',
    supportedLocales: [
      'en', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NL', 'en-MX', 'en-NORDICS', 'en-ME',
      'ar', 'ar-ME',
      'es', 'es-ES', 'es-US', 'es-MX', 'es-LATAM',
      'fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH',
      'de-DE', 'it-IT', 'pt-PT', 'nl-NL', 'nl-BE', 'sv-SE'
    ],
    translationsPath: 'https://your-domain.com/src/translations/',
    assetsPath: 'https://your-domain.com/public/assets/images/',
    autoDetect: true,
    savePreference: true,
    rtlSupport: true,
    preloadAssets: true,
    cacheAssets: true,
    lazyLoadImages: true
  };
</script>
```

3. **Add to Footer Code** (optional, for initialization):
```html
<script>
  // Initialize the system
  document.addEventListener('DOMContentLoaded', function() {
    if (window.grubtechLocalization) {
      window.grubtechLocalization.init();
    }
  });
</script>
```

### Step 3: Set Up Language Switcher

#### Option A: Select-based Switcher (Recommended)

1. **Add a Select element** to your navigation
2. **Add the class** `language-switcher select`
3. **Add the options** from `webflow/html/language-switcher.html`

#### Option B: Dropdown-based Switcher

1. **Add a Div element** to your navigation
2. **Add the class** `language-switcher dropdown`
3. **Add the HTML** from `webflow/html/language-switcher.html`

#### Option C: Button-based Switcher

1. **Add a Div element** to your navigation
2. **Add the class** `language-switcher buttons`
3. **Add the HTML** from `webflow/html/language-switcher.html`

### Step 4: Set Up Translatable Elements

#### For Text Elements:

1. **Select your text element** in Webflow Designer
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-translate` with value like `home.hero_title`
4. **Set default text** in the element

#### For Image Elements:

1. **Select your image element** in Webflow Designer
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-asset` with value like `hero-banner`
4. **Set a default image** in the element

#### For Background Images:

1. **Select your element** in Webflow Designer
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attributes**:
   - `data-asset-type="background"`
   - `data-asset="hero-banner"`

### Step 5: Test the Integration

1. **Publish your Webflow site**
2. **Open the published site**
3. **Test the language switcher**
4. **Verify text changes** to different languages
5. **Check RTL support** for Arabic languages
6. **Test asset loading** for different regions

## 🎨 Customization

### Custom Styling

You can customize the appearance by adding CSS to your Webflow project:

```css
/* Custom language switcher styling */
.language-switcher select {
  background: #your-color;
  border: 2px solid #your-border-color;
  border-radius: 8px;
}

/* Custom RTL styling */
[dir="rtl"] .your-element {
  text-align: right;
}
```

### Custom Configuration

Modify the configuration in the Head Code:

```javascript
window.grubtechLocalizationConfig = {
  // Your custom configuration
  defaultLocale: 'en-US',
  supportedLocales: ['en-US', 'es-US', 'ar'],
  translationsPath: 'https://your-cdn.com/translations/',
  assetsPath: 'https://your-cdn.com/assets/',
  // ... other options
};
```

## 🔍 Troubleshooting

### Common Issues

1. **Language switcher not working**
   - Check if JavaScript files are loaded
   - Verify the configuration is correct
   - Check browser console for errors

2. **Text not translating**
   - Verify `data-translate` attributes are set correctly
   - Check if translation files are accessible
   - Verify the translation keys exist

3. **Images not loading**
   - Check if `data-asset` attributes are set correctly
   - Verify asset files are accessible
   - Check if asset paths are correct

4. **RTL not working**
   - Verify `rtl-support.css` is loaded
   - Check if Arabic locale is selected
   - Verify RTL styles are applied

### Debug Mode

Enable debug mode to see detailed logs:

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  debug: true
};
```

## 📱 Mobile Optimization

### Mobile Language Switcher

For mobile devices, use a compact language switcher:

```html
<div class="language-switcher mobile">
  <select class="mobile-language-select">
    <option value="en">🌐 EN</option>
    <option value="ar">🇸🇦 AR</option>
    <option value="es">🇪🇸 ES</option>
  </select>
</div>
```

### Responsive Images

Enable responsive images for better mobile performance:

```html
<img data-asset="hero-banner" 
     data-responsive="true"
     alt="Hero banner" />
```

## 🚀 Performance Optimization

### Preload Critical Assets

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  preloadAssets: true,
  criticalAssets: ['hero-banner', 'logo', 'delivery-truck']
};
```

### Enable Caching

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  cacheAssets: true,
  cacheTranslations: true
};
```

### Lazy Loading

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  lazyLoadImages: true
};
```

## 🔄 Webhook Integration

### Set Up Webhook Endpoint

1. **Create a webhook endpoint** on your server
2. **Configure it to receive** translation updates
3. **Set the endpoint** in your configuration:

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  webhookEndpoint: 'https://your-domain.com/api/webhook/translations'
};
```

### Webhook Payload Example

```json
{
  "type": "translation_update",
  "locale": "en-US",
  "translations": {
    "home": {
      "hero_title": "Fast Food Delivery in the US"
    }
  }
}
```

## 📊 Analytics Integration

### Track Language Changes

```javascript
window.grubtechLocalizationConfig = {
  // ... other config
  onLanguageChange: function(newLocale, oldLocale) {
    // Google Analytics
    gtag('event', 'language_change', {
      'new_language': newLocale,
      'old_language': oldLocale
    });
    
    // Custom analytics
    analytics.track('Language Changed', {
      newLocale: newLocale,
      oldLocale: oldLocale
    });
  }
};
```

## 🎉 You're Ready!

Your Webflow site now has:

- ✅ **25+ Regional Variants** with proper localization
- ✅ **Real-time Translation Updates** via webhooks
- ✅ **Asset Localization** with region-specific images
- ✅ **RTL Support** for Arabic languages
- ✅ **Performance Optimization** with caching and lazy loading
- ✅ **Mobile Responsive** language switcher
- ✅ **SEO Friendly** with proper language tags

## 📞 Support

If you need help:

1. **Check the documentation** in the `docs/` folder
2. **Review the examples** in the `webflow/html/` folder
3. **Test the implementation** using the provided test files
4. **Enable debug mode** to see detailed logs

The system is designed to work seamlessly with Webflow while providing enterprise-level localization capabilities! 🌍
