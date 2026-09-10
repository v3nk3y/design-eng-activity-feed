import './TransactionRow.css'
import type { TransactionSummary } from '../../types/transaction'
import { formatAmount, formatFeedDate } from '../../utils/transactions'

type TransactionRowProps = {
  transaction: TransactionSummary
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <button
      type='button'
      className='transaction-row'
      onClick={() => alert(`Transaction: ${transaction.id}`)}
    >
      <span className='transaction-row__main'>
        <span className='transaction-row__merchant'>{transaction.merchant}</span>
        <span className='transaction-row__category'>{transaction.category}</span>
      </span>

      <span className='transaction-row__aside'>
        <span className='transaction-row__date'>{formatFeedDate(transaction.date)}</span>
        <span className='transaction-row__amount'>{formatAmount(transaction.amount)}</span>
      </span>

      {transaction.status === 'pending' && <span className='transaction-row__status'>pending</span>}
    </button>
  )
}
