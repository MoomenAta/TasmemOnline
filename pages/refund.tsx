import Head from 'next/head'
import { useEffect } from 'react';
import useChangeLang from '../useHooks/useChangeLang';
import styles from '../styles/Refund.module.scss'

export default function Refund() {
  let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
  return (
    <>
    <Head>
        <title>Refund | Tasmem Online</title>
    </Head>
    <div className={styles.container}>
          <div className={styles.refundContainer}>
                <div className={styles.arLang}>
                    <h2>سياسة الإستبدال والإسترجاع</h2>
                    <p>نظرأ لطبيعة المنتج والخدمات المقدمة، فأنه لا يمكن الإستبدال أو الإسترجاع لقيمة الأتعاب.
    
                    كذلك ننصح بالإطلاع على نماذج الأعمال قبل الشراء، كذلك قراءة وصف الخدمة والمخرجات ونطاق الأعمال.
                    
                    لا تتردد بالإتصال بنا لإستيضاح أى معلومة عن الخدمات المقدمة.
                    </p>
                </div>
                <div className={styles.enLang}>
                    <h2>Return and refund policy</h2>
                    <p>Regarding the nature of the product and the services provided, it is not possible to exchange or refund the value of the fees.
        
                        We recommend that you review work samples before purchasing, as well as read the service description, output and scope of work.
                        
                        Do not hesitate to contact us for more information about the services provided.
                    </p>
                </div>
          </div>
        </div>
        </>
  )
}
