/**
 * Language Switcher Component for Webflow
 * Handles language switching UI and interactions
 */

class LanguageSwitcher {
  constructor(options = {}) {
    this.config = {
      container: '.language-switcher',
      trigger: '.language-trigger',
      dropdown: '.language-dropdown',
      option: '.language-option',
      showFlags: true,
      showNativeNames: true,
      showEnglishNames: true,
      position: 'bottom-right',
      animation: 'fade',
      ...options
    };

    this.isOpen = false;
    this.currentLocale = 'en';
    this.supportedLocales = [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', region: 'Global' },
      { code: 'en-US', name: 'English (US)', nativeName: 'English (United States)', flag: '🇺🇸', region: 'United States' },
      { code: 'en-GB', name: 'English (UK)', nativeName: 'English (United Kingdom)', flag: '🇬🇧', region: 'United Kingdom' },
      { code: 'en-AU', name: 'English (AU)', nativeName: 'English (Australia)', flag: '🇦🇺', region: 'Australia' },
      { code: 'en-CA', name: 'English (CA)', nativeName: 'English (Canada)', flag: '🇨🇦', region: 'Canada' },
      { code: 'en-NL', name: 'English (NL)', nativeName: 'English (Netherlands)', flag: '🇳🇱', region: 'Netherlands' },
      { code: 'en-MX', name: 'English (MX)', nativeName: 'English (Mexico)', flag: '🇲🇽', region: 'Mexico' },
      { code: 'en-NORDICS', name: 'English (Nordics)', nativeName: 'English (Nordics)', flag: '🏔️', region: 'Nordics' },
      { code: 'en-ME', name: 'English (ME)', nativeName: 'English (Middle East)', flag: '🏜️', region: 'Middle East' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Global' },
      { code: 'ar-ME', name: 'Arabic (ME)', nativeName: 'العربية (الشرق الأوسط)', flag: '🏜️', region: 'Middle East' },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🌐', region: 'Global' },
      { code: 'es-ES', name: 'Spanish (ES)', nativeName: 'Español (España)', flag: '🇪🇸', region: 'Spain' },
      { code: 'es-US', name: 'Spanish (US)', nativeName: 'Español (Estados Unidos)', flag: '🇺🇸', region: 'United States' },
      { code: 'es-MX', name: 'Spanish (MX)', nativeName: 'Español (México)', flag: '🇲🇽', region: 'Mexico' },
      { code: 'es-LATAM', name: 'Spanish (LATAM)', nativeName: 'Español (Latinoamérica)', flag: '🌎', region: 'LATAM' },
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🌐', region: 'Global' },
      { code: 'fr-FR', name: 'French (FR)', nativeName: 'Français (France)', flag: '🇫🇷', region: 'France' },
      { code: 'fr-CA', name: 'French (CA)', nativeName: 'Français (Canada)', flag: '🇨🇦', region: 'Canada' },
      { code: 'fr-BE', name: 'French (BE)', nativeName: 'Français (Belgique)', flag: '🇧🇪', region: 'Belgium' },
      { code: 'fr-CH', name: 'French (CH)', nativeName: 'Français (Suisse)', flag: '🇨🇭', region: 'Switzerland' },
      { code: 'de-DE', name: 'German (DE)', nativeName: 'Deutsch (Deutschland)', flag: '🇩🇪', region: 'Germany' },
      { code: 'it-IT', name: 'Italian (IT)', nativeName: 'Italiano (Italia)', flag: '🇮🇹', region: 'Italy' },
      { code: 'pt-PT', name: 'Portuguese (PT)', nativeName: 'Português (Portugal)', flag: '🇵🇹', region: 'Portugal' },
      { code: 'nl-NL', name: 'Dutch (NL)', nativeName: 'Nederlands (Nederland)', flag: '🇳🇱', region: 'Netherlands' },
      { code: 'nl-BE', name: 'Dutch (BE)', nativeName: 'Nederlands (België)', flag: '🇧🇪', region: 'Belgium' },
      { code: 'sv-SE', name: 'Swedish (SE)', nativeName: 'Svenska (Sverige)', flag: '🇸🇪', region: 'Sweden' }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCurrentLocale();
    this.render();
  }

  setupEventListeners() {
    // Handle select-based language switcher
    const selectElement = document.querySelector(`${this.config.container} select`);
    if (selectElement) {
      selectElement.addEventListener('change', (e) => {
        this.handleLanguageChange(e.target.value);
      });
    }

    // Handle button-based language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const locale = btn.dataset.locale;
        if (locale) {
          this.handleLanguageChange(locale);
        }
      });
    });

    // Handle dropdown language switcher
    const trigger = document.querySelector(this.config.trigger);
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown();
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest(this.config.container)) {
        this.closeDropdown();
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDropdown();
      }
    });
  }

  handleLanguageChange(locale) {
    if (locale === this.currentLocale) return;

    this.currentLocale = locale;
    this.updateCurrentLocale();

    // Trigger language change event
    const event = new CustomEvent('languageChange', {
      detail: { locale, oldLocale: this.currentLocale }
    });
    document.dispatchEvent(event);

    // Call global localization system if available
    if (window.grubtechLocalization) {
      window.grubtechLocalization.setLocale(locale);
    }

    this.closeDropdown();
  }

  updateCurrentLocale() {
    // Update select element
    const selectElement = document.querySelector(`${this.config.container} select`);
    if (selectElement) {
      selectElement.value = this.currentLocale;
    }

    // Update trigger button
    const trigger = document.querySelector(this.config.trigger);
    if (trigger) {
      const currentLocale = this.supportedLocales.find(loc => loc.code === this.currentLocale);
      if (currentLocale) {
        const flag = this.config.showFlags ? currentLocale.flag : '';
        const name = this.config.showNativeNames ? currentLocale.nativeName : currentLocale.name;
        trigger.innerHTML = `${flag} ${name}`;
      }
    }

    // Update active state for buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.locale === this.currentLocale);
    });
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    const dropdown = document.querySelector(this.config.dropdown);
    if (dropdown) {
      dropdown.classList.add('open');
      this.isOpen = true;
    }
  }

  closeDropdown() {
    const dropdown = document.querySelector(this.config.dropdown);
    if (dropdown) {
      dropdown.classList.remove('open');
      this.isOpen = false;
    }
  }

  render() {
    // Render select-based switcher
    this.renderSelectSwitcher();

    // Render dropdown-based switcher
    this.renderDropdownSwitcher();

    // Render button-based switcher
    this.renderButtonSwitcher();
  }

  renderSelectSwitcher() {
    const selectContainer = document.querySelector(`${this.config.container}.select`);
    if (!selectContainer) return;

    let selectHTML = '<select class="language-select">';
    this.supportedLocales.forEach(locale => {
      const flag = this.config.showFlags ? locale.flag : '';
      const name = this.config.showNativeNames ? locale.nativeName : locale.name;
      const selected = locale.code === this.currentLocale ? 'selected' : '';
      selectHTML += `<option value="${locale.code}" ${selected}>${flag} ${name}</option>`;
    });
    selectHTML += '</select>';

    selectContainer.innerHTML = selectHTML;

    // Add event listener
    const select = selectContainer.querySelector('select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.handleLanguageChange(e.target.value);
      });
    }
  }

  renderDropdownSwitcher() {
    const dropdownContainer = document.querySelector(`${this.config.container}.dropdown`);
    if (!dropdownContainer) return;

    const currentLocale = this.supportedLocales.find(loc => loc.code === this.currentLocale);
    if (!currentLocale) return;

    const flag = this.config.showFlags ? currentLocale.flag : '';
    const name = this.config.showNativeNames ? currentLocale.nativeName : currentLocale.name;

    dropdownContainer.innerHTML = `
      <button class="language-trigger" aria-label="Select language">
        <span class="language-flag">${flag}</span>
        <span class="language-name">${name}</span>
        <span class="language-arrow">▼</span>
      </button>
      <div class="language-dropdown">
        ${this.supportedLocales.map(locale => {
          const isActive = locale.code === this.currentLocale ? 'active' : '';
          const flag = this.config.showFlags ? locale.flag : '';
          const name = this.config.showNativeNames ? locale.nativeName : locale.name;
          const englishName = this.config.showEnglishNames ? ` (${locale.name})` : '';
          
          return `
            <button class="language-option ${isActive}" data-locale="${locale.code}">
              <span class="language-flag">${flag}</span>
              <span class="language-name">${name}${englishName}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    // Add event listeners
    const trigger = dropdownContainer.querySelector('.language-trigger');
    const options = dropdownContainer.querySelectorAll('.language-option');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown();
      });
    }

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const locale = option.dataset.locale;
        if (locale) {
          this.handleLanguageChange(locale);
        }
      });
    });
  }

  renderButtonSwitcher() {
    const buttonContainer = document.querySelector(`${this.config.container}.buttons`);
    if (!buttonContainer) return;

    buttonContainer.innerHTML = this.supportedLocales.map(locale => {
      const isActive = locale.code === this.currentLocale ? 'active' : '';
      const flag = this.config.showFlags ? locale.flag : '';
      const name = this.config.showNativeNames ? locale.nativeName : locale.name;
      
      return `
        <button class="lang-btn ${isActive}" data-locale="${locale.code}" title="${locale.name}">
          <span class="language-flag">${flag}</span>
          <span class="language-name">${name}</span>
        </button>
      `;
    }).join('');

    // Add event listeners
    const buttons = buttonContainer.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const locale = btn.dataset.locale;
        if (locale) {
          this.handleLanguageChange(locale);
        }
      });
    });
  }

  // Public methods
  setLocale(locale) {
    this.handleLanguageChange(locale);
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  getSupportedLocales() {
    return this.supportedLocales;
  }
}

// Export for use in other scripts
window.LanguageSwitcher = LanguageSwitcher;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
  });
} else {
  window.languageSwitcher = new LanguageSwitcher();
}
