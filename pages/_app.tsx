import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'

import { store } from '../redux/store'
import { Provider,useDispatch} from 'react-redux'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next';

import { auth } from '../firebase.config';
import { 
    onAuthStateChanged, 
    } from 'firebase/auth';
import { login , logout } from '../redux/firebaseLoginSlice'
/* import useChangeLang from '../components/usechangeLang' */


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


const AppWrapper = ({children}:any) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        
        dispatch(login({
          email: userAuth.email!,
          uid: userAuth.uid,
          displayName: `${userAuth.displayName}`,
        }))
      } else {
        dispatch(logout())
      }})
  },[dispatch])

  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  return (
    <>
    <Provider store={store}>
      <AppWrapper>
        {
          Component.getLayout ? Component.getLayout(<Component {...pageProps}></Component>) :
          <Layout>
            <Component {...pageProps} />
          </Layout>
        }
      </AppWrapper>
    
    </Provider>
    </>
  
  );
}

export default MyApp
