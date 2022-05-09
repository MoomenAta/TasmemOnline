/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps , NextPage, NextPageContext } from 'next'
import { product, ProductWithQuantity } from '../types'

import Head from 'next/head'
import Image from 'next/image'
import { useEffect} from 'react'
import ProductCard from '../components/productCard'
import styles from '../styles/Home.module.scss'
import useChangeLang from '../useHooks/useChangeLang'

const Home:NextPage<{imagesData:string[],productsWithQuantity : ProductWithQuantity[]}> = ({imagesData,productsWithQuantity}) =>{
    //updating language 
    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
    //end updating language
    useEffect(()=>
    {
        //get image subcontainer
        let carouselimg = document.querySelectorAll('[data-subimagecontainer]') as NodeListOf<Element>;
        //current image shown number
        let current:number = 0;
        //current opacity class pos
        let currentOpacityClass = document.getElementsByClassName('opacityclass')[0] as HTMLElement
        //interval variable
        let intervalImg:ReturnType<typeof setInterval> = setInterval(() => {
            if(current < carouselimg.length)
            {
                current++;
            }
            if(current>carouselimg.length-1)
            {
                current=0;
            }
            currentOpacityClass.classList.remove('opacityclass');
            carouselimg[current].classList.add('opacityclass');
            //update current opacity class pos
            currentOpacityClass = document.getElementsByClassName('opacityclass')[0] as HTMLElement
            //updating active radio input
            document.getElementsByTagName('input')[current].checked = true; 
        
        },4000);
    
        //radio input on click stops interval
        let inputRadio = [...document.getElementsByClassName("inputRadio")] as HTMLInputElement[];
        inputRadio.forEach((input : HTMLElement) => 
        {
            input.addEventListener("click",()=>
            {
                clearInterval(intervalImg);
                if(input.dataset.num !== undefined)
                {
                    current = +input.dataset.num;
                }
                currentOpacityClass.classList.remove('opacityclass');
                carouselimg[current].classList.add('opacityclass');
                //update current opacity class pos
                currentOpacityClass = document.getElementsByClassName('opacityclass')[0] as HTMLElement
                document.getElementsByTagName('input')[current].checked = true; 
            })    
        });

        //go to next img in carousel function
        function controlImgsNext()
        {
            clearInterval(intervalImg);
            if(current === imagesData.length - 1)
            {
                current = 0;
            }
            else 
            {
                current += 1;
            }
            currentOpacityClass.classList.remove('opacityclass');
            carouselimg[current].classList.add('opacityclass');
            //update current opacity class pos
            currentOpacityClass = document.getElementsByClassName('opacityclass')[0] as HTMLElement
            document.getElementsByTagName('input')[current].checked = true; 
        }
        //go to prev img in carousel function
        function controlImgsPrev()
        {
            clearInterval(intervalImg);
            if(current === 0)
            {
                current = imagesData.length - 1 ;
            }
            else 
            {
                current -= 1;
            }
            currentOpacityClass.classList.remove('opacityclass');
            carouselimg[current].classList.add('opacityclass');
            //update current opacity class pos
            currentOpacityClass = document.getElementsByClassName('opacityclass')[0] as HTMLElement
            document.getElementsByTagName('input')[current].checked = true; 
        }
        //next prev controllers
        let next = document.getElementById('next') as HTMLElement;
        let prev = document.getElementById('prev') as HTMLElement;
        next.addEventListener("click",controlImgsNext);
        prev.addEventListener("click",controlImgsPrev);
        //end first section js

        /*************************** SCROLL *******************************/
        let contentContainer = document.querySelector('[data-contentcontainer]') as HTMLElement;
        let incScroll = document.getElementById('sctwonext') as HTMLElement;
        let decScroll = document.getElementById('sctwoprev') as HTMLElement;
        incScroll.addEventListener("click",()=>
        {
            contentContainer.scrollBy(200,0);
        });
        decScroll.addEventListener("click",()=>
        {
            contentContainer.scrollBy(-200,0);
        });
        
        let isDown:boolean = false;
        let cursorPos : number;
        let updatedCursorPos : number;
        let scrollLeftPos : number;
        contentContainer.addEventListener('mousedown',(e:MouseEvent)=>{
            e.preventDefault();
            isDown = true

            cursorPos = e.pageX - contentContainer.offsetLeft;
            scrollLeftPos = contentContainer.scrollLeft;
        })

        contentContainer.addEventListener('mouseleave',(e:MouseEvent)=>{
            isDown = false
        })

        contentContainer.addEventListener('mouseup',(e:MouseEvent)=>{
            isDown = false
        })

        contentContainer.addEventListener('mousemove',(e:MouseEvent)=>{
            e.preventDefault();
            if(!isDown) return;
            
            updatedCursorPos = e.pageX - contentContainer.offsetLeft;
            contentContainer.scrollLeft = scrollLeftPos + cursorPos - updatedCursorPos;
        })

        return ()=>
        {
            clearInterval(intervalImg);
        }
    },[])
    


    /***************************************** HTML ***************************************************/
    return (
    <div className={styles.container}>
    <Head>
        <title>Design | Tasamem Online</title>
        <meta name="description" content="Tasamem Online تصاميم اونلاين" />
        <link rel="icon" href="/logo.png" />
    </Head>

    <section>
        <div id="scone" className={styles.scone}>
            <div className={styles.textAll}>
                <h1><span data-enlang>Tasamem Online</span><span data-arlang>تصاميم أونلاين</span></h1>
                <div className={styles.textAllP}>
                    <p><span data-arlang>تصميم معمارى ، تصميم داخلي ، إستشارات هندسية وإدارة مشاريع

                    خدمات هندسية بمستوى عالمى من فريق عمل من المهندسين المحترفين بخبرات متعددة بكبرى المشاريع على المستوى المحلى والإقليمى، لتحقيق طلبات عملائنا سواء تفكر بتصميم بيت أو تصميم فيلا سكنية أو تصميم داخلي مشروع تجاري إستثماري فكن متأكد أن تصاميم أونلاين   معك لتقديم خدماتنا الهندسية بأعلى المعايير
                    </span>
                    <span data-enlang>
                    Architectural design, interior design, engineering consultancy and project management
                    World-class engineering services from a team of professional engineers with multiple experiences in major projects at the local and regional levels,
                     to achieve the demands of our customers, whether you are thinking of designing a house, designing a residential villa, or interior designing a commercial 
                     investment project,so be sure that Designs Online is with you to provide our engineering services with the highest standards
                    </span>
                    </p>
                </div>
            </div>
            
            {imagesData.map((image:string , i : number)=>{
                return(
                    <div key={i} data-imagecontainer className={`${styles.imageContainer}`} data-num={i} >
                    <div data-subimagecontainer className={`${i == 0 ? "opacityclass":"" }`} >
                    <Image src={image} alt={`image${i}`} layout='fill' />
                    </div>
                    </div>
                )
            })}
            

            <div className={styles.controlers}>
                <button id="prev" type="button">
                    <span>
                        <svg data-prev version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512pt" height="512pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M1424 5105 c-321 -70 -478 -416 -327 -720 19 -39 220 -245 909 -935
                        l884 -885 -876 -875 c-621 -621 -885 -892 -911 -933 -49 -81 -73 -166 -73
                        -260 0 -384 411 -618 745 -425 34 20 386 364 1080 1056 567 565 1050 1042
                        1074 1061 176 138 215 458 80 660 -22 34 -62 78 -87 98 -26 20 -510 499 -1077
                        1063 -1007 1003 -1032 1027 -1102 1059 -112 50 -206 61 -319 36z"/>
                        </g>
                        </svg>
                    </span>
                </button>
                <button id="next" type="button">
                    <span>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512pt" height="512pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M1424 5105 c-321 -70 -478 -416 -327 -720 19 -39 220 -245 909 -935
                        l884 -885 -876 -875 c-621 -621 -885 -892 -911 -933 -49 -81 -73 -166 -73
                        -260 0 -384 411 -618 745 -425 34 20 386 364 1080 1056 567 565 1050 1042
                        1074 1061 176 138 215 458 80 660 -22 34 -62 78 -87 98 -26 20 -510 499 -1077
                        1063 -1007 1003 -1032 1027 -1102 1059 -112 50 -206 61 -319 36z"/>
                        </g>
                        </svg>
                    </span>
                </button>
            </div>
            <div className={styles.controlersDots}>
                {imagesData.map(( image:string , i : number)=>{
                    return(
                        <input key={i} className="inputRadio" data-num={i} type="radio" defaultChecked = {i == 0 ? true : false} name="imgShown"/>
                    )
                })}
            </div>
        </div>
        
    </section>
    {/* <!--SECTION TWO--> */}
    <section>
        <div className={styles.sctwo}>
            <div data-contentcontainer className={styles.contentContainer}>
                {
                    productsWithQuantity.map(({id,quantity,img,name,price,bestseller,discount}:ProductWithQuantity)=>{
                        return(
                        <ProductCard key={id} quantity={quantity} id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} />
                        )
                    })
                }
            </div>
            <div className={styles.sctwoControlers}>
                <button id="sctwoprev" type="button">
                    <span>
                        <svg data-prev version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512pt" height="512pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M1424 5105 c-321 -70 -478 -416 -327 -720 19 -39 220 -245 909 -935
                        l884 -885 -876 -875 c-621 -621 -885 -892 -911 -933 -49 -81 -73 -166 -73
                        -260 0 -384 411 -618 745 -425 34 20 386 364 1080 1056 567 565 1050 1042
                        1074 1061 176 138 215 458 80 660 -22 34 -62 78 -87 98 -26 20 -510 499 -1077
                        1063 -1007 1003 -1032 1027 -1102 1059 -112 50 -206 61 -319 36z"/>
                        </g>
                        </svg>
                    </span>
                </button>
                <button id="sctwonext" type="button">
                    <span>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="512pt" height="512pt" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                            <path d="M1424 5105 c-321 -70 -478 -416 -327 -720 19 -39 220 -245 909 -935
                            l884 -885 -876 -875 c-621 -621 -885 -892 -911 -933 -49 -81 -73 -166 -73
                            -260 0 -384 411 -618 745 -425 34 20 386 364 1080 1056 567 565 1050 1042
                            1074 1061 176 138 215 458 80 660 -22 34 -62 78 -87 98 -26 20 -510 499 -1077
                            1063 -1007 1003 -1032 1027 -1102 1059 -112 50 -206 61 -319 36z"/>
                            </g>
                            </svg>
                        </span>
                </button>
            </div>
        </div>
    </section>
    </div>
    )
}

export const getServerSideProps:GetServerSideProps= async (context:GetServerSidePropsContext) =>{
    try{
        var fetchData = await fetch(`https://${context.req.headers.host}/api/data`);
    }catch(e){
        fetchData = await fetch(`http://${context.req.headers.host}/api/data`);
    }
    let res = await fetchData.json();
    let imagesData:string[] = await res.images;
    let productsData:product[] = await res.products;
    let productsWithQuantity : ProductWithQuantity[] = productsData.map((item)=>{
        return { ...item , quantity : 1}
    }) 
    return{
        props : {
            imagesData,productsWithQuantity
        }
    }
}

export default Home
