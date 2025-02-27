export function isValidHexColor(value: string) {
  const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
  const isHexColor = hexColorRegex.test(value);
  return isHexColor;
}
