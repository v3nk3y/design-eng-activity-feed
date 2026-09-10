import { useMemo, useState } from 'react';
import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';
import { sortNewestFirst } from '../../utils/transactions';
import { TransactionDetail } from '../TransactionDetail/TransactionDetail';
import { TransactionRow } from './TransactionRow';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const sorted = useMemo(() => sortNewestFirst(transactions), [transactions]);
  const selected = transactions.find((transaction) => transaction.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  return (
    <div className='activity-feed'>
      <h2>Activity</h2>

      {transactions.length === 0 ? (
        <p className='activity-feed__empty'>No transactions yet.</p>
      ) : (
        <ul className='activity-feed__list'>
          {sorted.map((transaction) => (
            <li key={transaction.id}>
              <TransactionRow transaction={transaction} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      )}

      <TransactionDetail
        transaction={selected}
        open={detailOpen && selected !== undefined}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
