import { ProductWithQuantity} from "../types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState , useRef} from "react";
import { useSelector , useDispatch } from "react-redux";
import { addToCart , removeFromCart } from "../redux/cartSlice";
import styles from '../styles/ProductCard.module.scss'
import QuickView from "./quickview";
import { RootState } from "../redux/store";


const ProductCard = ({id,img,name,price,bestseller,discount,quantity}:ProductWithQuantity)=> {

    let [mounted , setMounted] = useState(false);
    let cart = useSelector((state:RootState)=> state.cart)
    let dispatch = useDispatch();
    let[exist,setExist] = useState(false)
    
    useEffect(()=>{
        var isExist = cart.findIndex((item:any)=> item.id == id)
        if(isExist>-1)
        {
            setExist(true)
        }else{
            setExist(false)
        }
    },[id,cart])
    return(
        <div key={id} id={`${id}`} className={styles.productContainer}>
                <div className={styles.productImage}>
                    <Link href={`/store/${id}`}>
                        <a>
                        <Image src={img} alt="image" layout='fill' priority />
                        </a>
                    </Link>
                    
                    {bestseller && <button data-seller type="button"><span data-enlang>Best Seller</span><span data-arlang>الأكثر مبيعا</span> </button>}
                    <div className={styles.buttonGroup}>
                        <button data-view onClick={()=>{setMounted(true)}} type="button">
                        <span data-enlang>Quick View</span><span data-arlang>مشاهدة سريعة</span></button>
                        {exist ?
                            <button data-addtocart style={{backgroundColor:'#b7b7b7'}} onClick={()=>dispatch(removeFromCart(id))} type='button'>
                                <span data-enlang>remove</span><span data-arlang>إزالة</span></button>
                            :
                            <button data-addtocart onClick={()=>{dispatch(addToCart({id,img,name,price,bestseller,discount,quantity}))}} type='button'>
                                <span data-enlang>Add To Cart</span><span data-arlang>أضف إلي السلة</span></button>
                            }
                        
                    </div>
                    { mounted && <QuickView mounted={mounted} onClose={()=>setMounted(false)} key={id}
                    id={id} quantity={quantity} img={img} name={name} price={price} bestseller={bestseller} discount={discount} />}
                </div>
                <div className={styles.productDetails}>
                    <h4 title={name} >{name}</h4>
                    <h3>{price} $</h3>
                    <p><span data-enlang>Free Shipping</span><span data-arlang>الشحن مجانا</span></p>
                </div>
            </div>
    );

}

export default ProductCard