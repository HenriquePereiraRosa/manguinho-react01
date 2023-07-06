export const isEmpty = (value): boolean => {
  return value === null ||
        value === undefined ||
        value.trim() === ''
}
