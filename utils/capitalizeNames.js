export const capitalizeNames = (
  string = '',
  { exclude = ['al', 'de', 'en', 'el', 'la', 'del', 'los'] } = {},
) => {
  const excludeRegex = new RegExp('^(?!(' + exclude.join('|') + ')\\b)\\w');
  return string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (word, idx) =>
      idx === 0
        ? word.replace(/^\w/, firstLetter => firstLetter.toUpperCase())
        : word.replace(excludeRegex, firstLetter => firstLetter.toUpperCase()),
    );
};
