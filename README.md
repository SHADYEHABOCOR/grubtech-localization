# GrubTech Localization System

A comprehensive localization system for the GrubTech website with external translation files and webhook integration for real-time updates.

## 🌐 Webflow Cloud Deployment

This repository is configured for **Webflow Cloud** deployment with automatic builds and static site generation.

### What is Webflow Cloud?

Webflow Cloud serves a static site from a GitHub branch at a chosen **mount path** inside a Webflow site. It does not run servers; it just hosts the built files. Our environment mounts at `/localization`.

### How We Deploy

1. **Push to `main`** → GitHub Action builds → pushes static files to `main` branch
2. **Webflow Cloud environment** is linked to `main` branch
3. **Click Deploy/Publish** in Webflow → app is live at `https://<domain>/localization`

### Deployment Status

- ✅ **Static Site**: Ready for Webflow Cloud
- ✅ **Build Automation**: GitHub Actions configured
- ✅ **Mount Path**: `/localization`
- ✅ **SPA Support**: 404.html fallback included
- ✅ **Asset Paths**: Relative paths for proper loading

### Access URLs

- **Staging**: `https://gt-website-1-2-2e65d3.webflow.io/localization`
- **Production**: `https://grubtech.com/localization` (when deployed)

## 🌟 Features

- **Multi-language Support**: 25+ Regional Variants including English (Global, US, UK, AU, CA, NL, MX, Nordics, ME), Arabic (Global, ME), Spanish (Global, ES, US, MX, LATAM), French (Global, FR, CA, BE, CH), German (DE), Italian (IT), Portuguese (PT), Dutch (NL, BE), Swedish (SE)
- **Real-time Updates**: Webhook integration for live translation updates
- **RTL Support**: Full right-to-left language support for Arabic
- **TypeScript Support**: Fully typed for better development experience
- **Performance Optimized**: Lazy loading, caching, and preloading
- **Accessibility**: WCAG compliant with screen reader support
- **Responsive Design**: Mobile-first approach with responsive components
- **Dark Mode**: Automatic dark mode support
- **Error Handling**: Comprehensive error handling and fallbacks

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Next.js 14+

### Installation

1. **Clone or download the project**
   ```bash
   cd "Grubtech Localization files"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌍 Supported Languages & Regions

The system supports 25+ regional variants with proper localization:

### English Variants
- **Global** (en) - Default English
- **United States** (en-US) - US English with $ currency
- **United Kingdom** (en-GB) - British English with £ currency
- **Australia** (en-AU) - Australian English with A$ currency
- **Canada** (en-CA) - Canadian English with C$ currency
- **Netherlands** (en-NL) - English for Netherlands with € currency
- **Mexico** (en-MX) - English for Mexico with $ currency
- **Nordics** (en-NORDICS) - English for Nordic countries
- **Middle East** (en-ME) - English for Middle East

### Arabic Variants
- **Global** (ar) - Standard Arabic with RTL support
- **Middle East** (ar-ME) - Arabic for Middle East region

### Spanish Variants
- **Global** (es) - Standard Spanish
- **Spain** (es-ES) - Spanish for Spain with € currency
- **United States** (es-US) - Spanish for US with $ currency
- **Mexico** (es-MX) - Mexican Spanish with $ currency
- **LATAM** (es-LATAM) - Spanish for Latin America

### French Variants
- **Global** (fr) - Standard French
- **France** (fr-FR) - French for France with € currency
- **Canada** (fr-CA) - Canadian French with C$ currency
- **Belgium** (fr-BE) - French for Belgium with € currency
- **Switzerland** (fr-CH) - French for Switzerland with CHF currency

### Other Languages
- **German** (de-DE) - German for Germany with € currency
- **Italian** (it-IT) - Italian for Italy with € currency
- **Portuguese** (pt-PT) - Portuguese for Portugal with € currency
- **Dutch** (nl-NL) - Dutch for Netherlands with € currency
- **Dutch Belgium** (nl-BE) - Dutch for Belgium with € currency
- **Swedish** (sv-SE) - Swedish for Sweden with kr currency

## 📁 Project Structure

```
src/
├── localization/
│   ├── LocalizationProvider.tsx    # React context provider
│   ├── useTranslation.ts           # Custom hooks for translations
│   ├── TranslationService.ts       # Core translation service
│   ├── LanguageSwitcher.tsx        # Language selection component
│   └── LanguageSwitcher.css        # Language switcher styles
├── translations/                   # Source translation files
│   ├── en.json                    # English translations
│   ├── ar.json                    # Arabic translations
│   ├── es.json                    # Spanish translations
│   └── fr.json                    # French translations
├── components/                     # Sample components
│   ├── Header.tsx                 # Header with navigation
│   ├── Header.css                 # Header styles
│   ├── Hero.tsx                   # Hero section
│   ├── Hero.css                   # Hero styles
│   ├── MenuCard.tsx               # Menu item card
│   └── MenuCard.css               # Menu card styles
├── api/
│   └── webhook/
│       └── translations.js        # Webhook endpoint
├── pages/
│   ├── _app.tsx                   # App wrapper with provider
│   └── index.tsx                  # Homepage
└── styles/
    └── globals.css                # Global styles with RTL support

public/
└── translations/                  # Public translation files
    ├── en.json
    ├── ar.json
    ├── es.json
    └── fr.json

pages/api/webhook/                 # Next.js API routes
├── translations.js                # Webhook handler
└── health.js                      # Health check
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Webhook Configuration
TRANSLATION_WEBHOOK_SECRET=your-webhook-secret-here

# Optional: Translation Service Configuration
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_FALLBACK_LOCALE=en
NEXT_PUBLIC_ENABLE_AUTO_PRELOAD=true
```

### Next.js Configuration

The `next.config.js` file includes i18n configuration:

```javascript
module.exports = {
  i18n: {
    locales: ['en', 'ar', 'es', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  // ... other config
};
```

## 🎯 Usage

### Basic Translation

```tsx
import { useTranslation } from '../localization/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero_title')}</h1>
      <p>{t('home.hero_subtitle')}</p>
    </div>
  );
}
```

### Namespace-specific Translation

```tsx
import { useTranslation } from '../localization/useTranslation';

function MenuComponent() {
  const { t } = useTranslation('menu');
  
  return (
    <div>
      <h2>{t('categories')}</h2>
      <button>{t('add_to_cart')}</button>
    </div>
  );
}
```

### Translation with Parameters

```tsx
function OrderComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('time.minutes_ago', { count: 15 })}</p>
      <p>{t('errors.min_length', { min: 8 })}</p>
    </div>
  );
}
```

### Language Switcher

```tsx
import LanguageSwitcher from '../localization/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher
        variant="dropdown"
        showFlags={true}
        showNativeNames={true}
        onLanguageChange={(locale) => {
          console.log('Language changed to:', locale);
        }}
      />
    </header>
  );
}
```

### Currency Formatting

```tsx
import { useCurrency } from '../localization/useTranslation';

function PriceComponent({ amount }) {
  const { format } = useCurrency();
  
  return <span>{format(amount)}</span>;
}
```

### Date Formatting

```tsx
import { useDateFormat } from '../localization/useTranslation';

function DateComponent({ date }) {
  const { format } = useDateFormat();
  
  return <span>{format(date, { dateStyle: 'long' })}</span>;
}
```

## 🌐 Adding New Languages

### 1. Create Translation File

Create a new JSON file in `src/translations/` and `public/translations/`:

```json
// src/translations/de.json (German)
{
  "common": {
    "loading": "Wird geladen...",
    "error": "Fehler aufgetreten",
    "success": "Erfolg"
  },
  "navigation": {
    "home": "Startseite",
    "menu": "Menü",
    "about": "Über uns",
    "contact": "Kontakt"
  }
  // ... more translations
}
```

### 2. Update TranslationService

Add the new locale to the `supportedLocales` array in `TranslationService.ts`:

```typescript
public readonly supportedLocales: SupportedLocale[] = [
  // ... existing locales
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    rtl: false,
    currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' }
  }
];
```

### 3. Update Next.js Config

Add the new locale to `next.config.js`:

```javascript
i18n: {
  locales: ['en', 'ar', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  localeDetection: true,
}
```

## 🔗 Webhook Integration

### Setting Up Webhooks

The system supports webhooks from various translation services:

- **GitHub**: For file-based translations
- **Contentful**: For CMS-based translations
- **Crowdin**: For professional translation services
- **Lokalise**: For translation management
- **Phrase**: For translation workflows
- **Weblate**: For open-source translations
- **Transifex**: For enterprise translations

### Webhook Endpoint

The webhook endpoint is available at:
```
POST /api/webhook/translations
```

### Webhook Configuration

1. **Set webhook secret** in environment variables
2. **Configure your translation service** to send webhooks to your endpoint
3. **Test the webhook** using the health check endpoint

### Health Check

Check webhook service status:
```
GET /api/webhook/health
```

### Example Webhook Payload (GitHub)

```json
{
  "action": "push",
  "repository": {
    "full_name": "your-org/grubtech"
  },
  "commits": [
    {
      "modified": ["src/translations/ar.json"]
    }
  ]
}
```

## 🎨 Styling and RTL Support

### RTL Support

The system automatically detects RTL languages and applies appropriate styles:

```css
/* RTL-specific styles */
.rtl {
  direction: rtl;
  text-align: right;
}

.rtl .nav-link::after {
  left: auto;
  right: 0;
}
```

### Dark Mode

Automatic dark mode support based on user preference:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #111827;
    color: #f9fafb;
  }
}
```

### Accessibility

WCAG 2.1 AA compliant with:
- Proper focus management
- Screen reader support
- High contrast mode support
- Reduced motion support

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Translations

```tsx
import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from '../localization/LocalizationProvider';
import MyComponent from './MyComponent';

test('renders translated text', () => {
  render(
    <LocalizationProvider>
      <MyComponent />
    </LocalizationProvider>
  );
  
  expect(screen.getByText('Delicious Food Delivered Fast')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

1. **Set environment variables** in your deployment platform
2. **Configure webhook secrets** for security
3. **Set up CDN** for translation files (optional)
4. **Configure monitoring** for webhook endpoints

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance Optimization

### Lazy Loading

Translations are loaded on-demand:

```typescript
// Only loads when needed
await translationService.loadTranslation('ar');
```

### Preloading

Preload common languages for better UX:

```typescript
// Preload multiple languages
await translationService.preloadTranslations(['ar', 'es', 'fr']);
```

### Caching

Translations are cached in memory and localStorage:

```typescript
// Clear cache when needed
await translationService.clearCache();
```

## 🔒 Security

### Webhook Security

- **Signature verification** using HMAC-SHA256
- **Rate limiting** to prevent abuse
- **IP whitelisting** (optional)
- **Secret validation** for all webhook sources

### Content Security

- **XSS protection** through proper escaping
- **CSRF protection** for webhook endpoints
- **Input validation** for all webhook payloads

## 🐛 Troubleshooting

### Common Issues

1. **Translations not loading**
   - Check file paths in `public/translations/`
   - Verify JSON syntax
   - Check browser console for errors

2. **RTL not working**
   - Ensure locale is marked as RTL in `TranslationService`
   - Check CSS RTL rules are applied
   - Verify HTML `dir` attribute is set

3. **Webhook not working**
   - Check webhook secret configuration
   - Verify endpoint URL is correct
   - Check server logs for errors

### Debug Mode

Enable debug logging:

```typescript
// In TranslationService
console.log('Loading translation for:', locale);
console.log('Translation data:', data);
```

## 📚 API Reference

### TranslationService

```typescript
class TranslationService {
  // Load translation for locale
  async loadTranslation(locale: string): Promise<TranslationData>
  
  // Get translation for key
  translate(key: string, params?: TranslationParams): string
  
  // Set current locale
  async setLocale(locale: string): Promise<void>
  
  // Format currency
  formatCurrency(amount: number): string
  
  // Format date
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string
  
  // Clear cache
  async clearCache(): Promise<void>
}
```

### useTranslation Hook

```typescript
function useTranslation(namespace?: string) {
  return {
    t: (key: string, params?: TranslationParams) => string,
    locale: string,
    localeConfig: SupportedLocale | undefined,
    isLoading: boolean,
    error: string | null,
    setLocale: (locale: string) => Promise<void>,
    formatCurrency: (amount: number) => string,
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string,
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string
  };
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Add proper error handling
- Include accessibility features
- Test with multiple languages
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

---

**Built with ❤️ for GrubTech**
