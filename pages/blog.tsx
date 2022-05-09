/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Blog.module.scss'
import { Posts } from '../types'
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/firebaseLoginSlice'
import useChangeLang from '../useHooks/useChangeLang'

type BlogProps = {
    posts : Posts[]
}

let useLocalStorage = (key:string,initValue:Posts[])=>{
    let [ allPosts , setPostsValue] = useState<Posts[]>(()=>{
        if (typeof window === "undefined") {
            return initValue;
        }
        try{
            let postsItems = window.localStorage.getItem(key);
            return postsItems? JSON.parse(postsItems) : initValue
        }catch(err){
            return initValue

        }
    });
    
    let setAllPosts = (value:Posts[])=>{
        setPostsValue(value)
    }
    return {allPosts , setAllPosts}
}

const Blog = ({ posts } : BlogProps) =>  {
    let router = useRouter();
    
    let {allPosts , setAllPosts} = useLocalStorage('allPosts',posts)
    let postInputRef = useRef<HTMLTextAreaElement>(null)
    let searchIconRef = useRef<HTMLElement>(null);
    let searchInputRef = useRef<HTMLInputElement>(null);
    let postImageRef = useRef<HTMLInputElement>(null)
    let dispatch = useDispatch();
    let [openedInput , setOpenedInput]= useState(false);
    let [postImage , setPostImage ] = useState<string>()

    const user = useSelector((state:RootState)=> state.loginUser.user );

    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
    
    useEffect(()=>{
        if(searchIconRef.current!== null)
        {
            searchIconRef.current.onclick = (e:Event)=>{
                if(!openedInput || searchInputRef.current?.value=='')
                {
                    e.preventDefault();
                    if(searchInputRef.current!== null)
                    {
                        searchInputRef.current.style.width = '100%';
                        searchInputRef.current.style.padding = '0.5rem';
                        searchInputRef.current.style.border= '1px solid palegoldenrod'
                    }
                    setOpenedInput(true);
                }else 
                {
                    setOpenedInput(false);
                    router.push(`http://localhost:3000/search=${searchInputRef.current?.value}`);
                }
            }
        }

        let removeScale = (e:Event)=>{
            if(!searchIconRef.current?.contains(e.target as HTMLElement)  && !searchInputRef.current?.contains(e.target as HTMLElement))
            {
                setOpenedInput(false);
                if(searchInputRef.current!== null)
                {
                    searchInputRef.current.style.width = '0';
                    searchInputRef.current.style.padding = '0';
                    searchInputRef.current.style.border= 'none'
                }
            }
        }
        document.addEventListener('click', removeScale)

        return ()=> document.removeEventListener('click', removeScale)
    })

    let addToPosts = ()=>{
        if(!postInputRef.current?.value){
            return;
        }
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var dateTime = new Date();
    var curDate : string = dateTime.getDate() +' '+ monthNames[dateTime.getMonth()] +' '+dateTime.getFullYear()
    setAllPosts([...allPosts ,
        {
            id:allPosts.length + 1 ,
            userImg:'/imgs/img2.webp',
            userName:user?.displayName!,
            date : curDate,
            postImg : postImage? `/imgs/${postImage}` : '/imgs/img2.webp',
            postTitle:`post${allPosts.length + 1}`,
            postDescribtion:postInputRef.current?.value!,
            comments:[],
            views:0,
            likes:0
        } ])
    }

    useEffect(()=>{
        localStorage.setItem('allPosts',JSON.stringify(allPosts))
    },[allPosts])

    let userLogOut = ()=>{
        dispatch(logout());
    }

    let setImage = ()=>{
        let str= postImageRef.current?.value;
        setPostImage(str?.slice(str?.lastIndexOf('\\')+1,str?.length))
    }
    let deletePost = (i:number)=>{
        setAllPosts(allPosts.filter((item,ind)=> ind!== i ))
    }

    return (
        <>
        <Head>
            <title>Blog | Tasmem Online</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.containerBlog}>
                {(user) ? <div className={styles.welcome}>
                    <div>
                        <p><span data-enlang>Welcome</span> <span data-arlang>مرحبا</span></p>
                        <h1>{user.displayName}</h1>
                    </div>
                    <span>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M2400 5114 c-322 -40 -591 -171 -815 -398 -199 -201 -313 -415 -372
                        -696 -24 -118 -24 -382 0 -500 59 -281 174 -496 372 -696 201 -203 421 -322
                        705 -381 117 -24 380 -24 502 0 270 54 494 174 694 372 202 199 322 421 381
                        705 24 118 24 382 0 500 -39 185 -110 356 -212 510 -63 95 -258 291 -351 352
                        -161 107 -335 180 -506 213 -81 16 -328 28 -398 19z m375 -423 c333 -87 594
                        -350 687 -691 33 -122 33 -338 0 -460 -93 -341 -350 -600 -687 -691 -118 -33
                        -346 -32 -465 0 -342 92 -599 347 -692 688 -31 112 -31 354 0 466 103 377 407
                        648 797 710 69 12 281 -2 360 -22z"/>
                        <path d="M2255 2014 c-16 -2 -66 -9 -110 -15 -478 -62 -943 -351 -1230 -764
                        -202 -289 -317 -641 -319 -975 -1 -115 1 -128 23 -163 13 -21 42 -50 64 -65
                        34 -23 52 -27 107 -27 55 0 73 4 107 27 70 46 84 81 95 229 15 219 60 394 148
                        569 197 395 562 672 1010 767 72 15 134 18 415 17 300 0 339 -2 426 -21 350
                        -79 644 -266 852 -542 171 -227 263 -482 285 -794 11 -145 28 -184 99 -228 57
                        -36 154 -34 210 3 59 39 85 87 91 166 10 141 -37 423 -100 601 -201 571 -680
                        1013 -1258 1161 -179 46 -233 51 -565 55 -176 2 -333 1 -350 -1z"/>
                        </g>
                        </svg>
                    </span>
                </div> : ''}
                {(user) ? <div className={styles.addPost}>
                    <textarea ref={postInputRef} placeholder='add your post'></textarea>
                    <div className={styles.postButtons}>
                        <div className={styles.file}>
                        <input type='file' accept="image/*,.pdf" ref={postImageRef} onChange={setImage} />
                            <div className={styles.chosenFile}>
                                <button type='button'> <span data-enlang>Choose post image</span> <span data-arlang>إختر الصورة</span></button>
                                <span>{ postImage ? postImage :'No chosen file'}</span>
                            </div>
                        </div>
                        <button onClick={addToPosts} type='button'><span data-enlang>Add Post</span> <span data-arlang>إضافة مقال</span></button>
                    </div>
                </div> : ''}
                <div className={styles.blogNav}>
                    <h4><span data-enlang>All Posts</span> <span data-arlang>كل المقالات</span></h4>
                    <div className={styles.blogSearchLogin}>
                        <div className={styles.search}>
                            <span ref={searchIconRef} data-searchicon id="searchSpan">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 183.792 183.792" xmlSpace="preserve">
                                <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
                                    c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
                                    c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
                                    C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
                                    c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
                                    c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"/>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                            </span>
                            <input ref={searchInputRef} data-searchinput id="searchInput" type="text" placeholder="search" />
                        </div>

                        {(user) ? <button onClick={()=> userLogOut()} type="button">
                        <span data-enlang>Logout</span> <span data-arlang>تسجيل خروج</span></button>
                            :   <Link href='/login'>
                                    <a style={{width:'44%'}}>
                                        <button style={{width:'100%'}} type="button">
                                        <span data-enlang>Log in/Sign up</span> <span data-arlang>إنضم لنا</span></button>
                                    </a>
                                </Link>
                        }
                    </div>

                </div>
                <div className={styles.postsContainer}>
                    {allPosts.map((post , i)=>{

                        return (
                            <div key={i} className={styles.post}>
                                <div className={styles.postImage}>
                                    <img src={post.postImg} alt="postImage" />
                                </div>
                                <div className={styles.postContent}>
                                    <div className={styles.contentHeader}>
                                        <div className={styles.userData}>
                                            <img src={post.userImg} alt="userImage"/>
                                            <div className={styles.userName}>
                                                <h4>{post.userName}</h4>
                                                <p>{post.date}</p>
                                            </div>
                                        </div>
                                        <div id="dotsMenu" className={styles.dotsMenu}>
                                            <span></span><span></span><span></span>
                                            <div className={styles.dotsMenuItems}>
                                                <p onClick={()=> deletePost(i)}>Delete</p>
                                            </div>
                                            </div>
                                        
                                    </div>
                                    <div className={styles.contentBody}>
                                        <h1>{post.postTitle}</h1>
                                        <p>{post.postDescribtion}</p>
                                    </div>
                                    <div className={styles.contentFooter}>
                                        <div className={styles.viewComment}>
                                            <span>{post.views} views </span>
                                            <span>{post.comments.length} comments</span>
                                        </div>
                                        <span>2 
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 471.701 471.701" /* style={enablBackground:"new 0 0 471.701 471.701"} */ xmlSpace="preserve">
                                            <g>
                                                <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                                    c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                                    l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                                    C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                                    s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                                    c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                                    C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                </div>
                    
            </div>
            
        </div>
        </>
    )
}
export default Blog;

export const getServerSideProps : GetServerSideProps = async () => {
    let getPosts = await fetch('http://localhost:3000/api/data');
    let res = await getPosts.json();
    let posts : Posts[] = res.posts;
    return {
        props : {
            posts : posts
        }
    }
}
