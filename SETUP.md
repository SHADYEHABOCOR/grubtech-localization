# GrubTech Localization Setup Guide

This guide will walk you through setting up the GrubTech localization system step by step.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 16+** installed
- **npm or yarn** package manager
- **Git** for version control
- **Code editor** (VS Code recommended)
- **Basic knowledge** of React and TypeScript

## 🚀 Installation Steps

### Step 1: Project Setup

1. **Navigate to the project directory**
   ```bash
   cd "/Users/shadyehab/Downloads/Grubtech Localization files"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm list --depth=0
   ```

### Step 2: Environment Configuration

1. **Create environment file**
   ```bash
   touch .env.local
   ```

2. **Add environment variables**
   ```env
   # Webhook Configuration
   TRANSLATION_WEBHOOK_SECRET=your-secure-webhook-secret-here
   
   # Optional Configuration
   NEXT_PUBLIC_DEFAULT_LOCALE=en
   NEXT_PUBLIC_FALLBACK_LOCALE=en
   NEXT_PUBLIC_ENABLE_AUTO_PRELOAD=true
   ```

3. **Generate a secure webhook secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 3: Development Server

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:3000`

3. **Test language switching**
   - Click the language switcher in the header
   - Verify translations change
   - Test RTL layout with Arabic

## 🔧 Configuration Options

### LocalizationProvider Configuration

In `src/pages/_app.tsx`, you can customize the provider:

```tsx
<LocalizationProvider
  fallbackLocale="en"           // Fallback language
  preloadLocales={['ar', 'es']} // Preload these languages
  enableAutoPreload={true}      // Auto-preload all languages
>
  <Component {...pageProps} />
</LocalizationProvider>
```

### Language Switcher Configuration

Customize the language switcher appearance:

```tsx
<LanguageSwitcher
  variant="dropdown"           // 'dropdown', 'buttons', or 'select'
  showFlags={true}            // Show country flags
  showNativeNames={true}      // Show native language names
  showEnglishNames={false}    // Show English names
  size="medium"               // 'small', 'medium', or 'large'
  position="bottom"           // Dropdown position
  onLanguageChange={(locale) => {
    console.log('Language changed to:', locale);
  }}
/>
```

## 🌐 Adding New Languages

### Step 1: Create Translation Files

1. **Create source translation file**
   ```bash
   touch src/translations/de.json
   ```

2. **Create public translation file**
   ```bash
   touch public/translations/de.json
   ```

3. **Add translations** (example for German):
   ```json
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
   }
   ```

### Step 2: Update TranslationService

1. **Open** `src/localization/TranslationService.ts`

2. **Add new locale** to `supportedLocales`:
   ```typescript
   {
     code: 'de',
     name: 'German',
     nativeName: 'Deutsch',
     rtl: false,
     currency: { code: 'EUR', symbol: '€', format: '{amount} {symbol}' }
   }
   ```

### Step 3: Update Next.js Configuration

1. **Open** `next.config.js`

2. **Add locale** to the locales array:
   ```javascript
   i18n: {
     locales: ['en', 'ar', 'es', 'fr', 'de'],
     defaultLocale: 'en',
     localeDetection: true,
   }
   ```

## 🔗 Webhook Setup

### Step 1: Configure Webhook Endpoint

1. **Deploy your application** to a server with a public URL

2. **Set up webhook URL** in your translation service:
   ```
   https://your-domain.com/api/webhook/translations
   ```

3. **Configure webhook secret** in your translation service

### Step 2: Test Webhook

1. **Check health endpoint**
   ```bash
   curl https://your-domain.com/api/webhook/health
   ```

2. **Test webhook** (example with curl):
   ```bash
   curl -X POST https://your-domain.com/api/webhook/translations \
     -H "Content-Type: application/json" \
     -H "X-Webhook-Source: github" \
     -H "X-Hub-Signature-256: sha256=your-signature" \
     -d '{"action": "push", "repository": {"full_name": "test/repo"}}'
   ```

### Step 3: Configure Translation Services

#### GitHub Webhooks
1. Go to repository Settings → Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhook/translations`
3. Select "Push" events
4. Set secret to your `TRANSLATION_WEBHOOK_SECRET`

#### Contentful Webhooks
1. Go to Settings → Webhooks
2. Create new webhook
3. Set URL to your webhook endpoint
4. Select "Entry" events
5. Set secret in environment variables

## 🎨 Customization

### Custom Styling

1. **Override CSS variables** in your global styles:
   ```css
   :root {
     --primary-color: #your-color;
     --secondary-color: #your-color;
     --text-color: #your-color;
   }
   ```

2. **Customize language switcher**:
   ```css
   .language-switcher {
     --switcher-bg: #your-color;
     --switcher-text: #your-color;
     --switcher-border: #your-color;
   }
   ```

### Custom Components

1. **Create custom translation component**:
   ```tsx
   import { useTranslation } from '../localization/useTranslation';
   
   function CustomComponent() {
     const { t } = useTranslation('custom');
     
     return <div>{t('my_key')}</div>;
   }
   ```

2. **Add custom translation hooks**:
   ```tsx
   import { useTranslation } from '../localization/useTranslation';
   
   function useCustomTranslation() {
     const { t, formatCurrency } = useTranslation();
     
     const formatPrice = (amount: number) => {
       return formatCurrency(amount);
     };
     
     return { t, formatPrice };
   }
   ```

## 🧪 Testing

### Unit Tests

1. **Install testing dependencies**:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Create test file**:
   ```tsx
   // __tests__/TranslationService.test.ts
   import { TranslationService } from '../src/localization/TranslationService';
   
   describe('TranslationService', () => {
     test('should load translations', async () => {
       const service = new TranslationService();
       const translations = await service.loadTranslation('en');
       expect(translations).toBeDefined();
     });
   });
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

### Integration Tests

1. **Test language switching**:
   ```tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { LocalizationProvider } from '../src/localization/LocalizationProvider';
   import LanguageSwitcher from '../src/localization/LanguageSwitcher';
   
   test('should switch language', async () => {
     render(
       <LocalizationProvider>
         <LanguageSwitcher />
       </LocalizationProvider>
     );
     
     const button = screen.getByRole('button');
     fireEvent.click(button);
     
     const arabicOption = screen.getByText('العربية');
     fireEvent.click(arabicOption);
     
     // Verify language changed
     expect(document.documentElement.dir).toBe('rtl');
   });
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Docker Deployment

1. **Create Dockerfile**:
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

2. **Build and run**:
   ```bash
   docker build -t grubtech-localization .
   docker run -p 3000:3000 grubtech-localization
   ```

### Environment Variables for Production

Set these in your deployment platform:

```env
TRANSLATION_WEBHOOK_SECRET=your-production-secret
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_FALLBACK_LOCALE=en
NEXT_PUBLIC_ENABLE_AUTO_PRELOAD=true
```

## 🔍 Monitoring and Debugging

### Enable Debug Logging

1. **Add debug flag** to environment:
   ```env
   NEXT_PUBLIC_DEBUG_TRANSLATIONS=true
   ```

2. **Check browser console** for translation logs

### Monitor Webhook Activity

1. **Check webhook logs**:
   ```bash
   # View application logs
   tail -f logs/app.log
   ```

2. **Monitor webhook endpoint**:
   ```bash
   curl https://your-domain.com/api/webhook/health
   ```

### Performance Monitoring

1. **Monitor translation loading times**:
   ```typescript
   const startTime = performance.now();
   await translationService.loadTranslation('ar');
   const endTime = performance.now();
   console.log(`Translation loaded in ${endTime - startTime}ms`);
   ```

## 🆘 Troubleshooting

### Common Issues and Solutions

#### Translations Not Loading
- **Check file paths**: Ensure files exist in `public/translations/`
- **Verify JSON syntax**: Use a JSON validator
- **Check browser console**: Look for network errors
- **Verify CORS**: Ensure files are accessible

#### RTL Not Working
- **Check locale configuration**: Ensure RTL flag is set
- **Verify CSS**: Check RTL styles are applied
- **Check HTML**: Verify `dir` attribute is set

#### Webhook Not Working
- **Check secret**: Verify webhook secret matches
- **Check URL**: Ensure endpoint URL is correct
- **Check logs**: Review server logs for errors
- **Test manually**: Use curl to test webhook

#### Performance Issues
- **Enable preloading**: Set `enableAutoPreload={true}`
- **Check bundle size**: Use webpack-bundle-analyzer
- **Optimize images**: Compress translation-related images
- **Use CDN**: Serve translation files from CDN

### Getting Help

1. **Check documentation**: Review README.md and API docs
2. **Search issues**: Look for similar problems in GitHub issues
3. **Create issue**: Provide detailed error information
4. **Contact support**: Reach out to the development team

## 📚 Additional Resources

- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n)
- [React Context API](https://reactjs.org/docs/context.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RTL CSS Guidelines](https://rtlcss.com/)

---

**Need help?** Create an issue or contact the development team.
