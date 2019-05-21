import {observable, computed, action} from 'mobx';

export default class AuthStore {
  
  @observable isLogged = false;
  @observable auth = null;

   constructor (auth) {
    // this.checkStorage(auth)
  }

  @action login(auth) {
    console.log('IM LOGGIN IN')
    this.isLogged = true;
    this.auth = auth;
  }

  @action logout() {
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