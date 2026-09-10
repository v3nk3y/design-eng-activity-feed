import './DevStateToolbar.css'

export type FeedState = 'default' | 'empty' | 'loading' | 'error' | 'large'

const STATES: { value: FeedState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'empty', label: 'Empty' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
  { value: 'large', label: 'Large (1k)' },
]

type DevStateToolbarProps = {
  state: FeedState
  onChange: (state: FeedState) => void
  transactionCount: number
  canEditTransactions: boolean
  onAddTransaction: () => void
  onRemoveLast: () => void
}

export function DevStateToolbar({
  state,
  onChange,
  transactionCount,
  canEditTransactions,
  onAddTransaction,
  onRemoveLast,
}: DevStateToolbarProps) {
  return (
    <div className="dev-toolbar" role="region" aria-label="Interview dev controls">
      <div className="dev-toolbar__row">
        <span className="dev-toolbar__label">Dev state</span>
        <div className="dev-toolbar__controls" role="group" aria-label="Feed state">
          {STATES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className="dev-toolbar__btn"
              aria-pressed={state === value}
              onClick={() => onChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="dev-toolbar__row dev-toolbar__row--secondary">
        <span className="dev-toolbar__label">Transactions</span>
        <span className="dev-toolbar__count">{transactionCount} rows</span>
        <div className="dev-toolbar__controls" role="group" aria-label="Edit transactions">
          <button
            type="button"
            className="dev-toolbar__btn"
            disabled={!canEditTransactions}
            onClick={onAddTransaction}
          >
            Add
          </button>
          <button
            type="button"
            className="dev-toolbar__btn"
            disabled={!canEditTransactions || transactionCount === 0}
            onClick={onRemoveLast}
          >
            Remove last
          </button>
        </div>
        {!canEditTransactions && (
          <span className="dev-toolbar__hint">Editing disabled in this state</span>
        )}
      </div>
    </div>
  )
}
