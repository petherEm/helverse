import '../styles/globals.css'
import Layout from '../components/Layout'
import store from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    )
}

export default MyApp
