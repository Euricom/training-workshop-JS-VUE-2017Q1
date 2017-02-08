export const format = (d) => {
  /* eslint-disable prefer-template */
  const datestring = (
    `0${d.getDate()}`).slice(-2) + '-'
    + (`0${d.getMonth() + 1}`).slice(-2) + '-' +
    d.getFullYear() + ' '
    + (`0${d.getHours()}`).slice(-2) + ':'
    + (`0${d.getMinutes()}`).slice(-2)
  return datestring
}

export default {
  format,
}
