import { useEffect, useState } from "react";
import Item from "../Types/Item";
import axios from "axios";

function ItemTable(){
    const [items, setItems] = useState<Item[]>([])
    const [isLoaded, setIsLoaded]=useState(false)
    
    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items")
        setItems(response.data)
        console.log(response)
    }

    useEffect(() => {
        if(!isLoaded){
            loadItems()
        }
    }, [isLoaded])

    
    

    return(
        <div className='mt-4'>
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Image
                    </th >
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item)=>(
                    <tr >
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td><img src={item.imageUrl} alt={item.name}></img></td>
                        <td>{item.category ? item.category.name : "N/A"}</td>
                    </tr>
                ))}
            </tbody>
        </table>

       

    </div>
    )
}

export default ItemTable;