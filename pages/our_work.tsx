/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Ourwork.module.scss'
import { useCallback, useEffect , useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import Head from 'next/head';
import useChangeLang from '../useHooks/useChangeLang';

export default function Our_work() {
  //updating language
  let { updateLang } = useChangeLang()
    useEffect(()=>{
        updateLang();
    })
  //end updating language

  //window innerwidth
  let [innerWidth , setInnerWidth] = useState<number>(()=>
  {
    var innerWidth:number = 0;
    if(typeof window !=='undefined')
    {
      innerWidth = (window.innerWidth);
    }
    return innerWidth;
  });
  //get canvas to draw in
  let canvasEle = useRef<HTMLCanvasElement>(null)
  if(typeof window !=='undefined') 
  {
    //on resize update width and height depending on window innerwidth
    window.addEventListener('resize',()=> setInnerWidth(window.innerWidth));
  }

  //images array from getimage function 
  let [ data , setData ] = useState<string[]>([])
  //pdf url
  let url = '/pdf/allproducts.pdf';
  //function to get images codes
  let getImgData = useCallback(async ()=>
  {
    console.log('once')
    let dataItems : string[] = [];
    var loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then(async(pdf:any)=>{
    let totalPageNum = pdf.numPages;
    for(let i = 1 ; i <= totalPageNum ; i++)
    {
      let getRenderedPage = await pdf.getPage(i).then(async (page:any) =>
      {
        let scale = 1;
        let viewport = page.getViewport({scale : scale});
        let subCanvas = document.createElement('canvas');
        let context = subCanvas.getContext('2d');
        subCanvas.height = viewport.height;
        subCanvas.width = viewport.width;
        let renderContext = {canvasContext: context, viewport: viewport};
        var renderedPage = await page.render(renderContext).promise.then(()=>
        {
          return subCanvas.toDataURL();
        });
        return renderedPage;
      })
      dataItems.push(getRenderedPage);
    }
    }).then(()=>{
        setData(dataItems);
      })
  },[url])
  //function to print image in its cell
  let printImage = (canvasEle:any,img:object,cell:number,x:number,y:number,row:number)=>
  {
    var ctx = canvasEle.getContext("2d");
    var pat : CanvasPattern = ctx.createPattern(img,"no-repeat");
    let controlX = 0;
    if(row%2 == 1)
    controlX = x/2;

    let controlY = y*row/4;
    pat.setTransform({
      a: (x * 0.48 / 250), // Horizontal scaling. A value of 1 results in no scaling.
      b: 0,   // Vertical skewing.
      c: 0,   // Horizontal skewing.
      d: (y * 0.48 / 300), // Vertical scaling. A value of 1 results in no scaling.
      e: (cell*x) + controlX,   // Horizontal translation (moving).
      f: (row * y) - controlY    // Vertical translation (moving).
    });
    
    ctx?.beginPath();
    ctx.moveTo( ((cell) * (x) + ( x / 2 )) + controlX , (row * y) - controlY); 
    ctx?.lineTo( ((cell+1) * x) + controlX , ((row * y ) + (y/4)) - controlY);
    ctx?.lineTo( ((cell+1)* x) + controlX , ((row * y ) + (y*3/4)) - controlY);
    ctx?.lineTo( ((cell) * (x) + ( x / 2 )) + controlX , ((row * y) + y) - controlY );
    ctx?.lineTo( (cell * x) + controlX , ((row * y) + (y*3/4)) - controlY); 
    ctx?.lineTo( (cell * x ) + controlX ,( (row * y ) + (y/4)) - controlY); 
    ctx?.closePath();
    ctx.fillStyle = pat;
    ctx?.fill();
    ctx.strokeStyle = '#fdfdfd';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.save();
  }

  //function to make the big shape that contains images cells 
  let makeShape = ()=>
  {
    var x = (innerWidth - innerWidth/3)/4;
    var y = ((innerWidth - innerWidth/3)/4) + (((innerWidth - innerWidth/3)/4)*0.02);
    var currentIndex = 0;
    var row = 0;
    var cells:number = 4;

    while(currentIndex < data.length)
    {
      if(row%2 == 0)
      {
        cells = 4
      }
      if(row%2 == 1)
      {
        cells = 3 
      }
      for(let cell = 0 ; cell < cells ; cell++)
      {
        if(currentIndex >= data.length) return;
        
        let ind = currentIndex;
        var img = new Image();
        img.src = data[ind];
        const toPrint = (cRow:number)=>
        {
          img.addEventListener('load',()=>
          {
            printImage(canvasEle.current,img,cell,x,y,cRow)
          })
        }
        toPrint(row)
        currentIndex++;
      }
      row++;
    }
  }

  useEffect(()=>{
    getImgData();
  },[getImgData])

  let [canvasWidth , setCanvasWidth] = useState<number>(1424)
  let [canvasHeight , setCanvasHeight] = useState<number>(1777)
  useEffect(()=>
  {
    setCanvasWidth(innerWidth - innerWidth/3);
    setCanvasHeight((innerWidth - innerWidth/3) + ((innerWidth - innerWidth/3) *0.25 ))
  },[innerWidth])

  useEffect(()=>
  {
    makeShape();
  })
  


  return (
    <>
    <Head>
      <title>Our Work | Tasmem Online</title>
    </Head>
    <div className={styles.containerAll}>
      <div className={styles.sectionOne}>
          <a href="/pdf/a36e6758-49f0-47fe-b78d-6145cf9d5774.pdf" target='_blank'>
            <span>
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M980 5109 c-160 -31 -299 -173 -330 -339 -14 -73 -14 -4347 0 -4420
              32 -170 170 -308 339 -340 74 -14 3069 -14 3141 0 170 32 308 170 340 339 6
              35 10 683 10 1833 0 1563 -2 1784 -15 1812 -20 42 -1082 1102 -1118 1115 -35
              14 -2300 13 -2367 0z m2220 -533 c0 -183 5 -358 10 -387 32 -169 170 -307 340
              -339 29 -5 203 -10 386 -10 l334 0 0 -1705 c0 -1218 -3 -1719 -11 -1756 -16
              -74 -84 -142 -158 -158 -74 -16 -3008 -16 -3082 0 -74 16 -142 84 -158 158
              -16 74 -16 4288 0 4362 15 69 85 143 150 157 27 6 458 10 1117 11 l1072 1 0
              -334z m673 -524 c-296 -3 -328 3 -393 67 -64 64 -70 96 -70 394 l0 242 350
              -350 350 -350 -237 -3z"/>
              <path d="M2347 3396 c-126 -47 -190 -152 -207 -341 -18 -188 37 -347 204 -587
              l50 -70 -63 -192 c-80 -243 -160 -458 -174 -472 -7 -6 -131 -69 -277 -139
              -315 -151 -427 -215 -498 -285 -64 -63 -92 -115 -99 -186 -20 -188 240 -330
              439 -241 190 85 390 306 561 618 l36 65 123 42 c143 48 301 90 480 128 l127
              27 68 -50 c112 -82 183 -128 270 -173 76 -40 89 -44 152 -42 90 1 138 15 197
              55 60 40 95 106 102 192 11 142 -59 228 -216 265 -75 17 -288 15 -402 -4 -52
              -9 -100 -16 -107 -16 -32 0 -304 250 -429 396 l-51 59 43 140 c83 265 97 335
              91 465 -7 178 -51 275 -147 329 -35 20 -61 25 -139 28 -66 2 -108 -1 -134 -11z
              m185 -226 c24 -33 35 -165 19 -240 -6 -30 -26 -104 -43 -163 -36 -123 -34
              -123 -90 -12 -51 99 -68 161 -68 244 0 93 14 146 46 178 34 34 108 30 136 -7z
              m162 -1104 l136 -133 -61 -12 c-34 -7 -123 -30 -198 -51 -75 -21 -137 -37
              -138 -36 -3 3 118 366 122 366 2 0 64 -60 139 -134z m888 -266 c38 -11 51 -29
              41 -57 -9 -26 -23 -33 -67 -33 -38 0 -123 38 -176 80 l-25 20 95 0 c52 0 111
              -5 132 -10z m-1618 -412 c-24 -42 -115 -146 -178 -205 -113 -106 -182 -132
              -262 -98 l-35 15 17 30 c10 16 38 44 63 62 43 31 378 207 394 208 5 0 5 -6 1
              -12z"/>
              </g>
              </svg>
            </span>
            <h1>PDF FILE</h1>
            </a>
      </div>
      <div data-canvascontainer className={styles.canvasContainer}>
          <canvas data-canvas id="canvas" ref={canvasEle} className={styles.canvas} width={canvasWidth} height={canvasHeight}></canvas>
      </div>
    </div>
    </>
  )
}
