//format date from 2024-8-1 to 2024-08-01
function formatDate(year, month, day) {
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export default formatDate