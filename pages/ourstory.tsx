/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useEffect } from 'react'
import useChangeLang from '../useHooks/useChangeLang';
import styles from '../styles/Ourstory.module.scss'

export default function Ourstory() {

    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

    useEffect(()=>
    {
        let h1tag = document.querySelector('[data-whous]') as HTMLElement;
        h1tag.style.transform = "translateX(0px)";
        h1tag.style.opacity = '1';
    })


    return (
        <>
        <Head>
            <title>Our Story | Tasmem Online</title>
        </Head>
        
        <div className={styles.container}>
            <div className={styles.containerStory}>
                <div className={styles.imgContainer}>
                        <img src="/imgs/img1.webp" alt="story"/>
                </div>
                <div className={styles.paragraphContainer}>
                    <h1 data-whous><span data-enlang>Who are we ?</span><span data-arlang>من نحن؟</span></h1>
                    <div>
                    <p><span data-arlang>تصاميم أونلاين مسجلة بالمملكة العربية السعودية متجر إلكترونى لمكتب الخبراء
                        المميزين للإستشارات الهندسة وبجمهورية
                        مصر العربية بوزارة الإستثمار شركة هندسية ذات مسؤولية محدودة نقدم الخدمات الهندسية
                        المتعددة من الدراسات والتصميم والإشراف على التنفيذ وإدارة المشاريع فى  بفريق 
                        عمل متميز من مهندسين محترفين ذوى خبرات متعددة  بكبرى المشاريع الحكومية والخاصة
                        سواء سكنية وتعليمية ومستشفيات وفنادق ومولات بحرفية عالية وتطبيق أعلى معايير  الجودة
                        </span>
                        <span data-enlang>
                        Online designs registered in the Kingdom of Saudi Arabia An online store for the Office of Distinguished Experts for Engineering 
                        Consultations and the Arab Republic of Egypt at the Ministry of Investment An engineering company with limited liability. 
                        Residential, educational, hospitals, hotels and malls with high professionalism and application of the highest quality standards
                        </span>
                    </p>
                    <p>
                        <span data-arlang>
                        تصاميم
                        أونلاين نقدم خدمات هندسية  تشمل كافة التخصصات الهندسية: المعمارى والتصميم 
                        الداخلى والإنشائى والكهرباء  والميكانيكا ومكافحة الحريق 
                        </span>
                        <span data-enlang>
                        Online Designs We offer engineering services that include all engineering disciplines: 
                        architecture, interior and structural design, electricity, mechanics and firefighting.
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
