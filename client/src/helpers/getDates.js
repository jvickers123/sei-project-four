
export const getDateArray = () => {
  const dateArray = []
  for (let i = 1; i <= 31; i++) {
    dateArray.push(i.toString())
  }
  return dateArray
}

export const getYearsArray = () => {
  const yearsArray = []
  for (let i = 1920; i <= 2022; i++) {
    yearsArray.push(i.toString())
  }
  return yearsArray
}