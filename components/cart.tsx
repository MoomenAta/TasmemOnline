/* eslint-disable @next/next/no-img-element */
import { useEffect , useRef, useState } from 'react';
import styles from '../styles/Cart.module.scss'

import { RootState } from '../redux/store';
import { useSelector , useDispatch } from 'react-redux';
import { amountIncrease,amountDecrease,addToCart , removeFromCart } from '../redux/cartSlice'
import { openAside , closeAside } from '../redux/asideSlice';
import { ProductWithQuantity } from '../types';
import Link from 'next/link';

const Cart = () =>
{
    let cartItems = useSelector((state : RootState)=> state.cart);
    let aside = useSelector((state : RootState)=> state.aside);
    let asideRef = useRef();
    asideRef.current = aside

    let asideDom = useRef<HTMLElement>(null);
    
    let dispatch = useDispatch();

    useEffect(()=>
    {
        
        let handler = (e : any) =>
        {
            var target = e.target as HTMLElement
            if(!document.querySelector('[data-cart]')?.contains(target)
            && !(target.dataset['remove'] == 'true')
            && !asideDom.current?.contains(target)) {
                dispatch(closeAside())
            }
        }
        document.addEventListener('click' , handler)

        return () => document.removeEventListener('click',handler)
    },[dispatch])

    useEffect(()=>{
        
        localStorage.setItem('cart',JSON.stringify(cartItems));
    },[cartItems,dispatch])
    
    
    let add = (itemId:number)=>{
        dispatch(amountIncrease(itemId))
    }
    let minus = (itemId:number , c:number)=>{
        if(c==1)
        {
            setTimeout(() => {
                dispatch(removeFromCart(itemId))
            }, 0); 
        }
        dispatch(amountDecrease(itemId))
    }
return(
    <>
    <aside data-aside ref={asideDom} className={styles.cart}>
    <button data-close onClick={()=> dispatch(closeAside())} type="button">
        <span>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M555 5106 c-106 -26 -143 -52 -316 -225 -184 -184 -209 -222 -231
            -350 -9 -56 -9 -86 0 -141 26 -151 -7 -114 890 -1012 l817 -818 -821 -822
            c-772 -774 -822 -827 -848 -887 -58 -132 -58 -264 1 -389 37 -82 333 -378 415
            -415 85 -40 182 -54 269 -39 149 26 105 -13 1006 886 l823 821 817 -817 c899
            -897 862 -864 1013 -890 86 -15 184 -1 268 39 82 37 378 333 415 415 40 84 54
            182 39 268 -26 151 7 114 -890 1012 l-817 818 817 818 c897 898 864 861 890
            1012 15 86 1 184 -39 268 -37 81 -332 376 -415 415 -124 59 -257 59 -389 1
            -60 -26 -113 -76 -887 -848 l-822 -821 -823 821 c-702 701 -830 824 -877 846
            -101 47 -205 59 -305 34z"/>
            </g>
            </svg>
        </span>
    </button>
        <h1>Cart</h1>
        {cartItems.length == 0 && <p style={{fontSize: '1.2rem'}}>Your cart is empty</p>}
        {cartItems.map((item:ProductWithQuantity , i:number)=>
        {
            return(
                <div key={i} className={styles.cartItem}>
                    <button data-remove type="button" onClick={()=>dispatch(removeFromCart(item.id))}>
                        <span>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M555 5106 c-106 -26 -143 -52 -316 -225 -184 -184 -209 -222 -231
                        -350 -9 -56 -9 -86 0 -141 26 -151 -7 -114 890 -1012 l817 -818 -821 -822
                        c-772 -774 -822 -827 -848 -887 -58 -132 -58 -264 1 -389 37 -82 333 -378 415
                        -415 85 -40 182 -54 269 -39 149 26 105 -13 1006 886 l823 821 817 -817 c899
                        -897 862 -864 1013 -890 86 -15 184 -1 268 39 82 37 378 333 415 415 40 84 54
                        182 39 268 -26 151 7 114 -890 1012 l-817 818 817 818 c897 898 864 861 890
                        1012 15 86 1 184 -39 268 -37 81 -332 376 -415 415 -124 59 -257 59 -389 1
                        -60 -26 -113 -76 -887 -848 l-822 -821 -823 821 c-702 701 -830 824 -877 846
                        -101 47 -205 59 -305 34z"/>
                        </g>
                        </svg>
                    </span>
                    </button>
                    <img src={item.img} alt="image" />
                    <div className={styles.itemInfo}>
                        <h3>{item.name}</h3>
                        <p> {item.price} $</p>
                        <div className={styles.count}>
                            <button onClick={()=>add(item.id)} type='button'>
                                <span>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#000000" stroke="none">
                                    <path d="M2471 5109 c-183 -36 -334 -197 -361 -384 -6 -41 -10 -397 -10 -861
                                    l0 -791 -26 -27 -27 -26 -791 0 c-464 0 -820 -4 -861 -10 -248 -35 -427 -275
                                    -387 -517 33 -200 189 -354 387 -383 42 -6 384 -10 861 -10 l791 0 27 -26 26
                                    -27 0 -791 c0 -464 4 -820 10 -861 35 -247 275 -427 516 -387 201 33 356 190
                                    384 387 6 41 10 397 10 861 l0 791 26 27 27 26 791 0 c477 0 819 4 861 10 249
                                    36 427 274 387 517 -33 200 -189 354 -387 383 -42 6 -384 10 -861 10 l-791 0
                                    -27 26 -26 27 0 791 c0 477 -4 819 -10 861 -38 258 -285 434 -539 384z"/>
                                    </g>
                                    </svg>
                                </span>
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={()=>minus(item.id, item.quantity)} type='button'>
                                <span>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#000000" stroke="none">
                                    <path d="M434 3050 c-206 -30 -366 -175 -419 -377 -65 -247 92 -511 350 -590
                                    57 -17 152 -18 2195 -18 2043 0 2138 1 2195 18 258 79 415 343 350 590 -45
                                    173 -170 305 -345 364 -53 17 -143 18 -2165 19 -1160 1 -2133 -2 -2161 -6z"/>
                                    </g>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })}
        {cartItems.length !== 0 && <Link href='/checkout'><a onClick={()=> dispatch(closeAside())} style={{width:'100%'}}><button data-checkout type='button'> Check Out </button></a></Link> }
    </aside>
    </>
)
}
export default Cart