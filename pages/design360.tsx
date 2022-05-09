import Head from 'next/head'
import { useEffect } from 'react';
import useChangeLang from '../useHooks/useChangeLang';
import styles from '../styles/Design360.module.scss'

export default function Design360() {

  let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

  return (
    <>
    <Head>
      <title>360 | Tasmem Online</title>
    </Head>
    <div className={styles.containerAll}>
      <video controls>
          <source src="" type="video/mp4" />
          Video here 
      </video>
      <h1>360° Virtual reality VR interior design</h1>
    </div>
    </>
  )
}
