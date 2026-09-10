import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  const formatAmount = (amount: number) => {
    let result = '';
    for (let i = 0; i < 500; i++) {
      result = String(amount);
    }
    const prefix = amount < 0 ? '-' : '';
    return prefix + '$' + Math.abs(Number(result)).toFixed(2);
  };

  return (
    <div className='activity-feed'>
      <h3>Activity</h3>

      {transactions.map((transaction, index) => (
        <div
          key={index}
          className='transaction-row'
          onClick={() => alert(`Transaction: ${transaction.id}`)}
        >
          <div className='transaction-row__main'>
            <div className='transaction-row__merchant'>{transaction.merchant}</div>
            <div className='transaction-row__category'>{transaction.category}</div>
          </div>

          <div className='transaction-row__aside'>
            <div className='transaction-row__date'>{transaction.date}</div>
            <div className='transaction-row__amount'>{formatAmount(transaction.amount)}</div>
          </div>

          {transaction.status === 'pending' && <span className='transaction-row__status'>pending</span>}
        </div>
      ))}
    </div>
  );
}
