import { BrandSettings } from '../types';

export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  logoUrl: null,
  brandNameAr: 'بنده',
  brandNameEn: 'Panda',
  brandTitleAr: 'بنده معك تفرق',
  brandTitleEn: 'Panda Makes the Difference',
  brandSubtitleAr: 'عالم من المزايا',
  brandSubtitleEn: 'A World of Benefits',
  colorPaletteId: 'emerald_mint',
};

const STORAGE_KEY = 'panda_brand_settings';
const LEGACY_LOGO_KEY = 'panda_custom_logo';

export function getStoredBrandSettings(): BrandSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_BRAND_SETTINGS, ...parsed };
    }
    // Check legacy logo key if brand settings not yet initialized
    const legacyLogo = localStorage.getItem(LEGACY_LOGO_KEY);
    if (legacyLogo) {
      return { ...DEFAULT_BRAND_SETTINGS, logoUrl: legacyLogo };
    }
  } catch (e) {
    console.error('Failed to load brand settings from localStorage:', e);
  }
  return DEFAULT_BRAND_SETTINGS;
}

export function saveStoredBrandSettings(settings: BrandSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    if (settings.logoUrl) {
      localStorage.setItem(LEGACY_LOGO_KEY, settings.logoUrl);
    } else {
      localStorage.removeItem(LEGACY_LOGO_KEY);
    }
  } catch (e) {
    console.error('Failed to save brand settings to localStorage:', e);
  }
}
