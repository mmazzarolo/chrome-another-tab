export const compareIndexes = (
  a: { index?: number },
  b: { index?: number }
) => {
  let comparison = 0;
  const indexA = a.index || 0;
  const indexB = b.index || 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
};
