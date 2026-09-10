import type { FeedState } from './components/DevStateToolbar/DevStateToolbar'

export function getFeedStateFromUrl(): FeedState {
  const param = new URLSearchParams(window.location.search).get('state')
  if (
    param === 'empty' ||
    param === 'loading' ||
    param === 'error' ||
    param === 'large'
  ) {
    return param
  }
  return 'default'
}

export function setFeedStateInUrl(state: FeedState) {
  const url = new URL(window.location.href)
  if (state === 'default') {
    url.searchParams.delete('state')
  } else {
    url.searchParams.set('state', state)
  }
  window.history.replaceState({}, '', url)
}
