export const generatePaginationArray = (current: number, max: number) => {
  if (max <= 7) return Array.from({ length: max }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "...", max];
  if (current >= max - 3)
    return [1, "...", max - 4, max - 3, max - 2, max - 1, max];

  return [1, "...", current - 1, current, current + 1, "...", max];
};