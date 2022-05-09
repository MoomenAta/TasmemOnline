/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from '../styles/Login.module.scss'
import { LoginUsers } from "../types";

import { auth } from '../firebase.config';
import {
    signInWithPopup, FacebookAuthProvider,GoogleAuthProvider,GithubAuthProvider,
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithEmailAndPassword, 
    AuthProvider
    } from 'firebase/auth';
import { login } from '../redux/firebaseLoginSlice';
import Head from 'next/head';
import useChangeLang from '../useHooks/useChangeLang';
const fbprovider = new FacebookAuthProvider();
const goprovider = new GoogleAuthProvider();
const ghprovider = new GithubAuthProvider();

const Login = ()=>{
    let router = useRouter();
    let [userEmail , setUserEmail]=useState<string>('');
    let [userPassword , setUserPassword]=useState<string>('');
    let userEmailRef = useRef<HTMLInputElement>(null)
    let userPasswordRef = useRef<HTMLInputElement>(null)
    let [user,setUser] = useState<LoginUsers>({firstname:'',lastname:'',email:'',password:''})
    let dispatch = useDispatch();

    let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })

    // Register with email and password with firebase auth
    let registerToWebsite = ()=>{

        if (user.firstname== '' && user.lastname=='' ) {
            return alert('Please enter a full name');
        }

        createUserWithEmailAndPassword(auth , user.email , user.password)
        .then(userAuth=>{
            updateProfile(userAuth.user , {
                displayName : `${user.firstname} ${user.lastname}`
            }).then(()=>{dispatch(login({
                email: userAuth.user.email!,
                uid: userAuth.user.uid,
                displayName: `${user.firstname} ${user.lastname}`,
            }))
            router.push('/blog')
            })
        })
    }

    // login with email and password with firebase auth
    let loginToWebsite = () => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then(userAuth=>{
            dispatch(login({
                email : userAuth.user.email!,
                uid: userAuth.user.uid,
                displayName : userAuth.user.displayName!
            }))
            router.push('/blog')
        }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            //error message display
            derrormessage(errorCode);
        });
    }

    let derrormessage = (errorCode : string)=>{
        let loginForm = document.querySelector('[data-formlogin]') as HTMLElement;
        let errorEle : HTMLElement | null = document.getElementById('error')
        
        let errorP = document.createElement('p') as HTMLElement
        if(errorCode == 'auth/invalid-email')
        errorP.innerHTML = 'Invalid Email'
        else 
        errorP.innerHTML = 'Invalid Password'
        errorP.setAttribute('id','error');
        errorP.style.color = 'red'
        if(errorEle)
        loginForm.removeChild(errorEle);

        loginForm.appendChild(errorP);
    }

    let providersLogin = (providerName : AuthProvider , authProviderObj :any )=>{
        signInWithPopup(auth, providerName)
        .then((result) => {
            // This gives you a Provider Access Token. You can use it to access the Provider API.
            const credential = authProviderObj.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            dispatch(login({
                email : user.email!,
                uid: user.uid,
                displayName : user.displayName!
            }))
            router.push('/blog')
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = authProviderObj.credentialFromError(error);
            // ...
        });
    }

    useEffect(()=>{
        let allSpans = document.querySelectorAll('[data-target]') as NodeListOf<HTMLElement>
        allSpans.forEach((span)=>{
            span.onclick = ()=>{
                let targetName = span.dataset.target;
                document.querySelector(`.displayForm`)?.classList.remove('displayForm')
                document.querySelector(`.activeSpan`)?.classList.remove('activeSpan')
                span.classList.add('activeSpan')
                document.querySelector(`${targetName}`)?.classList.add('displayForm')
            }
        })
        let backSpan = document.querySelector(`[data-back]`) as HTMLElement; 
        backSpan.onclick = ()=>{
            window.history.go(-1); return false;
        }
    })

    return(
        <div className={styles.loginContainer}>
            <Head>
            <title>Join us | Tasmem Online</title>
            </Head>
            <div className={styles.imageContainer}>
                <img src="imgs/img5.webp" alt="login" />
            </div>
            
            <div className={styles.contentContainer}>
                <span data-back>back</span>
                <div className={styles.formsContainer}>
                    <div data-spans>
                        <span data-target='#login' className="activeSpan"  >Login</span>
                        <span data-target='#register' >Register</span>
                    </div>
                    <div data-form id='login' className='displayForm'>
                        <form data-formlogin >
                            <label>E-mail</label>
                            <input ref={userEmailRef} value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} type='email' placeholder="example@example.com" />
                            <label>Password</label>
                            <input ref={userPasswordRef} value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} type='password' placeholder="enter your password" />
                        </form>
                        <button data-loginbutton onClick={loginToWebsite} type="button">Login</button>
                    </div>
                    <div data-form id='register' >
                        <form data-formregister>
                            <label>First Name</label>
                            <input type='text' onChange={(e)=>setUser({...user,firstname:e.target.value})} placeholder="first name" />
                            <label>last Name</label>
                            <input type='text' onChange={(e)=>setUser({...user,lastname:e.target.value})} placeholder="last name" />
                            <label>E-mail</label>
                            <input type='email' onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="example@example.com" />
                            <label>Password</label>
                            <input type='password' onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="enter your password" />
                            <label>Confirm Password</label>
                            <input data-confirm type='password' placeholder="confirm password" />
                        </form>
                        <button onClick={registerToWebsite} type="button">Register</button>
                    </div>
                </div>
                <div className={styles.loginButtons}>
                    <span>OR</span>
                    <button data-github onClick={()=>providersLogin(ghprovider,GithubAuthProvider)} type="button">Join us with Github</button>
                    <button data-google onClick={()=>providersLogin(goprovider,GoogleAuthProvider)} type="button">Join us with Google</button>
                    <button data-facebook onClick={()=>providersLogin(fbprovider,FacebookAuthProvider)} type="button">Join us with Facebook</button>
                </div>
            </div>
        </div>
    )
}

Login.getLayout = function getLayout(page:ReactElement){
    return (
        <>
        {page}
        </>
    )
}

export default Login;