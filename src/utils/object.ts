export const isEmptyObject = (obj: Record<string, unknown>) =>
  Object.values(obj).every((x) => x === null || x === "");
