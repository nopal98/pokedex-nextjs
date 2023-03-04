import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
