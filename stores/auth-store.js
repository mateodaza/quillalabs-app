import localStore from 'store'
import cookie from 'cookie'
import {observable, computed, action} from 'mobx';

export default class AuthStore {
  
  @observable isLogged = false;
  @observable auth = null;

  constructor (auth) {
    // example
    // let user = localStore.get('USERSESSION')
  }

  @action login(auth) {
    console.log('IM LOGGIN IN')
    this.isLogged = true;
    this.auth = auth;
  }

  @action logout() {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })
    this.isLogged = false;
    this.auth = null;
  }

  async checkStorage(auth) {
    // const auth = await this._getFromStorage()
    // console.log({auth})
    if(auth) {
      this.login(auth)
    }
  }

  async _getFromStorage() {
    // return localStorage.getItem('token')
  }

}