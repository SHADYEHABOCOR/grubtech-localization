# GrubTech Website Localization - Complete Integration Guide

## 🎯 Overview

This guide will help you integrate the localization system with the [GrubTech website](https://www.grubtech.com/) to support **25+ regional variants** including English, Arabic, Spanish, French, German, Italian, Portuguese, Dutch, and Swedish.

## 📋 Prerequisites

- Access to GrubTech's Webflow project
- Server/CDN access to host the localization files
- Basic understanding of Webflow Designer
- Access to GrubTech's domain (grubtech.com)

## 🚀 Step-by-Step Integration

### Step 1: Prepare Your Server/CDN

#### 1.1 Upload Localization Files

Upload these files to your server at `https://grubtech.com/`:

```
grubtech.com/
├── webflow/
│   ├── js/
│   │   ├── localization.js
│   │   ├── language-switcher.js
│   │   └── asset-loader.js
│   ├── css/
│   │   ├── localization.css
│   │   └── rtl-support.css
│   └── html/
│       ├── language-switcher.html
│       └── webflow-elements.html
├── src/
│   └── translations/
│       ├── en.json
│       ├── ar.json
│       ├── es.json
│       ├── fr.json
│       ├── de.json
│       ├── it.json
│       ├── pt.json
│       ├── nl.json
│       └── sv.json
└── public/
    └── assets/
        └── images/
            ├── global/
            ├── en-US/
            ├── ar/
            ├── es/
            └── ... (all regional directories)
```

#### 1.2 Verify File Accessibility

Test that your files are accessible:
- `https://grubtech.com/webflow/js/localization.js`
- `https://grubtech.com/src/translations/en.json`
- `https://grubtech.com/webflow/css/localization.css`

### Step 2: Configure Webflow Project

#### 2.1 Access Webflow Designer

1. **Log into Webflow**
2. **Open your GrubTech project**
3. **Go to Project Settings** → **Custom Code**

#### 2.2 Add Custom Code to Head

Add this code to the **Head Code** section:

```html
<!-- GrubTech Localization System -->
<link rel="stylesheet" href="https://grubtech.com/webflow/css/localization.css">
<link rel="stylesheet" href="https://grubtech.com/webflow/css/rtl-support.css">

<script src="https://grubtech.com/webflow/js/localization.js"></script>
<script src="https://grubtech.com/webflow/js/language-switcher.js"></script>
<script src="https://grubtech.com/webflow/js/asset-loader.js"></script>

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
    translationsPath: 'https://grubtech.com/src/translations/',
    assetsPath: 'https://grubtech.com/public/assets/images/',
    webhookEndpoint: 'https://grubtech.com/api/webhook/translations',
    autoDetect: true,
    savePreference: true,
    rtlSupport: true,
    preloadAssets: true,
    cacheAssets: true,
    lazyLoadImages: true,
    onLanguageChange: function(newLocale, oldLocale) {
      // Track language changes for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
          'new_language': newLocale,
          'old_language': oldLocale
        });
      }
    }
  };
</script>
```

### Step 3: Add Language Switcher to Navigation

#### 3.1 Choose Language Switcher Type

**Option A: Dropdown (Recommended for Desktop)**

1. **Add a Div element** to your navigation
2. **Add the class** `language-switcher dropdown`
3. **Add this HTML**:

```html
<button class="language-trigger" aria-label="Select language">
  <span class="language-flag">🌐</span>
  <span class="language-name">English</span>
  <span class="language-arrow">▼</span>
</button>
<div class="language-dropdown">
  <button class="language-option active" data-locale="en">
    <span class="language-flag">🌐</span>
    <span class="language-name">English</span>
  </button>
  <button class="language-option" data-locale="en-US">
    <span class="language-flag">🇺🇸</span>
    <span class="language-name">English (US)</span>
  </button>
  <button class="language-option" data-locale="en-GB">
    <span class="language-flag">🇬🇧</span>
    <span class="language-name">English (UK)</span>
  </button>
  <button class="language-option" data-locale="ar">
    <span class="language-flag">🇸🇦</span>
    <span class="language-name">العربية</span>
  </button>
  <button class="language-option" data-locale="ar-ME">
    <span class="language-flag">🏜️</span>
    <span class="language-name">العربية (الشرق الأوسط)</span>
  </button>
  <button class="language-option" data-locale="es">
    <span class="language-flag">🇪🇸</span>
    <span class="language-name">Español</span>
  </button>
  <button class="language-option" data-locale="es-US">
    <span class="language-flag">🇺🇸</span>
    <span class="language-name">Español (US)</span>
  </button>
  <button class="language-option" data-locale="es-MX">
    <span class="language-flag">🇲🇽</span>
    <span class="language-name">Español (México)</span>
  </button>
  <button class="language-option" data-locale="fr">
    <span class="language-flag">🇫🇷</span>
    <span class="language-name">Français</span>
  </button>
  <button class="language-option" data-locale="de-DE">
    <span class="language-flag">🇩🇪</span>
    <span class="language-name">Deutsch</span>
  </button>
  <button class="language-option" data-locale="it-IT">
    <span class="language-flag">🇮🇹</span>
    <span class="language-name">Italiano</span>
  </button>
  <button class="language-option" data-locale="pt-PT">
    <span class="language-flag">🇵🇹</span>
    <span class="language-name">Português</span>
  </button>
  <button class="language-option" data-locale="nl-NL">
    <span class="language-flag">🇳🇱</span>
    <span class="language-name">Nederlands</span>
  </button>
  <button class="language-option" data-locale="sv-SE">
    <span class="language-flag">🇸🇪</span>
    <span class="language-name">Svenska</span>
  </button>
</div>
```

**Option B: Select Dropdown (Mobile-Friendly)**

1. **Add a Select element** to your navigation
2. **Add the class** `language-switcher select`
3. **Add these options**:

```html
<select class="language-select">
  <option value="en">🌐 English</option>
  <option value="en-US">🇺🇸 English (US)</option>
  <option value="en-GB">🇬🇧 English (UK)</option>
  <option value="ar">🇸🇦 العربية</option>
  <option value="ar-ME">🏜️ العربية (الشرق الأوسط)</option>
  <option value="es">🇪🇸 Español</option>
  <option value="es-US">🇺🇸 Español (US)</option>
  <option value="es-MX">🇲🇽 Español (México)</option>
  <option value="fr">🇫🇷 Français</option>
  <option value="de-DE">🇩🇪 Deutsch</option>
  <option value="it-IT">🇮🇹 Italiano</option>
  <option value="pt-PT">🇵🇹 Português</option>
  <option value="nl-NL">🇳🇱 Nederlands</option>
  <option value="sv-SE">🇸🇪 Svenska</option>
</select>
```

### Step 4: Set Up Translatable Elements

#### 4.1 Navigation Elements

For each navigation item, add `data-translate` attributes:

1. **Select the text element** (e.g., "Restaurants")
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-translate="navigation.restaurants"`

**Navigation Elements to Translate:**
- "Restaurants" → `data-translate="navigation.restaurants"`
- "Solutions" → `data-translate="navigation.solutions"`
- "Integrations" → `data-translate="navigation.integrations"`
- "Resources" → `data-translate="navigation.resources"`
- "Company" → `data-translate="navigation.company"`
- "Log in" → `data-translate="navigation.login"`
- "Let's Talk" → `data-translate="navigation.lets_talk"`

#### 4.2 Hero Section

**Hero Title:**
- Select the "Smart restaurants run on Grubtech" text
- Add attribute: `data-translate="hero.title"`

**Hero Subtitle:**
- Select the subtitle text
- Add attribute: `data-translate="hero.subtitle"`

**CTA Button:**
- Select the "Let's Talk" button
- Add attribute: `data-translate="hero.cta_button"`

#### 4.3 Restaurant Types Section

**Section Title:**
- "Restaurants" → `data-translate="restaurants.title"`
- "Based on size" → `data-translate="restaurants.based_on_size"`

**Restaurant Types:**
- "Independent & SMEs" → `data-translate="restaurants.independent_smes"`
- "Regional Chains" → `data-translate="restaurants.regional_chains"`
- "Global Brands" → `data-translate="restaurants.global_brands"`
- "Dark Kitchens" → `data-translate="restaurants.dark_kitchens"`

#### 4.4 Solutions Section

**Section Title:**
- "Solutions" → `data-translate="solutions.title"`
- "Your all-in-one integration hub..." → `data-translate="solutions.subtitle"`

**Solution Items:**
- "The simpler, faster way to manage your orders" → `data-translate="solutions.gonline.title"`
- "Say goodbye to paper tickets..." → `data-translate="solutions.gonline.description"`
- "Get orders out the door faster..." → `data-translate="solutions.gdispatch.title"`
- "Unlock powerful insights..." → `data-translate="solutions.gdata.title"`

#### 4.5 Integrations Section

**Section Title:**
- "Integrations" → `data-translate="integrations.title"`
- "Our Integrations" → `data-translate="integrations.our_integrations"`

**Integration Types:**
- "POS Systems" → `data-translate="integrations.pos_systems"`
- "Delivery Platforms" → `data-translate="integrations.delivery_platforms"`
- "Fulfillment" → `data-translate="integrations.fulfillment"`
- "ERP Systems" → `data-translate="integrations.erp_systems"`

**Partners Section:**
- "Our Partners" → `data-translate="integrations.our_partners"`
- "A connected ecosystem with 300+ global partners..." → `data-translate="integrations.partners_description"`
- "Learn more" → `data-translate="integrations.learn_more"`

#### 4.6 Resources Section

**Section Title:**
- "Resources" → `data-translate="resources.title"`

**Resource Items:**
- "Blog" → `data-translate="resources.blog.title"`
- "Fresh insights, expert tips..." → `data-translate="resources.blog.description"`
- "Knowledge Base" → `data-translate="resources.knowledge_base.title"`
- "From setup to success..." → `data-translate="resources.knowledge_base.description"`

#### 4.7 Company Section

**Section Title:**
- "Company" → `data-translate="company.title"`

**Company Items:**
- "About us" → `data-translate="company.about_us.title"`
- "Learn about our journey..." → `data-translate="company.about_us.description"`
- "Careers" → `data-translate="company.careers.title"`
- "We're hiring! We're always looking..." → `data-translate="company.careers.description"`

#### 4.8 Stats Section

**Stats Titles:**
- "Uptime Guaranteed" → `data-translate="stats.uptime"`
- "Reliable, always-on technology..." → `data-translate="stats.uptime_description"`
- "Orders Processed" → `data-translate="stats.orders_processed"`
- "Seamless transactions..." → `data-translate="stats.orders_description"`
- "Integration Partners" → `data-translate="stats.integration_partners"`
- "Connecting you with the best tools..." → `data-translate="stats.partners_description"`

#### 4.9 Features Section

**Section Title:**
- "Built with your restaurant in mind" → `data-translate="features.title"`

**Feature Types:**
- "Single & Multi-location Restaurants" → `data-translate="features.single_multi_location"`
- "Regional Chains" → `data-translate="features.regional_chains"`
- "International Brands" → `data-translate="features.international_brands"`
- "Delivery-Only Kitchens" → `data-translate="features.delivery_only_kitchens"`

**Feature Descriptions:**
- "Keep service sharp and operations lean" → `data-translate="features.keep_service_sharp"`
- "Simplify restaurant operations..." → `data-translate="features.simplify_operations"`
- "Process dine-in, takeaway..." → `data-translate="features.process_orders"`
- "Automate order routing" → `data-translate="features.automate_routing"`
- "Understand guest habits..." → `data-translate="features.understand_habits"`
- "Read more" → `data-translate="features.read_more"`

#### 4.10 Footer Section

**Footer Sections:**
- "Restaurants" → `data-translate="footer.restaurants"`
- "Small & Medium" → `data-translate="footer.small_medium"`
- "Regional Chains" → `data-translate="footer.regional_chains"`
- "Global Chains" → `data-translate="footer.global_chains"`
- "Dark Kitchens" → `data-translate="footer.dark_kitchens"`
- "Solutions" → `data-translate="footer.solutions"`
- "gOnline" → `data-translate="footer.gonline"`
- "gOnline Lite" → `data-translate="footer.gonline_lite"`
- "gDispatch" → `data-translate="footer.gdispatch"`
- "gKDS" → `data-translate="footer.gkds"`
- "gData" → `data-translate="footer.gdata"`
- "Integrations" → `data-translate="footer.integrations"`
- "POS Systems" → `data-translate="footer.pos_systems"`
- "Delivery Platforms" → `data-translate="footer.delivery_platforms"`
- "Fulfillment" → `data-translate="footer.fulfillment"`
- "ERP Systems" → `data-translate="footer.erp_systems"`
- "Resources" → `data-translate="footer.resources"`
- "Blog" → `data-translate="footer.blog"`
- "Knowledge Base" → `data-translate="footer.knowledge_base"`
- "FAQs" → `data-translate="footer.faqs"`
- "About" → `data-translate="footer.about"`
- "© 2025 Grubtech. All rights reserved." → `data-translate="footer.copyright"`
- "DPA" → `data-translate="footer.dpa"`
- "Terms" → `data-translate="footer.terms"`
- "Privacy" → `data-translate="footer.privacy"`
- "Service Level Agreement" → `data-translate="footer.service_level_agreement"`
- "GDPR" → `data-translate="footer.gdpr"`

### Step 5: Set Up Localized Assets

#### 5.1 Hero Banner

1. **Select the hero banner image**
2. **Add attribute**: `data-asset="hero-banner"`

#### 5.2 Logo

1. **Select the GrubTech logo**
2. **Add attribute**: `data-asset="logo"`

#### 5.3 Feature Icons

For each feature icon:
1. **Select the icon image**
2. **Add attribute**: `data-asset="feature-icon"`

#### 5.4 Background Images

For background images:
1. **Select the element with background image**
2. **Add attributes**:
   - `data-asset-type="background"`
   - `data-asset="hero-banner"` (or appropriate asset key)

### Step 6: Test the Integration

#### 6.1 Publish and Test

1. **Publish your Webflow site**
2. **Open the published site**
3. **Test the language switcher**
4. **Verify text changes** to different languages
5. **Check RTL support** for Arabic languages
6. **Test asset loading** for different regions

#### 6.2 Debug Mode

If you encounter issues, enable debug mode by adding this to your configuration:

```javascript
window.grubtechLocalizationConfig = {
  // ... existing config
  debug: true
};
```

### Step 7: Set Up Webhook for Real-time Updates

#### 7.1 Create Webhook Endpoint

Create a webhook endpoint at `https://grubtech.com/api/webhook/translations` that can receive translation updates.

#### 7.2 Webhook Payload Example

```json
{
  "type": "translation_update",
  "locale": "en-US",
  "translations": {
    "hero": {
      "title": "Smart restaurants run on Grubtech - US Edition"
    }
  }
}
```

## 🎨 Customization Options

### Custom Styling

Add custom CSS to match GrubTech's brand:

```css
/* Custom GrubTech styling */
.language-switcher select {
  background: #your-brand-color;
  border: 2px solid #your-border-color;
  border-radius: 8px;
}

/* RTL support for Arabic */
[dir="rtl"] .hero-content {
  text-align: right;
}
```

### Regional Customization

You can customize content for specific regions by creating region-specific translation files:

- `en-US.json` - US-specific content
- `ar-ME.json` - Middle East Arabic content
- `es-MX.json` - Mexico Spanish content

## 📱 Mobile Optimization

### Mobile Language Switcher

For mobile devices, use a compact language switcher:

```html
<div class="language-switcher mobile">
  <select class="mobile-language-select">
    <option value="en">🌐 EN</option>
    <option value="ar">🇸🇦 AR</option>
    <option value="es">🇪🇸 ES</option>
    <option value="fr">🇫🇷 FR</option>
  </select>
</div>
```

## 🚀 Performance Optimization

### Preload Critical Assets

```javascript
window.grubtechLocalizationConfig = {
  // ... existing config
  preloadAssets: true,
  criticalAssets: ['hero-banner', 'logo', 'feature-icon']
};
```

### Enable Caching

```javascript
window.grubtechLocalizationConfig = {
  // ... existing config
  cacheAssets: true,
  cacheTranslations: true
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

## 📊 Analytics Integration

### Track Language Changes

```javascript
window.grubtechLocalizationConfig = {
  // ... existing config
  onLanguageChange: function(newLocale, oldLocale) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_change', {
        'new_language': newLocale,
        'old_language': oldLocale
      });
    }
    
    // Custom analytics
    if (typeof analytics !== 'undefined') {
      analytics.track('Language Changed', {
        newLocale: newLocale,
        oldLocale: oldLocale
      });
    }
  }
};
```

## 🎉 You're Ready!

Your GrubTech website now has:

- ✅ **25+ Regional Variants** with proper localization
- ✅ **Real-time Translation Updates** via webhooks
- ✅ **Asset Localization** with region-specific images
- ✅ **RTL Support** for Arabic languages
- ✅ **Performance Optimization** with caching and lazy loading
- ✅ **Mobile Responsive** language switcher
- ✅ **SEO Friendly** with proper language tags

## 📞 Support

If you need help:

1. **Check the browser console** for error messages
2. **Enable debug mode** to see detailed logs
3. **Verify file accessibility** on your server
4. **Test with different browsers** and devices

The system is designed to work seamlessly with Webflow while providing enterprise-level localization capabilities for GrubTech! 🌍
