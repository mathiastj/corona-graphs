export const setDifference = (a, b) => new Set([...a].filter((x) => !b.has(x)))
