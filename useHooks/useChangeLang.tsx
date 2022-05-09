import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useChangeLang = () =>{
    let lang = useSelector((state:RootState)=>state.lang)

    let updateLang = ()=>{
        let changerSpan = document.querySelector('[data-langchanger') as HTMLElement
        let langSpansEn = document.querySelectorAll('[data-enlang') as NodeListOf<HTMLElement>
        let langSpansAr = document.querySelectorAll('[data-arlang') as NodeListOf<HTMLElement>
        if(lang){
            document.documentElement.style.setProperty("--lang", "rtl");
            if(changerSpan)
            changerSpan.innerHTML = 'EN'
            langSpansAr.forEach((span:HTMLElement)=>{
                span.style.display = 'unset'
            })
            langSpansEn.forEach((span:HTMLElement)=>{
                span.style.display = 'none'
            })
        }
        if(!lang){
            document.documentElement.style.setProperty("--lang", "ltr");
            if(changerSpan)
            changerSpan.innerHTML = 'AR'
            langSpansAr.forEach((span:HTMLElement)=>{
                span.style.display = 'none'
            })
            langSpansEn.forEach((span:HTMLElement)=>{
                span.style.display = 'unset'
            })
        }
    }

    return { updateLang }

}

export default useChangeLang