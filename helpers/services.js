import env from './env'
const { apiRoute } = env

export const callAPI = (url, customOptions, customRoute) => {

  let route = customRoute || apiRoute
  let finalRoute = route+url
  let options = customOptions || null

  options.headers ={
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  console.log({finalRoute, options})
  const fetchData = async () => {
    let response = null
    let error = null
    try {
      const res = await fetch(finalRoute, options);
      response = await res.json();
    } catch (error) {
      error = error
    }
    return { response, error };
  };

  return fetchData();
};