import autoSave from "./autosave"
import Router from 'next/router'
import {observable, computed, action} from 'mobx';
import { callAPI } from '../helpers/services'

export default class AuthStore {
  
  @observable isLogged = false;
  @observable settings = false;
  @observable auth = null;

  constructor(stores) {
    this.settings = null

    autoSave(this, "AuthStore")
  }

  @action destroyStore() {
    this.isLogged = false
    this.settings = false
    this.auth = null
    autoSave(this, "AuthStore")
  }

  @action update(label, value) {
    this[label] = value
  }

  @action loginUser(auth) {
    this.isLogged = true;
    this.auth = auth;
    autoSave(this, "AuthStore")
  }

  @action async logoutUser() {
    const res = await callAPI("/sessions", {
      token: this.auth.token,
      refresh_token: this.auth.refresh_token
    }, {
      method: 'DELETE',
    });
    this.destroyStore()
    Router.push("/")
  }


}