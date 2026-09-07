export function getCarImage(brand: string, type: string, apiImagePath?: string): string {
  // Normalize strings completely to avoid Turkish character bugs (e.g. FİAT -> fiat)
  const normalize = (str: string) => {
    return str
      .toLocaleLowerCase('tr-TR')
      .replace(/i̇/g, 'i') // fix node.js specific dot-above-i issue
      .replace(/ı/g, 'i')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, ''); // remove spaces and dashes
  };

  const b = normalize(brand || '');
  const t = normalize(type || '');

  // 1. Volkswagen Passat
  if (b.includes('volkswagen') || b.includes('vw')) {
    if (t.includes('passat')) return '/cars/06DPN873.webp';
  }

  // 2. Ford Courier
  if (b.includes('ford') && (t.includes('cour') || t.includes('tourneo'))) {
    return '/cars/06AGB858.webp';
  }

  // 3. Ford Focus
  if (b.includes('ford') && t.includes('focus')) {
    return '/cars/23AGE864.webp';
  }

  // 4. Fiat Egea / Egea Cross
  if (b.includes('fiat')) {
    if (t.includes('cross')) return '/cars/23EK128.webp';
    // Otomatik dizel Egea vs Manuel Egea
    if (t.includes('otomatik')) return '/cars/45AHM646.webp';
    return '/cars/34SK7182.webp';
  }

  // 5. Renault Clio & Fluence
  if (b.includes('renault')) {
    if (t.includes('clio')) {
      if (t.includes('otomatik')) return '/cars/07AYN738.webp';
      return '/cars/34CDU768.webp';
    }
    if (t.includes('fluence')) return '/cars/35EP210.webp';
  }

  // 6. Opel Astra
  if (b.includes('opel') && t.includes('astra')) {
    return '/cars/23FD605.webp';
  }

  // 7. Kia Sportage
  if (b.includes('kia')) {
    if (t.includes('sportage')) return '/cars/23DT993.webp';
  }

  // 8. Toyota Corolla
  if (b.includes('toyota') && t.includes('corolla')) {
    return '/cars/27BEA907.webp';
  }

  // 9. Fallback to API image if provided and valid
  if (apiImagePath && apiImagePath.trim() !== '') {
    return `http://sistemjson1.trvrac.com/images/${apiImagePath}`;
  }

  // 10. Ultimate fallback
  return '/cars/06DPN873.webp'; // Passat as default fallback
}
