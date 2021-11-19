export const applyCountryCapitalizations =
  text =>
  (capitalizations = []) =>
    capitalizations.reduce(
      (prev, current) => prev.replaceAll(current.keyword, current.as),
      text,
    );

export const applyPeruCapitalizations = text =>
  applyCountryCapitalizations(text)([
    { keyword: 'presidente', as: 'Presidente' },
    { keyword: 'el peruano', as: 'El Peruano' },
  ]);
