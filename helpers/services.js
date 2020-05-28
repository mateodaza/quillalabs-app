import env from './env'
const { apiRoute } = env

export const callAPI = (url, token, customOptions, customRoute, addToast) => {

  let route = customRoute || apiRoute
  let finalRoute = route+url
  let options = customOptions || null

  options.headers ={
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if(token) options.headers['Authorization'] = `Bearer ${token}`;

  const fetchData = async () => {
    let data = null
    let error = null
    try {
      const res = await fetch(finalRoute, options);
      data = await res.json();
      if(data.error) {
        // console.log({data})
        addToast(data.error, { appearance: 'error' })
        data = null
      }
    } catch (error) {
      error = error
      console.log({error})
      addToast && addToast(`There was an error: ${error}`, {
        appearance: 'error',
      })
    }
    return { data, error };
  };

  return fetchData();
};