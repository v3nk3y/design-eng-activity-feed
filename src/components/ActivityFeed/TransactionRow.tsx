import './TransactionRow.css'
import type { TransactionSummary } from '../../types/transaction'
import { formatAmount, formatFeedDate, serializeFeedDate } from '../../utils/transactions'

type TransactionRowProps = {
  transaction: TransactionSummary
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const dateText = formatFeedDate(transaction.date)
  const dateTime = serializeFeedDate(transaction.date)

  return (
    <button
      type='button'
      className='transaction-row'
      onClick={() => alert(`Transaction: ${transaction.id}`)}
    >
      <span className='transaction-row__main'>
        <span className='transaction-row__merchant'>{transaction.merchant}</span>
        <span className='transaction-row__meta'>
          {transaction.category && <span className='transaction-row__category'>{transaction.category}</span>}
          {dateTime ? <time dateTime={dateTime}>{dateText}</time> : <span>{dateText}</span>}
        </span>
      </span>

      <span className='transaction-row__aside'>
        <span className='transaction-row__amount'>{formatAmount(transaction.amount)}</span>
        {transaction.status === 'pending' && <span className='transaction-row__status'>pending</span>}
      </span>
    </button>
  )
}
