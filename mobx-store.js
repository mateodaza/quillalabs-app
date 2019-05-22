import localStore from 'store'
import AuthStore from './stores/auth-store';

class Store {
  constructor(session) {
    this.userSession = session 
    this.authStore = new AuthStore(this);
  }
}

// export function initializeStore () {
//   return new Store()
// }

export function initializeStore (isServer) {
  let store = null
  let userSession = localStore.get('USERSESSION')
  if (isServer) {
    return new Store(userSession)
  } else {
    if (store === null) {
      store = new Store(userSession)
    }else if(!userSession) {
      store = new Store(null)
    }
    return store
  }
}