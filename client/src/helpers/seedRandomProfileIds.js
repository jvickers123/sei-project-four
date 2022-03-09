export const seedRandomProfileIds = () => {
  const randomProfileIds = []

  const getRandomId = () => {
    const randomId = Math.floor(Math.random() * 12) + 4
    if (randomProfileIds.includes(randomId)) {
      getRandomId()
    } else {
      randomProfileIds.push(randomId)
    }
  }

  for (let i = 0; i < 6; i++) {
    getRandomId()
  }

  // const withoutUndefined

  return randomProfileIds
}