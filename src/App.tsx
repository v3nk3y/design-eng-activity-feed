import { useMemo, useState } from 'react'
import { ActivityFeed } from './components/ActivityFeed/ActivityFeed'
import {
  DevStateToolbar,
  type FeedState,
} from './components/DevStateToolbar/DevStateToolbar'
import {
  createMockTransaction,
  generateLargeTransactionList,
  sampleTransactions,
} from './data/transactions'
import { getFeedStateFromUrl, setFeedStateInUrl } from './feedState'
import './App.css'

function getInitialTransactions(state: FeedState) {
  if (state === 'empty') return []
  return [...sampleTransactions]
}

function App() {
  const initialState = getFeedStateFromUrl()
  const [feedState, setFeedState] = useState<FeedState>(initialState)
  const [transactions, setTransactions] = useState(() =>
    getInitialTransactions(initialState),
  )

  const canEditTransactions =
    feedState === 'default' || feedState === 'empty'

  const handleStateChange = (state: FeedState) => {
    setFeedState(state)
    setFeedStateInUrl(state)

    if (state === 'default') {
      setTransactions([...sampleTransactions])
    } else if (state === 'empty') {
      setTransactions([])
    }
  }

  const handleAddTransaction = () => {
    setTransactions((prev) => [createMockTransaction(), ...prev])
  }

  const handleRemoveLast = () => {
    setTransactions((prev) => prev.slice(0, -1))
  }

  const displayTransactions = useMemo(() => {
    if (feedState === 'large') {
      return generateLargeTransactionList(1000)
    }
    return transactions
  }, [feedState, transactions])

  return (
    <div className="app">
      <DevStateToolbar
        state={feedState}
        onChange={handleStateChange}
        transactionCount={displayTransactions.length}
        canEditTransactions={canEditTransactions}
        onAddTransaction={handleAddTransaction}
        onRemoveLast={handleRemoveLast}
      />

      <div className="app-body">
        <header className="app-header">
          <p className="app-header__eyebrow">Business checking</p>
          <h1 className="app-header__title">Operating account</h1>
          <p className="app-header__balance">$24,531.18</p>
        </header>

        <main className="app-main">
          {feedState === 'loading' && (
            <p className="app-placeholder">Loading transactions…</p>
          )}

          {feedState === 'error' && (
            <p className="app-placeholder app-placeholder--error">
              Could not load transactions.
            </p>
          )}

          {feedState !== 'loading' && feedState !== 'error' && (
            <ActivityFeed transactions={displayTransactions} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
