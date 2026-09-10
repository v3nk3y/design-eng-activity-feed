import './TransactionRow.css'
import type { TransactionSummary } from '../../types/transaction'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import { amountTone, formatAmount, formatFeedDate, serializeFeedDate } from '../../utils/transactions'

type TransactionRowProps = {
  transaction: TransactionSummary
  onSelect: (id: string) => void
}

export function TransactionRow({ transaction, onSelect }: TransactionRowProps) {
  const dateText = formatFeedDate(transaction.date)
  const dateTime = serializeFeedDate(transaction.date)

  return (
    <button
      type='button'
      className='transaction-row'
      aria-haspopup='dialog'
      onClick={() => onSelect(transaction.id)}
    >
      <span className='transaction-row__main'>
        <span className='transaction-row__merchant'>{transaction.merchant}</span>
        <span className='transaction-row__meta'>
          {transaction.category && <span className='transaction-row__category'>{transaction.category}</span>}
          {dateTime ? <time dateTime={dateTime}>{dateText}</time> : <span>{dateText}</span>}
        </span>
      </span>

      <span className='transaction-row__aside'>
        <span className={`transaction-row__amount transaction-row__amount--${amountTone(transaction)}`}>
          {formatAmount(transaction.amount)}
        </span>
        {transaction.status !== 'posted' && <StatusBadge status={transaction.status} />}
      </span>
    </button>
  )
}
