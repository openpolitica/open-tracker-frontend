export const capitalizeNames = string =>
  string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, word =>
      word.replace(/^\w/, firstLetter => firstLetter.toUpperCase()),
    );
