import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';
import { sortNewestFirst } from '../../utils/transactions';
import { TransactionRow } from './TransactionRow';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  const sorted = sortNewestFirst(transactions);

  return (
    <div className='activity-feed'>
      <h2>Activity</h2>

      {transactions.length === 0 ? (
        <p className='activity-feed__empty'>No transactions yet.</p>
      ) : (
        <ul className='activity-feed__list'>
          {sorted.map((transaction) => (
            <li key={transaction.id}>
              <TransactionRow transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
