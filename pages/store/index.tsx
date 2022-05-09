/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSidePropsContext, NextPage } from 'next';
import { product, ProductWithQuantity } from '../../types';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState , useRef } from 'react'
import ProductCard from '../../components/productCard';
import styles from '../../styles/Store.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useChangeLang from '../../useHooks/useChangeLang';


const Store:NextPage<{productsWithQuantity : ProductWithQuantity[]}>= ({productsWithQuantity}) => {
    //updating language
    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
    //end updating language

    //products array
    let [products , setProducts ]= useState<ProductWithQuantity[]>(productsWithQuantity);
    //minimum product value set 
    let [minRangeVal , setMinRangeVal] = useState<number>(()=>{
        let pro = products.reduce((prev,current)=>{
            return parseInt(prev.price) < parseInt(current.price) ? prev : current
        })
        
        return parseInt(pro.price)
    });
    //maximum product value set
    let [maxRangeVal , setMaxRangeVal] = useState<number>(()=>{
        let pro = products.reduce((prev,current)=>{
            return parseInt(prev.price) > parseInt(current.price) ? prev : current
        })
        
        return parseInt(pro.price)
    });

    //chosen min value set
    let [minimumVal , setMinimumVal ] = useState<number>(()=>{
        let pro = products.reduce((prev,current)=>{
            return parseInt(prev.price) < parseInt(current.price) ? prev : current
        })
        
        return parseInt(pro.price)
    });
    //chosen max value set
    let [maximumVal , setMaximumVal ] = useState<number>(()=>{
        let pro = products.reduce((prev,current)=>{
            return parseInt(prev.price) > parseInt(current.price) ? prev : current
        })
        
        return parseInt(pro.price)
    });

    //colored div
    let rangeRef = useRef<HTMLDivElement>(null)
    //min innerhtml val
    let minRef = useRef<HTMLDivElement>(null)
    //max innerhtml val
    let maxRef = useRef<HTMLDivElement>(null)
    //min range input val
    let minVal = useRef<HTMLInputElement>(null)
    //max range input val
    let maxVal = useRef<HTMLInputElement>(null)

    useEffect(()=>
    {
        if(rangeRef.current!==null)
        {
            rangeRef.current.style.left = ((minimumVal/ maxRangeVal)*100 ) + '%';
        }
        if(rangeRef.current!==null)
        {
            rangeRef.current.style.right = (100 - (maximumVal / maxRangeVal)*100 ) + '%';
        }
    },[minimumVal,maximumVal])

    //set min val onchange input
    let setLeftValue = ()=>
    {
        if(minRef.current!==null && minVal.current!==null )
        {
            setMinimumVal(Math.floor(Math.min(+minVal.current.value , maximumVal - 10000)));
            minRef.current.innerHTML = `${minimumVal} $`;
        }
    }

    //set max val onchange input
    let setRightValue = ()=>
    {
        if(maxRef.current!==null && maxVal.current!==null)
        {
            setMaximumVal(Math.floor(Math.max(+maxVal.current.value,minimumVal+10000)));
            maxRef.current.innerHTML = `${maximumVal} $`;
        }
    }

/*******************************************  HTML  ***********************************************************/
    return (
        <div className={styles.container}>
            <Head>
                <title>Store | Tasamem Online</title>
                <meta name="description" content="Tasamem Online تصاميم اونلاين" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className={styles.priceRange}>
                <label><span data-enlang>Price range</span><span data-arlang>نطاق السعر</span></label>
                <div className={styles.inputRange}>
                    <input id="left" className={styles.left} type="range" ref={minVal} onChange={setLeftValue} value={minimumVal} min={minRangeVal} max={maxRangeVal}/>
                    <input id="right" className={styles.right} type="range" ref={maxVal} onChange={setRightValue} value={maximumVal} min={minRangeVal} max={maxRangeVal}/>
                    <div data-range ref={rangeRef} className={styles.range}></div>
                </div>
                <div className={styles.priceValue}>
                    <span data-min ref={minRef} className={styles.min}>{minimumVal}</span>
                    <span data-max ref={maxRef} className={styles.max}>{maximumVal}</span>
                </div>
            </div>
            <div className={styles.products}>
                
            { products ? products.filter((ele:ProductWithQuantity)=>{
            if( minimumVal <= parseInt(ele.price) && maximumVal >= parseInt(ele.price))
            {
                return ele;
            }
            }).map(({id,quantity,img,name,price,bestseller,discount}:ProductWithQuantity)=>
            {
            return (
            
            <ProductCard key={id} quantity={quantity} id={id} img={img} name={name} price={price} bestseller={bestseller} discount={discount} />
            )}):""}
            </div>
        </div>
    )
}

export default Store;

export async function getServerSideProps(context:GetServerSidePropsContext){
    try{
        var fetchData = await fetch(`https://${context.req.headers.host}/api/data`);
    }catch(e){
        fetchData = await fetch(`http://${context.req.headers.host}/api/data`);
    }
    let res = await fetchData.json();
    let allProducts : product[] = await res.products
    let productsWithQuantity : ProductWithQuantity[] = allProducts.map((item)=>{
        return { ...item , quantity : 1}
    }) 
    return{
        props:{
            productsWithQuantity
        }
    }
}
