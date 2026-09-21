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

  const combined = normalize(brand || '') + normalize(type || '');

  // 1. Volkswagen Passat
  if (combined.includes('volkswagen') || combined.includes('vw') || combined.includes('passat')) {
    return '/cars/06DPN873.webp';
  }

  // 2. Ford Courier
  if (combined.includes('cour') || combined.includes('tourneo')) {
    return '/cars/06AGB858.webp';
  }

  // 3. Ford Focus
  if (combined.includes('focus')) {
    return '/cars/23AGE864.webp';
  }

  // 4. Fiat Egea / Egea Cross
  if (combined.includes('fiat') || combined.includes('egea')) {
    if (combined.includes('cross')) return '/cars/23EK128.webp';
    // Otomatik dizel Egea vs Manuel Egea
    if (combined.includes('otomatik')) return '/cars/45AHM646.webp';
    return '/cars/34SK7182.webp';
  }

  // 5. Renault Clio & Fluence
  if (combined.includes('renault') || combined.includes('clio') || combined.includes('fluence')) {
    if (combined.includes('clio')) {
      if (combined.includes('otomatik')) return '/cars/07AYN738.webp';
      return '/cars/34CDU768.webp';
    }
    if (combined.includes('fluence')) return '/cars/35EP210.webp';
  }

  // 6. Opel Astra
  if (combined.includes('astra')) {
    return '/cars/23FD605.webp';
  }

  // 7. Kia Sportage
  if (combined.includes('kia') || combined.includes('sportage')) {
    return '/cars/23DT993.webp';
  }

  // 8. Toyota Corolla
  if (combined.includes('toyota') || combined.includes('corolla')) {
    return '/cars/27BEA907.webp';
  }

  // 9. Fallback to API image if provided and valid
  if (apiImagePath && apiImagePath.trim() !== '') {
    return `http://sistemjson1.trvrac.com/images/${apiImagePath}`;
  }

  // 10. Ultimate fallback
  return '/cars/06DPN873.webp'; // Passat as default fallback
}
