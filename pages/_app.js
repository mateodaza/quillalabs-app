import { Provider } from 'mobx-react'
import { useStore } from '../store'
import { appWithTranslation } from '../i18n'
import '../common/milligram/milligram.css'
import '../common/milligram/milligram-theme.css'

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App)