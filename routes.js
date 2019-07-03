const routes = require('next-routes')


module.exports = routes()
.add('home', '/', 'index')
.add('index', '/', '')
.add('signin')
.add('create-account')
.add('event', '/event/:name')
.add('checkout', '/checkout/:event')
.add('tickets')
.add('payment_confirmation')
                                                        // Name   Page      Pattern
                                                        // ----   ----      -----
// .add('about')                                       // about  about     /about
// .add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
// .add('user', '/user/:id', 'profile')                // user   profile   /user/:id
// .add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
// .add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3