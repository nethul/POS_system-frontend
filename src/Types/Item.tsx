import CategoryType from "./CategoryType"

interface Item{
    id:number,
    name:string,
    description:String,
    price:number,
    imageUrl:string,
    category: CategoryType
}

export default Item