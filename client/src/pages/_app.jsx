import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout'
import { Context } from '../store/Context';



const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = React.useState({});


  return (
    <Context.Provider value={[user, setUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  )
}

export default MyApp
