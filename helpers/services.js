import env from './env'
import store from "store"
import { toJS } from 'mobx'
import Router from 'next/router'
const { apiRoute } = env

export const callAPI = (url, tokens, customOptions, customRoute, addToast) => {

  let route = customRoute || apiRoute
  let finalRoute = route+url
  let refreshRoute = route+"/sessions"
  let options = customOptions || null

  options.headers ={
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if(tokens) options.headers['Authorization'] = `Bearer ${tokens.token}`;
  
  //Case 409
  // if(tokens) options.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMiwibG9naW5fZXhwaXJhdGlvbiI6MTU5MTg0MDYzMywiZXhwaXJhdGlvbiI6MTU5MDcxNzQzM30.4jKy2-10aSS9-oD0OpaUOg2huvOd6vsegH55hQfLuDM`;
  //Case 406
  // if(tokens) options.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMiwibG9naW5fZXhwaXJhdGlvbiI6MTU5MTkyNzI0OSwiZXhwaXJhdGlvbiI6MTU5MDYzMTI0OX0.2UEkl5yCuCjlRJRDeZvHWO8zcR6hl6D26ZdOohv90bc`;
  
  const fetchData = async (fromRefresh) => {
    if(fromRefresh) {
      // set query with new token
      options.headers['Authorization'] = `Bearer ${fromRefresh}`
    }
    let data = null
    let error = null
    try {
      const res = await fetch(finalRoute, options);
      data = await res.json();
      console.log({res})
      if(res.status === 406) { // Not Acceptable, expired token but it can be refreshed
        return refreshToken()
      }
      if(res.status === 409) { // Conflict, expired token can't be refreshed
        store.remove("AuthStore") // Kills session
        Router.push("/") // Redirects to home
      }
      if(data.error) {
        // console.log({data})
        addToast && addToast(data.error, { appearance: 'error' })
        data = null
      }
    } catch (error) {
      const errorMsg = `There was an error: ${error}`
      addToast && addToast(errorMsg, {
        appearance: 'error',
      })
      return null
    }
    return { data, error };
  };

  const refreshToken =async()=> {
    const refreshOptions = {
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'RefreshToken': tokens && tokens.refresh_token,
      },
      'method': "PUT"
    }
    const refresh = await fetch(refreshRoute, refreshOptions);
    const newData = await refresh.json()
    // TODO: set mobxstore as well
    store.set("AuthStore", toJS(newData))
    //try again if valid
    newData && (fetchData(newData.token));
  }

  return fetchData();
};