const numerals: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export function toRoman(n: number): string {
  let out = ''
  let rest = n
  for (const [value, symbol] of numerals) {
    while (rest >= value) {
      out += symbol
      rest -= value
    }
  }
  return out
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
