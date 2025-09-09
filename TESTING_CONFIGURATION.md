# Testing Configuration Guide

## 🧪 Environment-Based Configuration

The localization system now automatically detects the environment and uses the appropriate domain. **No file changes needed** when switching between testing and production!

## 🔧 How It Works

### **Automatic Domain Detection**

The system automatically detects the environment:

```javascript
// Auto-detect environment and set appropriate domain
const isProduction = window.location.hostname === 'grubtech.com' || window.location.hostname === 'www.grubtech.com';
const baseDomain = isProduction ? 'https://grubtech.com' : 'https://your-test-domain.com';
```

### **Production Environment**
- **Domain**: `grubtech.com` or `www.grubtech.com`
- **Files served from**: `https://grubtech.com/`
- **Translations**: `https://grubtech.com/src/translations/`
- **Assets**: `https://grubtech.com/public/assets/images/`

### **Testing Environment**
- **Domain**: Any other domain (e.g., `test.grubtech.com`, `staging.grubtech.com`)
- **Files served from**: `https://your-test-domain.com/`
- **Translations**: `https://your-test-domain.com/src/translations/`
- **Assets**: `https://your-test-domain.com/public/assets/images/`

## 🚀 Setup for Testing

### **Step 1: Set Up Your Test Domain**

1. **Choose a test domain** (e.g., `test.grubtech.com`, `staging.grubtech.com`)
2. **Upload all files** to your test domain
3. **Ensure the same file structure** as production

### **Step 2: Update Test Domain in Code**

**Option A: Update the test domain in the code**

Edit these files and replace `your-test-domain.com` with your actual test domain:

```javascript
// In webflow/js/localization.js and webflow/js/asset-loader.js
const baseDomain = isProduction ? 'https://grubtech.com' : 'https://your-actual-test-domain.com';
```

**Option B: Use environment variables (Advanced)**

```javascript
// In webflow/js/localization.js and webflow/js/asset-loader.js
const baseDomain = isProduction ? 'https://grubtech.com' : (window.GRUBTECH_TEST_DOMAIN || 'https://your-test-domain.com');
```

Then set the test domain in your Webflow custom code:

```html
<script>
  window.GRUBTECH_TEST_DOMAIN = 'https://your-actual-test-domain.com';
</script>
```

### **Step 3: Test the Configuration**

1. **Deploy to your test domain**
2. **Open the test site**
3. **Check browser console** for any errors
4. **Test language switching**
5. **Verify translations load** from the correct domain

## 🔍 Testing Checklist

### **Basic Functionality**
- [ ] Language switcher appears and works
- [ ] Text translates when switching languages
- [ ] RTL support works for Arabic
- [ ] Assets load correctly
- [ ] No console errors

### **Domain Detection**
- [ ] Production site uses `grubtech.com` domain
- [ ] Test site uses your test domain
- [ ] Files load from correct paths
- [ ] Translations load from correct paths

### **Performance**
- [ ] Translations load quickly
- [ ] Assets load efficiently
- [ ] Caching works properly
- [ ] No unnecessary requests

## 🛠️ Manual Override (If Needed)

If you need to manually override the domain detection, you can set it in your Webflow custom code:

```html
<script>
  // Override domain detection
  window.GRUBTECH_FORCE_DOMAIN = 'https://your-specific-domain.com';
</script>
```

Then update the JavaScript files to use this override:

```javascript
// In webflow/js/localization.js and webflow/js/asset-loader.js
const isProduction = window.location.hostname === 'grubtech.com' || window.location.hostname === 'www.grubtech.com';
const baseDomain = window.GRUBTECH_FORCE_DOMAIN || (isProduction ? 'https://grubtech.com' : 'https://your-test-domain.com');
```

## 📱 Testing on Different Environments

### **Local Development**
- Use `localhost` or `127.0.0.1`
- Set up local server to serve the files
- Test with different ports

### **Staging Environment**
- Use staging domain (e.g., `staging.grubtech.com`)
- Upload files to staging server
- Test before production deployment

### **Production Environment**
- Use production domain (`grubtech.com`)
- Upload files to production server
- Monitor for any issues

## 🔧 Troubleshooting

### **Files Not Loading**
1. **Check file paths** in browser network tab
2. **Verify files exist** on the server
3. **Check CORS settings** if needed
4. **Verify domain detection** is working

### **Wrong Domain Being Used**
1. **Check browser console** for domain detection
2. **Verify hostname** matches expected values
3. **Check for manual overrides**
4. **Clear browser cache**

### **Translation Files Not Found**
1. **Verify translation files** are uploaded
2. **Check file permissions**
3. **Verify JSON format** is valid
4. **Check network requests** in browser

## 🎯 Best Practices

### **File Organization**
```
your-test-domain.com/
├── webflow/
│   ├── js/
│   ├── css/
│   └── html/
├── src/
│   └── translations/
└── public/
    └── assets/
        └── images/
```

### **Testing Workflow**
1. **Develop on test domain**
2. **Test all functionality**
3. **Fix any issues**
4. **Deploy to production**
5. **Verify production works**

### **Version Control**
- Keep test and production files in sync
- Use same file structure
- Test changes on staging first
- Document any differences

## 🚀 Quick Start for Testing

1. **Set up your test domain**
2. **Upload all files** to test domain
3. **Update test domain** in the code (replace `your-test-domain.com`)
4. **Deploy to Webflow** with test domain
5. **Test functionality**
6. **Deploy to production** when ready

The system will automatically use the correct domain based on where it's running! 🌍

## 🚀 **Step-by-Step Integration for Your Webflow Testing Account**

### **Step 1: Set Up Your Test Server/CDN**

#### 1.1 Choose a Hosting Solution
You need to host the localization files on a server. I recommend:
- **Netlify** (Free tier available) - Easy drag & drop
- **Vercel** (Free tier available) - Great for developers
- **GitHub Pages** (Free) - If you use GitHub

#### 1.2 Upload Localization Files
Upload these files to your chosen hosting service:

```
your-test-server.com/
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
│       ├── en-extended.json
│       ├── ar.json
│       ├── ar-extended.json
│       ├── es.json
│       ├── es-extended.json
│       └── ... (other language files)
└── public/
    └── assets/
        └── images/
            ├── global/
            ├── en-US/
            ├── ar/
            ├── es/
            └── ... (regional directories)
```

### **Step 2: Configure Webflow Project**

#### 2.1 Access Webflow Designer
1. **Log into Webflow**
2. **Open your project** `gt-website-1-2-2e65d3`
3. **Go to Project Settings** → **Custom Code**

#### 2.2 Add Custom Code to Head
Add this code to the **Head Code** section:

```html
<code_block_to_apply_changes_from>
```

**Important:** Replace `https://your-test-server.com` with your actual test server URL.

### **Step 3: Add Language Switcher to Your Site**

#### 3.1 Add Language Switcher
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
  <button class="language-option" data-locale="ar">
    <span class="language-flag">🇦</span>
    <span class="language-name">العربية</span>
  </button>
  <button class="language-option" data-locale="es">
    <span class="language-flag">🇸</span>
    <span class="language-name">Español</span>
  </button>
  <button class="language-option" data-locale="fr">
    <span class="language-flag">🇷</span>
    <span class="language-name">Français</span>
  </button>
  <button class="language-option" data-locale="de-DE">
    <span class="language-flag">🇪</span>
    <span class="language-name">Deutsch</span>
  </button>
</div>
```

### **Step 4: Set Up Translatable Elements**

#### 4.1 Navigation Elements
For each navigation item, add `data-translate` attributes:

1. **Select the text element** (e.g., "Restaurants")
2. **Go to Element Settings** → **Custom Attributes**
3. **Add attribute**: `data-translate="navigation.restaurants"`

**Key Elements to Translate:**
- "Restaurants" → `data-translate="navigation.restaurants"`
- "Solutions" → `data-translate="navigation.solutions"`
- "Integrations" → `data-translate="navigation.integrations"`
- "Resources" → `data-translate="navigation.resources"`
- "Company" → `data-translate="navigation.company"`
- "Log in" → `data-translate="navigation.login"`
- "Let's Talk" → `data-translate="navigation.lets_talk"`

#### 4.2 Hero Section
- **Hero Title**: `data-translate="hero.title"`
- **Hero Subtitle**: `data-translate="hero.subtitle"`
- **CTA Button**: `data-translate="hero.cta_button"`

#### 4.3 Restaurant Types
- "Independent & SMEs" → `data-translate="restaurants.independent_smes"`
- "Regional Chains" → `data-translate="restaurants.regional_chains"`
- "Global Brands" → `data-translate="restaurants.global_brands"`
- "Dark Kitchens" → `data-translate="restaurants.dark_kitchens"`

#### 4.4 Solutions Section
- "Solutions" → `data-translate="solutions.title"`
- "Your all-in-one integration hub..." → `data-translate="solutions.subtitle"`
- "The simpler, faster way to manage your orders" → `data-translate="solutions.gonline.title"`
- "Say goodbye to paper tickets..." → `data-translate="solutions.gonline.description"`

### **Step 5: Set Up Localized Assets**

#### 5.1 Images
1. **Select the hero banner image**
2. **Add attribute**: `data-asset="hero-banner"`

1. **Select the GrubTech logo**
2. **Add attribute**: `data-asset="logo"`

1. **Select feat
