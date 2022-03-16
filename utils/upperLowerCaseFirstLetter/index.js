export const upperCaseFirstLetter = text =>
  text ? `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}` : '';

export const lowerCaseFirstLetter = text =>
  text ? `${text[0].toLowerCase()}${text.slice(1)}` : '';
