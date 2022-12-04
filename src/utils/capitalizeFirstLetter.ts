export function capitalizeFirstLetter(word: string) {
  if (word) {
    const firstLetter = word[0].toUpperCase()
    return firstLetter + word.slice(1)
  }

  return ""
}
