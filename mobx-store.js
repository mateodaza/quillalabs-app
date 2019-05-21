import AuthStore from './stores/auth-store';

class Store {
  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export function initializeStore () {
  return new Store()
}