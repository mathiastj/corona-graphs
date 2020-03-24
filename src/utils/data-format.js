export const formatStringToNumberOrNull = (strigWithNumber) => {
  return Number(strigWithNumber) === 0 ? null : Number(strigWithNumber)
}