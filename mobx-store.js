import localStore from 'store'
import AuthStore from './stores/auth-store';

class Store {
  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export function initializeStore () {
  return new Store()
}

// export function initializeStore (isServer) {
//   let userCookie = localStore.get('USERSESSION')
//   if (isServer) {
//     return new Store(userCookie)
//   } else {
//     if (store === null) {
//       store = new Store(userCookie)
//     }else if(!userCookie) {
//       store = new Store(null)
//     }
//     return store
//   }
// }