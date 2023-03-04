import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

library.add(fas)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
