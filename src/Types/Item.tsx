import CategoryType from "./CategoryType"

interface Item{
    id:number,
    name:string,
    description:string,
    price:number,
    imageUrl:string,
    category: CategoryType
}

export default Item