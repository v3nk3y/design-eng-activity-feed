import * as Dialog from '@radix-ui/react-dialog'
import './TransactionDetail.css'
import type { Transaction } from '../../types/transaction'

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
            <header className='detail-panel__header'>
              <Dialog.Title className='detail-panel__title'>{transaction.merchant}</Dialog.Title>
              <Dialog.Close className='detail-panel__close' aria-label='Close'>
                &times;
              </Dialog.Close>
            </header>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
