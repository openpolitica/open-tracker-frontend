export const groupByKey = (items, key) =>
  items.reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item[key]]: (accumulator[item[key]] || []).concat(item),
    }),
    {},
  );
