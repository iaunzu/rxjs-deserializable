export function toDate(date: any): Date | undefined {
  if (!date) {
    return undefined;
  }
  const result = new Date(date);
  const time = result.getTime();
  if (time !== time) {
    // isNaN(time) === true => Invalid date
    throw new TypeError(`${date} is not a valid Date.`);
  }
  return result;
}
