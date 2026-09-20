export interface ColorPalette {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  bgLight: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  gradientPrimary: string;
  previewHexes: [string, string, string];
}

export const OPEN_COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'emerald_mint',
    nameAr: 'أخضر زمردي ونعناع منعش',
    nameEn: 'Fresh Emerald & Mint',
    descAr: 'هادئ، نقي، ومريح للعين يعكس الطبيعة والوفرة',
    descEn: 'Natural, fresh, and soothing store atmosphere',
    primary: '#005A2B',
    primaryHover: '#004420',
    secondary: '#E34F26',
    accent: '#10B981',
    bgLight: '#F2FAF5',
    cardBorder: '#D1FAE5',
    badgeBg: '#DCFCE7',
    badgeText: '#065F46',
    gradientPrimary: 'from-emerald-700 via-emerald-600 to-teal-700',
    previewHexes: ['#005A2B', '#10B981', '#F2FAF5']
  },
  {
    id: 'sky_azure',
    nameAr: 'سماوي ناصع وأزرق مفتوح',
    nameEn: 'Crisp Azure & Sky Blue',
    descAr: 'مشرق، واسع، يعزز الثقة والوضوح التام',
    descEn: 'Bright, airy, and high-clarity openness',
    primary: '#0284C7',
    primaryHover: '#0369A1',
    secondary: '#F59E0B',
    accent: '#38BDF8',
    bgLight: '#F0F9FF',
    cardBorder: '#BAE6FD',
    badgeBg: '#E0F2FE',
    badgeText: '#075985',
    gradientPrimary: 'from-sky-600 via-blue-600 to-indigo-600',
    previewHexes: ['#0284C7', '#38BDF8', '#F0F9FF']
  },
  {
    id: 'peach_sunset',
    nameAr: 'خوخي ومرجان دافئ مشرق',
    nameEn: 'Warm Peach & Coral Sunset',
    descAr: 'حيوي، ترحيبي، دافئ يمنح شعوراً بالحيوية والمخبوزات الطازجة',
    descEn: 'Vibrant, warm, and inviting bakery & market glow',
    primary: '#EA580C',
    primaryHover: '#C2410C',
    secondary: '#0D9488',
    accent: '#FB923C',
    bgLight: '#FFF7ED',
    cardBorder: '#FED7AA',
    badgeBg: '#FFEDD5',
    badgeText: '#9A3412',
    gradientPrimary: 'from-orange-600 via-amber-600 to-rose-600',
    previewHexes: ['#EA580C', '#FB923C', '#FFF7ED']
  },
  {
    id: 'royal_lavender',
    nameAr: 'لافندر وبنفسج هادئ راقي',
    nameEn: 'Royal Lavender & Iris',
    descAr: 'فاخر، مريح، ذو لمسة عصرية راقية ومميزة',
    descEn: 'Sophisticated, peaceful, and premium pastel flair',
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    secondary: '#EC4899',
    accent: '#A78BFA',
    bgLight: '#FAF5FF',
    cardBorder: '#DDD6FE',
    badgeBg: '#F3E8FF',
    badgeText: '#5B21B6',
    gradientPrimary: 'from-purple-600 via-indigo-600 to-violet-700',
    previewHexes: ['#7C3AED', '#A78BFA', '#FAF5FF']
  },
  {
    id: 'golden_amber',
    nameAr: 'كهرمان وعسل شروق مضيء',
    nameEn: 'Golden Amber & Honey Sun',
    descAr: 'مبهج، احتفالي، يرفع الحماس ومعدلات الشراء',
    descEn: 'Luminous, optimistic, and celebratory harvest',
    primary: '#D97706',
    primaryHover: '#B45309',
    secondary: '#059669',
    accent: '#FBBF24',
    bgLight: '#FFFBEB',
    cardBorder: '#FDE68A',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    gradientPrimary: 'from-amber-600 via-yellow-600 to-orange-600',
    previewHexes: ['#D97706', '#FBBF24', '#FFFBEB']
  },
  {
    id: 'teal_ocean',
    nameAr: 'فيروزي وأكوا استوائي نقي',
    nameEn: 'Aqua Turquoise & Tropical Teal',
    descAr: 'انتعاش مائي فائق، يعكس النظافة والتسوق السلس',
    descEn: 'Ultra clean, refreshing, and crisp water tone',
    primary: '#0D9488',
    primaryHover: '#0F766E',
    secondary: '#F97316',
    accent: '#2DD4BF',
    bgLight: '#F0FDFA',
    cardBorder: '#99F6E4',
    badgeBg: '#CCFBF1',
    badgeText: '#115E59',
    gradientPrimary: 'from-teal-600 via-emerald-600 to-cyan-600',
    previewHexes: ['#0D9488', '#2DD4BF', '#F0FDFA']
  },
  {
    id: 'rose_blush',
    nameAr: 'زهري لطيف ووردي ناعم',
    nameEn: 'Gentle Rose & Soft Blush',
    descAr: 'ودود، أنيق، محبب ومريح للمتسوقين والعائلات',
    descEn: 'Delicate, friendly, and elegant family warmth',
    primary: '#E11D48',
    primaryHover: '#BE123C',
    secondary: '#6366F1',
    accent: '#FB7185',
    bgLight: '#FFF1F2',
    cardBorder: '#FECDD3',
    badgeBg: '#FFE4E6',
    badgeText: '#9F1239',
    gradientPrimary: 'from-rose-600 via-pink-600 to-red-600',
    previewHexes: ['#E11D48', '#FB7185', '#FFF1F2']
  },
  {
    id: 'modern_pearl',
    nameAr: 'لؤلؤي حيادي مينيمال مودرن',
    nameEn: 'Modern Minimal Pearl & Slate',
    descAr: 'تصميم عالمي فائق البساطة بدرجات أردوازية هادئة',
    descEn: 'Ultra-modern, clean monochrome with slate highlights',
    primary: '#0F172A',
    primaryHover: '#1E293B',
    secondary: '#3B82F6',
    accent: '#64748B',
    bgLight: '#F8FAFC',
    cardBorder: '#E2E8F0',
    badgeBg: '#F1F5F9',
    badgeText: '#334155',
    gradientPrimary: 'from-slate-900 via-slate-800 to-zinc-900',
    previewHexes: ['#0F172A', '#64748B', '#F8FAFC']
  }
];

export function getPaletteById(id?: string): ColorPalette {
  const found = OPEN_COLOR_PALETTES.find(p => p.id === id);
  return found || OPEN_COLOR_PALETTES[0];
}
