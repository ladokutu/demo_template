// Design tokens as JS — mirrors CSS variables for inline styles
export const t = {
  blue:      '#1B6EF3',
  blueDark:  '#1458CC',
  blueLight: '#EEF4FF',
  blueMid:   '#DBEAFE',
  ink:       '#0F1728',
  ink2:      '#334155',
  ink3:      '#64748B',
  ink4:      '#94A3B8',
  line:      '#E2E8F0',
  bg:        '#FFFFFF',
  bg2:       '#F8FAFC',
  bg3:       '#F1F5F9',
  accent:    '#F97316',
  green:     '#10B981',
  radius:    12,
  shadowSm:  '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  shadowMd:  '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
  shadowLg:  '0 20px 50px rgba(27,110,243,0.12), 0 8px 20px rgba(0,0,0,0.06)',
};

export const fadeUp   = { animation: 'fadeUp 0.55s ease forwards' };
export const fadeUpD  = (d) => ({ animation: `fadeUp 0.55s ease ${d}s forwards` });
export const hidden   = { opacity: 0, transform: 'translateY(28px)' };
export const fadeIn   = { animation: 'fadeIn 0.5s ease forwards' };
