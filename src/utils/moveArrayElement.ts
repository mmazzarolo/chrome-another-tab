export const moveArrayElement = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
) => {
  if (fromIndex === toIndex) {
    return array;
  }

  const newArray = [...array];

  const target = newArray[fromIndex];
  const inc = toIndex < fromIndex ? -1 : 1;

  for (let i = fromIndex; i !== toIndex; i += inc) {
    newArray[i] = newArray[i + inc];
  }

  newArray[toIndex] = target;

  return newArray;
};
