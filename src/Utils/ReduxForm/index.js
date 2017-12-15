// @flow

export function convertStringToNumber(value: ?string, name: string) {
  if (!value) {
    return
  }

  return parseInt(value, 10)
}
