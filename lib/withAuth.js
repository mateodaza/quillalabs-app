import React from "react";

const setMobileCheck =(store, isMobile)=> { 
  const { authStore } = store
  authStore.update('isMobile', isMobile)
}

export function withAuthServerSideProps(getServerSidePropsFunc) {
  return async (context) => {
      const user = await getUser(context);
      if (getServerSidePropsFunc) {
          return { props: { user, data: await getServerSidePropsFunc(context, user) } };
      }
      return { props: { user, data: { props: { user } } } };
  };
}

export function withAuthComponent(Component) {
  return ({ user, data, store }) => {
      if(store) {
        setMobileCheck(store, data.mobileCheck)
      }
      if (!user) {
        return <h1>Denied</h1> // or redirect, we can use the Router because we are client side here
      }
      return <Component {...data.props}/>
  }
}

//EXAMPLE
async function getUser(content) {
  return {
      id: 1,
      username: "JBis",
      email: "test@test.com"
  };
}
