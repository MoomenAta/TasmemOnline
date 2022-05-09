import Head from 'next/head';
import { useEffect } from 'react'
import useChangeLang from '../useHooks/useChangeLang';
import styles from '../styles/Contactus.module.scss'

export default function Contactus() {

    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

useEffect(()=>{
    let collapseControl = document.querySelectorAll('[data-collapsecontrol]');

    collapseControl.forEach((cl,i) =>
    {
        let opened = true;
        cl.addEventListener("click",(e)=>
        {
            let te = e.target as HTMLElement;
            let targetName = te.dataset.target;
            let targetEle = document.querySelector(`${targetName}`) as HTMLElement;
            console.log(targetEle);
            if(opened)
            {
                targetEle.style.display="none";
                collapseControl[i].innerHTML="&#8609";
                opened=false;
            }
            else 
            {
                targetEle.style.display="block";
                collapseControl[i].innerHTML="&#8607";
                opened=true;
            }
            
                    })
                })

            let h1 = document.querySelectorAll('h1');
            for(let i = 0 ; i< h1.length ; i++)
                {  
                    h1[i].style.transform = 'translateX(0)';
                    h1[i].style.opacity = '1';
                }
            



},[])

return (
    <>
    <Head>
        <title>Contact Us | Tasmem Online</title>
    </Head>
    
    <div className={styles.container}>
            <div className={styles.containerContactUs}>
                <h1 className={styles.animated}><span data-enlang>Contact Us</span> <span data-arlang>إتصل بنا</span></h1>
                <h3><span data-enlang>Have Questions?</span> <span data-arlang>لديك أسئلة؟</span></h3>
                <div className={styles.info}>
                    <h4>info@frontend.dev</h4>
                    <h4><span data-enlang>Designs requests</span> <span data-arlang>طلبات التصميمات</span></h4>
                </div>
                <div className={styles.form}>
                    <h5><span data-enlang>Fill Contact Form</span> <span data-arlang>املأ نموذج الاتصال</span>  </h5>
                    <form>
                        <input type="text" placeholder="Name الإسم" />
                        <input type="text" placeholder="Email البريد الإلكتروني" />
                        <input type="text" placeholder="Phone الجوال" />
                        <input type="text" placeholder="Address العنوان" />
                        <input type="text" placeholder="Subject الموضوع" />
                        <input type="text" placeholder="Area المساحة" />
                        <input type="text" placeholder="Requirements طلباتك" />
                        <textarea placeholder="Requirements طلباتك"></textarea>
                    </form>
                    <button type="submit">Send</button>
                </div>
                <div className={styles.faqContainer}>
                    <h1 className={styles.animated}>FAQ</h1>
                    <div className={styles.faq}>
                        <div className={styles.faqNum}>
                            <div className={styles.faqHead}>
                                <p><span data-enlang>How can I Pay ?</span> <span data-arlang>كيفية الدفع ؟ </span></p>
                                <span data-collapsecontrol className={styles.collapseControl} data-target="#bodyOne">&#8607;</span>
                            </div>
                            <div className={styles.faqBody} id="bodyOne">
                                <p>
                                    <span data-enlang>
                                    You can pay online by your credit card via Paypal 
                                    secure connection or bank transfer.
                                    </span>
                                    <span data-arlang>
                                        يمكنك الدفع ببطاقتك الإئتمانية او عبر بيايبال او بالتحويلات البنكية
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.faqNum}>
                            <div className={styles.faqHead}>
                                <p><span data-enlang>WHERES YOUR LOCATION?</span> <span data-arlang>أين موقعك ؟ </span></p>
                                <span data-collapsecontrol className={styles.collapseControl} data-target="#bodyTwo">&#8607;</span>
                            </div>
                            <div className={styles.faqBody} id="bodyTwo">
                                <p>We provide online services via our web site www.tasamimonline.com,
                                    We have Offices in Cairo & AlKHobar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
