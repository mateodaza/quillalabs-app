import { Provider } from 'mobx-react'
import { useStore } from '../store'
import { appWithTranslation } from '../i18n'
import { ToastProvider } from 'react-toast-notifications'
import '../common/global.css'
import '../common/milligram/milligram.css'
import '../common/milligram/milligram-theme.css'
import 'swiper/css/swiper.css';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)

  return (
    <Provider store={store}>
      <ToastProvider 
        autoDismiss
        autoDismissTimeout={6000}
        transitionState="entering"
        placement='top-center'>
        
        <Component {...pageProps} />
        
      </ToastProvider>
    </Provider>
  )
}

export default appWithTranslation(App)