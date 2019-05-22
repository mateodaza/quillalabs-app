import localStore from 'store'
import {observable, computed, action} from 'mobx';

export default class AuthStore {
  
  @observable isLogged = false;
  @observable auth = null;

  constructor(stores) {
    if(stores.userSession) {
      this.login(JSON.parse(stores.userSession))
    }
  }

  @action login(auth) {
    this.isLogged = true;
    this.auth = auth;
    const expiration = new Date().getTime() + 30 * 24 * 60 * 60;
    localStore.set('USERSESSION', JSON.stringify(auth), expiration)
  }

  @action logout() {
    this.isLogged = false;
    this.auth = null;
    localStore.remove('USERSESSION')
  }

}