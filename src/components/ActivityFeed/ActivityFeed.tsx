import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';
import { formatAmount, formatFeedDate, sortNewestFirst } from '../../utils/transactions';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  const sorted = sortNewestFirst(transactions);

  return (
    <div className='activity-feed'>
      <h2>Activity</h2>

      <ul className='activity-feed__list'>
        {sorted.map((transaction) => (
          <li key={transaction.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
