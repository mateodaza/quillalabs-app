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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.auth.token}`,
        'Content-Type': 'application/json',
      },
    });
    const { data } = res
    console.log({data})
    this.destroyStore()
    Router.push("/")
  }


}