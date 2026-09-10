export type TransactionStatus = 'posted' | 'pending' | 'failed'

export type TransactionType =
  | 'payment'
  | 'transfer'
  | 'deposit'
  | 'withdrawal'
  | 'fee'
  | 'refund'

export type PaymentMethod =
  | 'ach'
  | 'wire'
  | 'card'
  | 'internal_transfer'
  | 'check'

export type AccountType = 'checking' | 'savings' | 'external'

export interface TransactionAccount {
  id: string
  name: string
  lastFour: string
  type: AccountType
}

/** Fields shown in the activity feed summary. */
export interface TransactionSummary {
  id: string
  merchant: string
  category?: string
  date: string
  amount: number
  status: TransactionStatus
}

/** Additional fields for a transaction detail view — not surfaced in the feed. */
export interface TransactionDetails {
  type: TransactionType
  description: string
  sourceAccount: TransactionAccount
  destinationAccount: TransactionAccount
  paymentMethod: PaymentMethod
  referenceNumber: string
  initiatedAt: string
  postedAt?: string
  failureReason?: string
  memo?: string
}

export interface Transaction extends TransactionSummary, TransactionDetails {}
