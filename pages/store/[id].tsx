/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import styles from '../../styles/Item.module.scss'

import { useSelector , useDispatch } from "react-redux"
import { addToCart , removeFromCart } from '../../redux/cartSlice'
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { product } from "../../types"
import Head from "next/head"
import ProductCard from "../../components/productCard"
type itemProps = {
    dataItem : string | product
}
const Item = ( {dataItem} : itemProps  )=>
{
    if(typeof dataItem == 'object' )
    var {id,img,name,price,bestseller,discount} = dataItem
    let cartItems = useSelector((state : RootState) => state.cart);
    let inCart = cartItems.findIndex(item => item.id == id);
    const dispatch = useDispatch();
    let [quantity , setQuantity] = useState<number>(1);
    let [itemInCart , setItemInCart] = useState(false);
    
    useEffect(()=>{
        
        if(inCart>=0){
            setItemInCart(true)
            setQuantity(cartItems[inCart].quantity)
        } 
        else{
            setItemInCart(false);
        }
    },[cartItems,inCart,dispatch])

    useEffect(()=>{
        if(quantity==0) {
            setQuantity(1);
            }
    },[quantity])
    
    //increase item 
    let add = ()=>{
        setItemInCart(false)
        setQuantity(quantity+1)
    }
    //decrease item
    let minus = ()=>{
        if(quantity==1)
        {
            return;
        }
        setItemInCart(false)
        setQuantity(quantity-1)
    }

    //CTA button
    let addItem = ()=>{
        setItemInCart(true);
        dispatch(addToCart({quantity,id,img,name,price,bestseller,discount}))
    }

    //if item doesn't exist
    if(typeof dataItem == 'string')
    {
        return(<h1 style={{textAlign:'center',fontSize:'4rem',color:'white'}}>
            <Head>
            <title>Not Found</title>
            </Head>
            {dataItem}</h1>)
    }
return(
    <>
    <Head>
        <title>{name}</title>
    </Head>
    <div className={styles.itemContainer}>
        <div className={styles.itemContentContainer}>
            <img src={img} alt='image' />
            <div className={styles.itemInfo}>
                <div className={styles.infoHead}>
                    <h1 title={name}>{name}</h1>
                    {bestseller && <span data-tag>Bestseller</span>}
                </div>
                <div>
                    <p>السعر :</p>
                    <p data-price>{price} $</p>
                    <div className={styles.count}>
                        <button onClick={()=>add()} type='button'>+</button>
                        <span>{quantity}</span>
                        <button onClick={()=>minus()} type='button'>-</button>
                    </div>
                    {itemInCart ?
                        <button data-add style={{backgroundColor:'#b7b7b7'}} onClick={()=>dispatch(removeFromCart(id))} type='button'>remove</button>
                        :
                        <button data-add onClick={addItem} type='button'>Add To Cart</button>
                    }
                </div>
            </div>
        </div>

        <div className={styles.productsContainer}>
            <div className={styles.productsNav}>
                <span>People also viewed</span>
                <span>more</span>
            </div>
            <div className={styles.products}>
                <ProductCard id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} quantity={quantity}/>
                <ProductCard id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} quantity={quantity}/>
                <ProductCard id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} quantity={quantity}/>
                <ProductCard id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} quantity={quantity}/>
            </div>
        </div>
    </div>
    </>
)
}
export default Item

export const getServerSideProps : GetServerSideProps = async (context:GetServerSidePropsContext)=>
{
    try{
        let id = context.params?.id as string
        try{
            var fetchData = await fetch(`https://${context.req.headers.host}/api/data/${id}`);
        }catch(e){
            fetchData = await fetch(`http://${context.req.headers.host}/api/data/${id}`);
        }
        
        var dataItem : product | string = await fetchData.json();
        
    }catch(e)
    {
        console.log(e)
        dataItem = 'Not Found'
    }
    return{
        props : { 
            dataItem
        }
    }
}