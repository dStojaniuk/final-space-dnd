export const reorder = <CharacterT>(
  list: CharacterT[],
  startIndex: number,
  endIndex: number
): CharacterT[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
