import Head from 'next/head'
import { useEffect } from 'react';
import useChangeLang from '../useHooks/useChangeLang';
import styles from '../styles/Work_with_us.module.scss'

export default function Work_with_us() {
    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
    return (
    <>
    <Head>
        <title>Work with us | Tasmem Online</title>
    </Head>
    <section className={styles.workBody}>
        <div className={styles.workContainer}>
            <div className={styles.formContainer}>
                <h1>
                    <span>DOING BUSINESS WITH US</span>
                </h1>
                <h4>
                    <span>info@frontend.dev</span>
                </h4>
                
                <div className={styles.form}>
                    <form>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Phone" />
                        <input type="text" placeholder="Position" />
                        <input type="text" placeholder="Available start Date" />
                        <input type="text" placeholder="Link to your resume" />
                        <div className={styles.inputFile}>
                            <span>Upload file Max 15MB</span>
                            <input type="file" placeholder="Upload file Max 15MB" />
                        </div>
                    </form>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}
