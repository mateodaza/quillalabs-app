import { action, observable, computed, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import AuthStore from './stores/auth-store';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(typeof window === 'undefined')

let store

class Store {

  constructor(session) {
    this.authStore = new AuthStore(this);
  }

  hydrate = data => {
    if (!data) return
    this.authStore = data.authStore
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store()

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
