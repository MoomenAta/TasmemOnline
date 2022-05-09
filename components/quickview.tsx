/* eslint-disable @next/next/no-img-element */
import { quickView } from '../types';
import Image from 'next/image';
import { useEffect, useState , useRef} from 'react';
import {createPortal} from 'react-dom'
import styles from '../styles/QuickView.module.scss'

import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart , removeFromCart } from '../redux/cartSlice'
import useChangeLang from '../useHooks/useChangeLang';
import Link from 'next/link';

const QuickView : React.FC<quickView> = ({quantity,id,img,name,price,bestseller,discount, onClose}) =>
{
    let cart = useSelector((state : RootState)=> state.cart);
    let dispatch = useDispatch();
    let[exist,setExist] = useState(false)
    let modalRef = useRef<HTMLDivElement>(null)
    let modalContainerRef = useRef<HTMLDivElement>(null)
    if(typeof window !=='undefined')
    var ele : HTMLElement | null = document.querySelector('#modal')

    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

    /******************* Defining functions *****************/
    let close = async () =>
    {
        if(modalContainerRef.current !== null && modalRef.current !== null )
        {
            modalContainerRef.current.classList.remove('scale');
        }
        closeModal();
    }

    let closeModal = () => setTimeout(()=>{
            onClose();
        },500)

    let dataAdd = () =>
    {
        dispatch(addToCart({quantity,id,img,name,price,bestseller,discount}))
    }

    let dataRemove = () =>
    {
        dispatch(removeFromCart(id))
    }
    useEffect(()=>{
        var isExist = cart.findIndex((item:any)=> item.id == id)
        if(isExist>-1)
        {
            setExist(true)
        }else{
            setExist(false)
        }
    },[cart,id])

    /************************** End Functions definitions ************************** */

    useEffect(()=>
    {
        if(modalContainerRef.current !== null && modalRef.current !== null )
        {
            modalContainerRef.current.classList.add('scale');
        }
    })
    
    useEffect(()=>
    {
        document.addEventListener('click',(e:MouseEvent)=>
        {
            if(modalRef.current !==null && !modalRef.current?.contains(e.target as Node))
            {
                close();
            }
        })
    })

    
    return (
        createPortal(
            <div ref={modalContainerRef} className={styles.modal}>
                <div data-modal ref={modalRef} className={styles.container}>
                    <button data-close onClick={()=> close()} type='button'><span data-enlang>Close</span> <span data-arlang>إغلاق</span></button>
                    <div className={styles.imageContainer}>
                        <img src={img} alt='image' />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.titleprice}>
                            <h1 title={name}>{name}</h1>
                            <div className={styles.price}>
                                <p><span data-enlang>Price</span> <span data-arlang>السعر</span></p>
                                <p>{price} <span data-enlang>Ryal</span> <span data-arlang>ريال</span></p>
                            </div>
                            
                        </div>
                        <div className={styles.buttons}>
                            {exist ?
                            <button data-add onClick={dataRemove} type='button'><span data-enlang>remove</span> <span data-arlang>إزالة</span></button>
                            :
                            <button data-add onClick={dataAdd} type='button'><span data-enlang>Add To Cart</span> <span data-arlang>أضف الي السلة</span></button>
                            }
                            
                            <Link href={`/store/${id}`}>
                                <a>
                                    <button data-go type='button'><span data-enlang>Go to product</span> <span data-arlang>الذهاب الي المنتج</span></button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            , ele! )
        )
}

export default QuickView;