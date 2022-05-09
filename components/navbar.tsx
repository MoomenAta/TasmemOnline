import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link'
import Image from 'next/image';
import Cart from './cart';

import { RootState } from '../redux/store';
import { useSelector , useDispatch } from 'react-redux';
import { openAside } from '../redux/asideSlice';
import { enlang } from '../redux/langSlice';

export default function Navbar() {

    
    let cartItems = useSelector((state : RootState)=> state.cart);
    let [cartItemsCount , setCartItemsCount] = useState<number>(cartItems.length)
    let aside = useSelector((state : RootState)=> state.aside);
    let dispatch = useDispatch();

    let navUlLiAnchors = useRef<HTMLAnchorElement[]>([]);
    const addToAnchorsRef = (el:HTMLAnchorElement)=>{
        if(el && !navUlLiAnchors.current.includes(el)){
            navUlLiAnchors.current.push(el)
        }

    }
    let navbarUl = useRef<HTMLUListElement>(null);
    let bmenu = useRef<HTMLDivElement>(null);

    let [show , setShow] = useState<boolean>(false);

    useEffect(()=>{
        setCartItemsCount(cartItems.length)
    },[cartItems])
    
    useEffect(()=>
    {
        navUlLiAnchors.current?.forEach( (li:HTMLElement) => 
        {
            li.addEventListener("click",()=>{
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                li.classList.add('active');
                setShow(false);
                navbarUl.current?.classList.remove('open');
                document.body.style.overflowY = "";
            })
        })

        window.addEventListener("resize",()=>{
        if(window.innerWidth>768)
        {
            document.body.style.overflowY = "";
        }
        })
    })
    useEffect(()=>
    {
        if(show)
        {
            navbarUl.current?.classList.add('open');
            document.body.style.overflowY = "hidden";
            if(bmenu?.current?.style){
                bmenu.current.style.transform = "rotate(-90deg)";
            }
        }
        else
        {
            navbarUl.current?.classList.remove('open');
            document.body.style.overflowY = "";
            if(bmenu?.current?.style){
                bmenu.current.style.transform = "rotate(0)";
            }
        }
    })

    useEffect(()=>
    {
            if(window.location.pathname=="/" || window.location.pathname==""){
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[0].classList.add('active');
            }
            if(window.location.pathname.startsWith('/store'))
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[1].classList.add('active');
            }
            if(window.location.pathname=="/our_work")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[2].classList.add('active');
            }
            if(window.location.pathname=="/design360")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[3].classList.add('active');
            }
            if(window.location.pathname=="/ourstory")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[4].classList.add('active');
            }
            if(window.location.pathname=="/blog")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[5].classList.add('active');
            }
            if(window.location.pathname=="/contactus")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[6].classList.add('active');
            }
            if(window.location.pathname=="/work_with_us")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[7].classList.add('active');
            }
            if(window.location.pathname=="/refund")
            {
                navUlLiAnchors.current?.forEach(item=>item.classList.remove('active'));
                navUlLiAnchors.current[8].classList.add('active');
            }
    })

    useEffect(()=>
    {
        if(aside)
        {
            document.querySelector('[data-aside]')?.classList.add('openAside');
        }
        else
        {
            document.querySelector('[data-aside]')?.classList.remove('openAside');
        }
    },[aside])

    return (
        <>
            <header className={styles.header}>
                <Link href="/">
                <a>
                <div id="logo" className={styles.logo}>
                    <Image src={'/logo.png'} height="24" width="24" alt="logo"/>
                </div>
                </a>
                </Link>
                <nav>
                    <ul ref={navbarUl} id="navbarUl" className={styles.navbarUl}>
                        <Link href="/">
                        <a ref={addToAnchorsRef} className="" >
                            <li>
                                <span data-enlang>Home</span>
                                <span data-arlang>الرئيسية</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/store">
                        <a ref={addToAnchorsRef}>
                            <li>
                                <span data-enlang>Store</span>
                                <span data-arlang>متجر التصاميم</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/our_work">
                        <a ref={addToAnchorsRef}>
                            <li>
                                <span data-enlang>Our work</span>
                                <span data-arlang>أعمالنا</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/design360">
                        <a ref={addToAnchorsRef}>
                            <li>
                                <span data-enlang>360</span>
                                <span data-arlang>360</span>
                            </li>
                        </a>
                        </Link>
                        <Link href="/ourstory">
                        <a ref={addToAnchorsRef}>
                            <li>
                                <span data-enlang>Our Story</span>
                                <span data-arlang>من نحن</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/blog">
                        <a ref={addToAnchorsRef}>
                            <li>
                                <span data-enlang>Blog</span>
                                <span data-arlang>المدونة</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/contactus">
                        <a ref={addToAnchorsRef}>
                            <li>
                            <span data-enlang>Contact us</span>
                                <span data-arlang>إتصل بنا</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/work_with_us">
                        <a ref={addToAnchorsRef}>
                            <li>
                            <span data-enlang>Work with us</span>
                                <span data-arlang>إشتغل معنا</span>
                                
                            </li>
                        </a>
                        </Link>
                        <Link href="/refund">
                        <a ref={addToAnchorsRef} >
                            <li>
                            <span data-enlang>Refund</span>
                                <span data-arlang>الإستبدال و الإسترجاع</span>
                                
                            </li>
                        </a>
                        </Link>
                    </ul>
                </nav>
                <div id="langCart" className={styles.langCart}>
                    <div ref={bmenu} id="burgermenu" className={styles.burgermenu} onClick={()=>setShow(!show)}>
                        <span></span>
                    </div>
                    <div data-cart onClick={()=> dispatch(openAside())} className={styles.cart}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 197.7 166" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-2"><path d="M197.9 55.9L169.9 127.4 64.5 127.4 27.6 29.8 0 29.8 0.2 16.7 36.5 16.7 73.4 114.3 160.9 114.3 183 55.9"></path><circle cx="143.8" cy="153" r="13"></circle><circle cx="90.8" cy="153" r="13"></circle><text data-hook="items-count" textAnchor="middle" x="116" y="35" dy=".48em">{cartItemsCount}</text></svg>
                    </div>
                    <span data-langchanger onClick={()=>dispatch(enlang())}>EN</span>
                </div>
                <Cart />
            </header>
        </>
    )
}


