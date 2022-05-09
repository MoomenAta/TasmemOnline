import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from '../styles/CheckOut.module.scss'
import useChangeLang from "../useHooks/useChangeLang";
import { ProductWithQuantity } from '../types';
import { amountDecrease, amountIncrease, removeFromCart } from "../redux/cartSlice";
import Link from "next/link";

let CheckOut:NextPage = ()=>{
    let cartItems = useSelector((state:RootState)=> state.cart);
    let userName = useSelector((state:RootState)=>state.loginUser);
    let [totalPrice,setTotalPrice]=useState(0);
    let dispatch = useDispatch();
    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems));
        setTotalPrice(
            cartItems.reduce((total:number , item:ProductWithQuantity)=> {
            return total + (+item.price * item.quantity) } , 0 )
            )
    },[cartItems])

    
    
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

    let [activePayment , setActivePayment] = useState<string>('')
    

    let updateCreditCard = (e:any)=>{
        let eleS =  document.querySelectorAll('#cardUl li') as NodeListOf<HTMLUListElement>
        eleS.forEach(elem => elem.style.border='1px solid white')
        let ele =  document.querySelector(`[data-${e.target.value}]`) as HTMLElement
        ele.style.border = '1px solid black'
        
    }

    let showNotify = ()=>{
        let containerEle = document.querySelector('[data-notify]') as HTMLElement;
        containerEle.classList.add('notification')
        setTimeout(() => {
            containerEle.classList.remove('notification')
        }, 3000);
    }

    let [valid,setValid]= useState<boolean>(true);
    let [email , setEmail] = useState<string>('')
    let [phNumber , setPhNumber] = useState<string>('')
    let [nC , setNC] = useState<string>('')
    let [nameC , setNameC] = useState<string>('')
    let [cvv , setCvv] = useState<string>('')

    useEffect(()=>{
        if((email && phNumber && nC && nameC && cvv)!== ''){
            setValid(false)
        }
        else if((email && phNumber)!== '' && activePayment == 'cash'){
            setValid(false)
        }
        else{
            setValid(true)
        }
    },[email ,phNumber, nC , nameC , cvv , activePayment])
    return(
        <>
        <Head>
            <title>Checkout</title>
        </Head>
        <main id='checkoutMain' className={styles.checkoutMain}>
        { cartItems.length> 0 ?<> <h1>CHECK OUT</h1>
            <div className={styles.header}>
            <p><span data-enlang>All Products</span><span data-arlang>كل المنتجات</span></p>
            </div>
            <div className={styles.body}>
                <div className={styles.table}>
                    <div className={styles.tHead}>
                        <h1><span data-enlang>Name</span><span data-arlang>الإسم</span></h1>
                        <h1><span data-enlang>Quantity</span><span data-arlang>العدد</span></h1>
                        <h1><span data-enlang>Price</span><span data-arlang>السعر</span></h1>
                    </div>
                    <div className={styles.tBody}>
                    {cartItems.map((item : ProductWithQuantity, i:number)=>{
                        return(
                            <div className={styles.tItem} key={i}>
                                <p>{item.name}</p>
                                <div className={styles.tQuantity}>
                                    <button data-plus onClick={()=>add(item.id)} type="button">
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
                                    <button data-minus onClick={()=>minus(item.id, item.quantity)} type="button">
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
                                    </button></div>
                                <p>{item.price} ريال</p>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className={styles.total}>
                <div className={styles.totalPrice}>
                    <p> <span data-enlang>Total</span><span data-arlang>الإجمالي</span></p>
                    <h2>{totalPrice}</h2>
                </div>
                <div className={styles.discount}>
                    <p> <span data-enlang>Discount</span><span data-arlang>قيمة الخصم</span></p>
                    <h2>10%</h2>
                </div>
                <div className={styles.finalPrice}>
                    <p> <span data-enlang>Final Price</span><span data-arlang>السعر النهائي</span></p>
                    <h2>{totalPrice - (totalPrice * 0.1) }</h2>
                </div>
            </div>
            {!userName.user && 
            <div className={styles.toLoginPage}>
                <Link href='/login'>
                <a>
                    <button type="button"><span data-enlang>Continue process</span><span data-arlang>تابع عملية الشراء</span></button> 
                </a>
                </Link>
                
            </div> }
            {userName.user && <div className={styles.info}>
                <div className={styles.userNameDiv}>
                    <label><span data-enlang>username</span><span data-arlang>إسم المستخدم</span></label>
                    <h1>{userName.user?.displayName}</h1>
                </div>
                <label><span data-enlang>Address</span><span data-arlang>العنوان</span></label><br/>
                <input type='text' placeholder="enter your address" onChange={(e)=>setEmail(e.target.value)} required/><br/>
                <label><span data-enlang>Phone Number</span><span data-arlang>رقم الموبايل</span></label><br/>
                <input type='text' placeholder="enter your phone number" onChange={(e)=>setPhNumber(e.target.value)} required/>

                <div className={styles.payment}>
                <label><span data-enlang>Pay with</span><span data-arlang>الدفع بإستخدام</span></label>
                <div>
                    <input onClick={()=>setActivePayment('cash')} type='radio' id='cash' name='pay' value='Cash'/>
                    <label htmlFor="cash"><span data-enlang>Cash</span><span data-arlang>كاش</span></label>
                    {activePayment=='cash'&& <p style={{width:'100%', color:'red' , fontSize:'0.7rem' }}><span data-enlang>2% addons </span><span data-arlang>2% رسوم اضافيه</span></p>}
                </div>
                <div>
                    <input onClick={()=>setActivePayment('visa')} type='radio' id='visa' name='pay' value='Visa'/>
                    <label htmlFor="visa"><span data-enlang>Credit Card</span><span data-arlang>كارت إئتماني</span></label>
                </div>
                </div>
                {(activePayment=='visa')&&
                    <div className={styles.cardInfo} >
                        <ul id='cardUl'>
                            <li data-visa>
                                <input onClick={(e)=>updateCreditCard(e)} type='radio' id='payCard' name='payCard' value='visa'/>
                                <label htmlFor="payCard">VISA</label>
                            </li>
                            <li data-mastercard>
                                <input onClick={(e)=>updateCreditCard(e)} type='radio' id='payCard2' name='payCard' value='mastercard' />
                                <label htmlFor="payCard2">MASTER CARD</label>
                            </li>
                        </ul>
                        <div className={styles.cardNumbers}>
                            <input type='text' placeholder="enter name on card" onChange={(e)=>setNameC(e.target.value)}required/>
                            <input type='text' placeholder="enter card number" onChange={(e)=>setNC(e.target.value)} required/>
                            <input type='text' placeholder="enter CVV" onChange={(e)=>setCvv(e.target.value)} required/>
                        </div>
                    </div>
                }
                <button data-order onClick={showNotify} disabled={valid} type='button'>Order</button>
            </div>}
            <div  className={styles.requestSent}>
                <div data-notify className={styles.requestSentChild}>
                    <h1>Request has been Sent</h1>
                </div>
                
            </div>
            </> : <h1><span data-enlang>Your cart is empty</span><span data-arlang>السلة فارغة</span></h1>}
        </main> 
        </>
    )

}

export default CheckOut;