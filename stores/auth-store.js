import localStore from 'store'
import autoSave from "./autosave"
import {observable, computed, action} from 'mobx';

export default class AuthStore {
  
  @observable isLogged = false;
  @observable auth = null;

  constructor(stores) {
    this.settings = null
    if(stores.userSession) {
      this.login(JSON.parse(stores.userSession))
    }

    autoSave(this, "AuthStore")
  }

  @action update(label, value) {
    this[label] = value
  }

  @action login(auth) {
    this.isLogged = true;
    this.auth = auth;
    const expiration = new Date().getTime() + 30 * 24 * 60 * 60;
    // localStore.set('USERSESSION', JSON.stringify(auth), expiration)
  }

  @action logout() {
    this.isLogged = false;
    this.auth = null;
    // localStore.remove('USERSESSION')
  }

}