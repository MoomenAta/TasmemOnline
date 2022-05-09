export type product = {
    id: number,
    name: string,
    price: string,
    img: string,
    bestseller: boolean,
    discount: boolean
}

export type ProductWithQuantity = product & {
    quantity: number,
}

export type quickView = ProductWithQuantity & {
    mounted:boolean ,
    onClose : ()=>void ,
}

export type Posts = {
    id:number,
    userImg:string,
    userName:string,
    date : string,
    postImg : string,
    postTitle:string,
    postDescribtion:string,
    comments:{}[],
    views:number,
    likes:number
}

export type LoginUsers = {
    email:string,
    password: string,
    firstname:string,
    lastname:string,
}
export type LoginUser = {
    email:string,
    uid: string,
    displayName:string,
}