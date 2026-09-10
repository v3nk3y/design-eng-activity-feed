import type { Transaction, TransactionSummary } from '../types/transaction'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'exceptZero',
})

export function formatAmount(amount: number) {
  return currency.format(amount)
}

/** Failure outranks direction: a failed credit never arrived, so it shouldn't read as money in. */
export function amountTone(transaction: TransactionSummary) {
  if (transaction.status === 'failed') return 'failed'
  if (transaction.amount > 0) return 'credit'
  return 'debit'
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

/** Builds the <time> value from local parts — toISOString() converts to UTC and can land on the day before. */
export function serializeFeedDate(value: string) {
  const date = parseFeedDate(value)
  if (!date) return undefined
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Sorts on initiatedAt, an ISO instant on every row, rather than the two-format date field. */
export function sortNewestFirst(transactions: Transaction[]) {
  return [...transactions].sort((a, b) => Date.parse(b.initiatedAt) - Date.parse(a.initiatedAt))
}
