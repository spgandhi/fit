import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'

import 'antd/dist/antd.css';
import '../../styles/globals.css'


// import App from 'next/app'
const client = new ApolloClient({
  uri: typeof window !== "undefined" ? `${window.location.protocol}//${window.location.hostname}:4000/graphql` : 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: any) {
  return (
    <div>
      <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </div>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

