export const getSelectOptions = <
  T extends { name: string; id: string | number }
>(
  options: T[] | undefined
): { label: string; value: string | number }[] => {
  if (!options) return [];

  return options.map((option) => ({
    label: option.name,
    value: option.id,
  }));
};
