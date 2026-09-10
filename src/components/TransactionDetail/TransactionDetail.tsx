import * as Dialog from '@radix-ui/react-dialog'
import './TransactionDetail.css'
import type { Transaction } from '../../types/transaction'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import {
  amountTone,
  formatAmount,
  formatPaymentMethod,
  formatTimestamp,
  maskAccount,
} from '../../utils/transactions'

type TransactionDetailProps = {
  transaction: Transaction | undefined
  onClose: () => void
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Dialog.Root open={transaction !== undefined} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='detail-overlay' />

        <Dialog.Content className='detail-panel'>
          {transaction && (
            <>
              <header className='detail-panel__header'>
                <Dialog.Title className='detail-panel__title'>{transaction.merchant}</Dialog.Title>
                <Dialog.Close className='detail-panel__close' aria-label='Close'>
                  &times;
                </Dialog.Close>
              </header>

              <div className='detail-panel__body'>
                {transaction.failureReason && (
                  <p className='detail-panel__failure'>{transaction.failureReason}</p>
                )}

                <div className='detail-panel__hero'>
                  <p className={`detail-panel__amount detail-panel__amount--${amountTone(transaction)}`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  {transaction.status !== 'posted' && <StatusBadge status={transaction.status} />}
                </div>

                <Dialog.Description className='detail-panel__description'>
                  {transaction.description}
                </Dialog.Description>

                <dl className='detail-panel__facts'>
                  <dt>Type</dt>
                  <dd className='detail-panel__type'>{transaction.type}</dd>

                  <dt>Method</dt>
                  <dd>{formatPaymentMethod(transaction.paymentMethod)}</dd>

                  <dt>From</dt>
                  <dd>{maskAccount(transaction.sourceAccount)}</dd>

                  <dt>To</dt>
                  <dd>{maskAccount(transaction.destinationAccount)}</dd>

                  <dt>Reference</dt>
                  <dd>{transaction.referenceNumber}</dd>

                  <dt>Initiated</dt>
                  <dd>{formatTimestamp(transaction.initiatedAt)}</dd>

                  {transaction.postedAt && (
                    <>
                      <dt>Posted</dt>
                      <dd>{formatTimestamp(transaction.postedAt)}</dd>
                    </>
                  )}

                  {transaction.memo && (
                    <>
                      <dt>Memo</dt>
                      <dd>{transaction.memo}</dd>
                    </>
                  )}
                </dl>
              </div>

              <footer className='detail-panel__footer'>
                {transaction.status !== 'posted' && (
                  <p className='detail-panel__eligibility' id='dispute-eligibility'>
                    Only posted transactions can be disputed.
                  </p>
                )}

                <div className='detail-panel__actions'>
                  <button
                    type='button'
                    className='detail-panel__dispute'
                    disabled={transaction.status !== 'posted'}
                    aria-describedby={transaction.status === 'posted' ? undefined : 'dispute-eligibility'}
                  >
                    Dispute transaction
                  </button>

                  <Dialog.Close className='detail-panel__dismiss'>Close</Dialog.Close>
                </div>
              </footer>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
