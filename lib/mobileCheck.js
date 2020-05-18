
function mobileCheck(ctx) {
  const { req } = ctx
  let userAgent;
  if (req) { // if you are on the server and you get a 'req' property from your context
    userAgent = req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }
  let isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))
  return isMobile
}

export default mobileCheck
