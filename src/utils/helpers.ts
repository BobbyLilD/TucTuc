export const isSafari = () =>
  navigator.userAgent.toLowerCase().indexOf('safari/') !== -1 &&
  navigator.userAgent.toLowerCase().indexOf('chrome/') === -1;

export const makeDate = () => {
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return formatter.format(new Date());
}

export const getDate = (date: Date): string => {
  return ('0' + date.getDate()).slice(-2) +
  '.' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '.' +
  date.getFullYear();
}