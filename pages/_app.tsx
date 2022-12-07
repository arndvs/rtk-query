import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from "../src/state/store"

export default function App({ Component, pageProps }: AppProps) {
    // wrap app in redux provider and pass store as prop
  return <Provider store={store} >
     <React.StrictMode>
        <Component {...pageProps} />
        </React.StrictMode>
  </Provider>
}
