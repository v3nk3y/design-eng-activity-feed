const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'exceptZero',
})

export function formatAmount(amount: number) {
  return currency.format(amount)
}

/** Date-only ISO strings are read as UTC by new Date(), a day early here. Build those locally. */
function parseFeedDate(value: string): Date | undefined {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const shortDateWithYear = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function formatFeedDate(value: string) {
  const date = parseFeedDate(value)
  if (!date) return value
  const formatter = date.getFullYear() === new Date().getFullYear() ? shortDate : shortDateWithYear
  return formatter.format(date)
}
