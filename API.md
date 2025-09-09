# GrubTech Localization API Documentation

This document provides comprehensive API documentation for the GrubTech localization system.

## 📚 Table of Contents

- [TranslationService API](#translationservice-api)
- [React Hooks API](#react-hooks-api)
- [Webhook API](#webhook-api)
- [Component API](#component-api)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)
- [Examples](#examples)

## 🔧 TranslationService API

The core service for managing translations and locale operations.

### Constructor

```typescript
const translationService = new TranslationService();
```

### Methods

#### `loadTranslation(locale: string): Promise<TranslationData>`

Loads translation data for a specific locale.

**Parameters:**
- `locale` (string): The locale code (e.g., 'en', 'en-US', 'ar', 'es-ES', 'fr-CA')

**Supported Locales:**
- English: `en`, `en-US`, `en-GB`, `en-AU`, `en-CA`, `en-NL`, `en-MX`, `en-NORDICS`, `en-ME`
- Arabic: `ar`, `ar-ME`
- Spanish: `es`, `es-ES`, `es-US`, `es-MX`, `es-LATAM`
- French: `fr`, `fr-FR`, `fr-CA`, `fr-BE`, `fr-CH`
- German: `de-DE`
- Italian: `it-IT`
- Portuguese: `pt-PT`
- Dutch: `nl-NL`, `nl-BE`
- Swedish: `sv-SE`

**Returns:**
- `Promise<TranslationData>`: The translation data object

**Example:**
```typescript
const translations = await translationService.loadTranslation('ar');
console.log(translations.common.loading); // "جاري التحميل..."

const usTranslations = await translationService.loadTranslation('en-US');
console.log(usTranslations.navigation.cart); // "Cart"

const ukTranslations = await translationService.loadTranslation('en-GB');
console.log(ukTranslations.navigation.cart); // "Basket"
```

#### `translate(key: string, params?: TranslationParams): string`

Translates a key to the current locale with optional parameter interpolation.

**Parameters:**
- `key` (string): The translation key (e.g., 'home.hero_title')
- `params` (TranslationParams, optional): Parameters for interpolation

**Returns:**
- `string`: The translated text

**Example:**
```typescript
const text = translationService.translate('time.minutes_ago', { count: 5 });
// Returns: "5 minutes ago" (in English) or "منذ 5 دقيقة" (in Arabic)
```

#### `setLocale(locale: string): Promise<void>`

Changes the current locale and loads translations if needed.

**Parameters:**
- `locale` (string): The locale code to switch to

**Returns:**
- `Promise<void>`

**Example:**
```typescript
await translationService.setLocale('ar');
// Switches to Arabic and loads Arabic translations
```

#### `getCurrentLocale(): string`

Gets the current active locale.

**Returns:**
- `string`: The current locale code

**Example:**
```typescript
const currentLocale = translationService.getCurrentLocale();
console.log(currentLocale); // "en"
```

#### `getCurrentLocaleConfig(): SupportedLocale | undefined`

Gets the configuration for the current locale.

**Returns:**
- `SupportedLocale | undefined`: The locale configuration

**Example:**
```typescript
const config = translationService.getCurrentLocaleConfig();
console.log(config?.rtl); // true for Arabic, false for English
```

#### `formatCurrency(amount: number): string`

Formats a number as currency according to the current locale.

**Parameters:**
- `amount` (number): The amount to format

**Returns:**
- `string`: The formatted currency string

**Example:**
```typescript
const price = translationService.formatCurrency(12.99);
// Returns: "$12.99" (English) or "12.99 ر.س" (Arabic)
```

#### `formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string`

Formats a date according to the current locale.

**Parameters:**
- `date` (Date): The date to format
- `options` (Intl.DateTimeFormatOptions, optional): Formatting options

**Returns:**
- `string`: The formatted date string

**Example:**
```typescript
const formattedDate = translationService.formatDate(new Date(), { 
  dateStyle: 'long' 
});
// Returns: "December 25, 2024" (English) or "٢٥ ديسمبر ٢٠٢٤" (Arabic)
```

#### `formatNumber(number: number, options?: Intl.NumberFormatOptions): string`

Formats a number according to the current locale.

**Parameters:**
- `number` (number): The number to format
- `options` (Intl.NumberFormatOptions, optional): Formatting options

**Returns:**
- `string`: The formatted number string

**Example:**
```typescript
const formattedNumber = translationService.formatNumber(1234.56);
// Returns: "1,234.56" (English) or "١٬٢٣٤٫٥٦" (Arabic)
```

#### `hasTranslation(key: string): boolean`

Checks if a translation exists for the given key.

**Parameters:**
- `key` (string): The translation key to check

**Returns:**
- `boolean`: True if translation exists

**Example:**
```typescript
const exists = translationService.hasTranslation('home.hero_title');
console.log(exists); // true
```

#### `getNamespaceTranslations(namespace: string): Record<string, string>`

Gets all translations for a specific namespace.

**Parameters:**
- `namespace` (string): The namespace (e.g., 'common', 'navigation')

**Returns:**
- `Record<string, string>`: Object with flattened translation keys

**Example:**
```typescript
const commonTranslations = translationService.getNamespaceTranslations('common');
console.log(commonTranslations['loading']); // "Loading..."
```

#### `clearCache(): Promise<void>`

Clears the translation cache and reloads current locale.

**Returns:**
- `Promise<void>`

**Example:**
```typescript
await translationService.clearCache();
// Clears all cached translations and reloads current locale
```

#### `preloadTranslations(locales?: string[]): Promise<void>`

Preloads translations for specified locales or all supported locales.

**Parameters:**
- `locales` (string[], optional): Array of locale codes to preload

**Returns:**
- `Promise<void>`

**Example:**
```typescript
// Preload specific locales
await translationService.preloadTranslations(['ar', 'es']);

// Preload all supported locales
await translationService.preloadTranslations();
```

#### `handleWebhookUpdate(locale?: string): Promise<void>`

Handles webhook updates by clearing cache and reloading translations.

**Parameters:**
- `locale` (string, optional): Specific locale to update, or all if undefined

**Returns:**
- `Promise<void>`

**Example:**
```typescript
// Update specific locale
await translationService.handleWebhookUpdate('ar');

// Update all locales
await translationService.handleWebhookUpdate();
```

#### `addLocaleChangeListener(listener: (locale: string) => void): () => void`

Adds a listener for locale change events.

**Parameters:**
- `listener` (function): Callback function called when locale changes

**Returns:**
- `function`: Unsubscribe function

**Example:**
```typescript
const unsubscribe = translationService.addLocaleChangeListener((locale) => {
  console.log('Locale changed to:', locale);
});

// Later, unsubscribe
unsubscribe();
```

## 🎣 React Hooks API

### `useTranslation(namespace?: string)`

Main hook for accessing translations and locale information.

**Parameters:**
- `namespace` (string, optional): Namespace for translations

**Returns:**
```typescript
{
  t: (key: string, params?: TranslationParams) => string;
  tn: (key: string, params?: TranslationParams) => string;
  translate: (key: string, params?: TranslationParams) => string;
  locale: string;
  localeConfig: SupportedLocale | undefined;
  isLoading: boolean;
  error: string | null;
  hasTranslation: (key: string) => boolean;
  setLocale: (locale: string) => Promise<void>;
  supportedLocales: SupportedLocale[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  namespaceTranslations: Record<string, string>;
  namespace: string | undefined;
}
```

**Example:**
```tsx
function MyComponent() {
  const { t, locale, setLocale, formatCurrency } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero_title')}</h1>
      <p>Current locale: {locale}</p>
      <button onClick={() => setLocale('ar')}>Switch to Arabic</button>
      <p>Price: {formatCurrency(12.99)}</p>
    </div>
  );
}
```

### `usePluralization(namespace?: string)`

Hook for handling pluralization.

**Returns:**
```typescript
{
  pluralize: (key: string, count: number, params?: TranslationParams) => string;
}
```

**Example:**
```tsx
function ItemCount({ count }) {
  const { pluralize } = usePluralization();
  
  return (
    <p>{pluralize('items.count', count, { count })}</p>
  );
}
```

### `useCurrency(namespace?: string)`

Hook for currency formatting.

**Returns:**
```typescript
{
  format: (amount: number) => string;
  code: string;
  symbol: string;
}
```

**Example:**
```tsx
function PriceDisplay({ amount }) {
  const { format, symbol } = useCurrency();
  
  return (
    <span>{format(amount)} {symbol}</span>
  );
}
```

### `useDateFormat(namespace?: string)`

Hook for date formatting.

**Returns:**
```typescript
{
  format: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  locale: string;
}
```

**Example:**
```tsx
function DateDisplay({ date }) {
  const { format } = useDateFormat();
  
  return (
    <span>{format(date, { dateStyle: 'long' })}</span>
  );
}
```

### `useIsRTL()`

Hook for RTL detection.

**Returns:**
```typescript
boolean
```

**Example:**
```tsx
function MyComponent() {
  const isRTL = useIsRTL();
  
  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      Content
    </div>
  );
}
```

## 🔗 Webhook API

### POST `/api/webhook/translations`

Webhook endpoint for receiving translation updates.

**Headers:**
- `Content-Type: application/json`
- `X-Webhook-Source: <source>` (required)
- `X-Hub-Signature-256: sha256=<signature>` (optional, for verification)

**Supported Sources:**
- `github`
- `contentful`
- `crowdin`
- `lokalise`
- `phrase`
- `weblate`
- `transifex`

**Request Body:**
Varies by source. See examples below.

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "action": "update",
  "locales": ["ar"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Example - GitHub:**
```bash
curl -X POST https://your-domain.com/api/webhook/translations \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Source: github" \
  -H "X-Hub-Signature-256: sha256=your-signature" \
  -d '{
    "action": "push",
    "repository": {
      "full_name": "your-org/grubtech"
    },
    "commits": [
      {
        "modified": ["src/translations/ar.json"]
      }
    ]
  }'
```

**Example - Contentful:**
```bash
curl -X POST https://your-domain.com/api/webhook/translations \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Source: contentful" \
  -d '{
    "sys": {
      "contentType": {
        "sys": {
          "id": "translation"
        }
      }
    },
    "fields": {
      "locale": {
        "en": "ar"
      },
      "key": {
        "en": "home.hero_title"
      },
      "value": {
        "ar": "طعام لذيذ يتم توصيله بسرعة"
      }
    }
  }'
```

### GET `/api/webhook/health`

Health check endpoint for webhook service.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "supportedSources": ["github", "contentful", "crowdin"],
  "rateLimit": {
    "window": 60000,
    "maxRequests": 10
  }
}
```

## 🧩 Component API

### `LanguageSwitcher`

Language selection component with multiple variants.

**Props:**
```typescript
interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons' | 'select';
  showFlags?: boolean;
  showNativeNames?: boolean;
  showEnglishNames?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'left' | 'right';
  onLanguageChange?: (locale: string) => void;
  disabled?: boolean;
  loadingText?: string;
  errorText?: string;
}
```

**Example:**
```tsx
<LanguageSwitcher
  variant="dropdown"
  showFlags={true}
  showNativeNames={true}
  size="medium"
  onLanguageChange={(locale) => {
    console.log('Language changed to:', locale);
  }}
/>
```

### `LocalizationProvider`

React context provider for the entire application.

**Props:**
```typescript
interface LocalizationProviderProps {
  children: ReactNode;
  fallbackLocale?: string;
  preloadLocales?: string[];
  enableAutoPreload?: boolean;
}
```

**Example:**
```tsx
<LocalizationProvider
  fallbackLocale="en"
  preloadLocales={['ar', 'es']}
  enableAutoPreload={true}
>
  <App />
</LocalizationProvider>
```

## 📝 Type Definitions

### `TranslationParams`

```typescript
interface TranslationParams {
  [key: string]: string | number;
}
```

### `TranslationData`

```typescript
interface TranslationData {
  [key: string]: any;
}
```

### `SupportedLocale`

```typescript
interface SupportedLocale {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  currency: {
    code: string;
    symbol: string;
    format: string;
  };
}
```

## ⚠️ Error Handling

### Common Errors

#### `Unsupported locale: <locale>`
- **Cause:** Trying to use a locale not in supportedLocales
- **Solution:** Add locale to supportedLocales or use a supported locale

#### `Translation missing for key: <key>`
- **Cause:** Translation key doesn't exist
- **Solution:** Add the key to translation files or check key spelling

#### `Failed to load translations for <locale>`
- **Cause:** Network error or invalid JSON in translation file
- **Solution:** Check file exists, JSON is valid, and network is working

#### `Webhook signature verification failed`
- **Cause:** Invalid webhook signature
- **Solution:** Check webhook secret matches between service and application

### Error Handling Examples

```tsx
function MyComponent() {
  const { t, error, isLoading } = useTranslation();
  
  if (isLoading) {
    return <div>Loading translations...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return <div>{t('home.hero_title')}</div>;
}
```

```typescript
try {
  await translationService.setLocale('ar');
} catch (error) {
  console.error('Failed to change locale:', error);
  // Fallback to default locale
  await translationService.setLocale('en');
}
```

## 📖 Examples

### Complete Component Example

```tsx
import React, { useState } from 'react';
import { useTranslation, useCurrency, useDateFormat } from '../localization/useTranslation';
import LanguageSwitcher from '../localization/LanguageSwitcher';

function ProductCard({ product }) {
  const { t, locale, setLocale } = useTranslation();
  const { format: formatCurrency } = useCurrency();
  const { format: formatDate } = useDateFormat();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = async () => {
    try {
      // Add to cart logic
      console.log('Added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };
  
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <LanguageSwitcher
          variant="dropdown"
          size="small"
          onLanguageChange={setLocale}
        />
      </div>
      
      <div className="product-details">
        <p className="price">{formatCurrency(product.price)}</p>
        <p className="description">{product.description}</p>
        <p className="date">
          {t('common.added_on')}: {formatDate(product.createdAt)}
        </p>
      </div>
      
      <div className="product-actions">
        <button
          className="favorite-button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? t('common.remove_favorite') : t('common.add_favorite')}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          {t('menu.add_to_cart')}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
```

### Webhook Integration Example

```typescript
// webhook-handler.js
import { translationService } from './localization/TranslationService';

export async function handleTranslationWebhook(payload, source) {
  try {
    // Parse webhook payload
    const { locales } = parseWebhookPayload(payload, source);
    
    // Update translations
    for (const locale of locales) {
      await translationService.handleWebhookUpdate(locale);
    }
    
    console.log(`Updated translations for: ${locales.join(', ')}`);
    
    return { success: true, locales };
  } catch (error) {
    console.error('Webhook processing failed:', error);
    throw error;
  }
}
```

### Custom Hook Example

```tsx
// useProductTranslations.ts
import { useTranslation } from '../localization/useTranslation';

export function useProductTranslations() {
  const { t, formatCurrency } = useTranslation('product');
  
  const getProductStatus = (status: string) => {
    return t(`status.${status}`);
  };
  
  const formatProductPrice = (price: number, currency?: string) => {
    return formatCurrency(price);
  };
  
  const getProductCategory = (category: string) => {
    return t(`category.${category}`);
  };
  
  return {
    getProductStatus,
    formatProductPrice,
    getProductCategory,
    t
  };
}
```

---

**For more examples and advanced usage, see the [README.md](./README.md) and [SETUP.md](./SETUP.md) files.**
