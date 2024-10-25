import { useEffect, useState } from "react";
import Item from "../Types/Item";
import axios from "axios";
import Modal from 'react-modal';
import { Container } from '@mui/material';
import CategoryType from "../Types/CategoryType";

function ItemModel() {
    const [items, setItems] = useState<Item[]>([])
    const[categories, setCategories]=useState<CategoryType[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [showItemForm, setShowItemForm] = useState(false)
    const[showEditItemForm, setShowEditItemForm]=useState(false)

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState(0.0);
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [itemCategory, setItemCategory] = useState<number | null>(null);

    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items")
        setItems(response.data)
        console.log(response)
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/categories")
        console.log(response)
        setCategories(response.data)
    }
    

    useEffect(() => {
        if (!isLoaded) {
            loadItems()
            loadCategories()
        }
    }, [isLoaded])

    function handleRowClick(item: Item) {
        setSelectedItem(item); // Update the selected item when a row is clicked
        setItemName(item.name)
        setItemDescription(item.description)
        setItemPrice(item.price)
        setItemImageUrl(item.imageUrl)
        setItemCategory(item.category.id)

    }


    async function handleSubmit(){
        const data={
            name:itemName,
            description:itemDescription,
            price:itemPrice,
            imgUrl:itemImageUrl,
            categoryId:itemCategory
          }
      
          const response = await axios.post("http://localhost:8081/items",data)
          console.log(response.data)
          setShowItemForm(false)
          loadItems()
    }

    async function handleEditSubmit(){
        const data={
            name:itemName,
            description:itemDescription,
            price:itemPrice,
            imgUrl:itemImageUrl,
            categoryId:itemCategory
        }

        const response = await axios.post(`http://localhost:8081/items/${selectedItem?.id}`, data)
        console.log(response)

        setItemName("")
        setItemDescription("")
        setItemPrice(0.0)
        setItemImageUrl("")
        setItemCategory(0)
    }

    return (
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
                    {items.map((item) => (
                        <tr key={item.id}
                            className={selectedItem === item ? "bg-gray-200" : "hover:bg-slate-300 cursor-pointer"}
                            onClick={() => handleRowClick(item)}>

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

            <div>
                <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mr-4 mt-3" onClick={()=>setShowItemForm(true)}>Create Item</button>
            </div>
            <div>
                <Modal
                    isOpen={showItemForm}
                    onRequestClose={()=>setShowItemForm(false)}
                    className="modal fade"
                    overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
                    contentLabel="Create Item"

                ><Container className='justify-center items-center h-screen mt-10'>
                        <div className="modal-dialog">
                            <div className="modal-content bg-slate-100">
                                <div className="modal-header bg-slate-400 text-white flex">
                                    <h5 className="modal-title">Create Item</h5>
                                    <div className='items-end'>
                                        <button type="button" className="close text-white  hover:bg-slate-700" onClick={()=>setShowItemForm(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>

                                </div>

                                <div className="modal-body p-4">

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            id="itemName"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                            className="form-input w-full border rounded p-2 bg-slate-200"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemDescription">
                                            Description
                                        </label>
                                        <textarea
                                            id="itemDescription"
                                            value={itemDescription}
                                            onChange={(e) => setItemDescription(e.target.value)}
                                            className="form-input w-full border rounded p-2 bg-slate-200"
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemPrice">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="itemPrice"
                                            value={itemPrice}
                                            onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                                            className="form-input w-full border rounded p-2 bg-slate-200"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemImageUrl">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            id="itemImageUrl"
                                            value={itemImageUrl}
                                            onChange={(e) => setItemImageUrl(e.target.value)}
                                            className="form-input w-full border rounded p-2 bg-slate-200"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCategory">
                                            Category
                                        </ label>
                                        <select
                                            id="itemCategory"
                                            value={itemCategory || ''}
                                            onChange={(e) => setItemCategory(parseInt(e.target.value, 10))}
                                            className="form-select w-full border rounded p-2 bg-slate-200"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer bg-slate-400 text-white">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                        onClick={()=>setShowItemForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Modal>
            </div>

            {selectedItem && (
                <div>
                    {/* Add edit or delete buttons here, using the selectedItem state variable */}
                    <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mt-3" onClick={()=>setShowEditItemForm(true)}>Edit</button>
                    
                    {showEditItemForm && (
                        <div>
                        <Modal
                            isOpen={showEditItemForm}
                            onRequestClose={()=>setShowEditItemForm(false)}
                            className="modal fade"
                            overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
                            contentLabel="Create Item"
        
                        ><Container className='justify-center items-center h-screen mt-10'>
                                <div className="modal-dialog">
                                    <div className="modal-content bg-slate-100">
                                        <div className="modal-header bg-slate-400 text-white flex">
                                            <h5 className="modal-title">Create Item</h5>
                                            <div className='items-end'>
                                                <button type="button" className="close text-white  hover:bg-slate-700" onClick={()=>setShowEditItemForm(false)}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>
        
                                        </div>
        
                                        <div className="modal-body p-4">
        
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                                                    Item Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="itemName"
                                                    value={itemName}
                                                    onChange={(e) => setItemName(e.target.value)}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                            
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemDescription">
                                                    Description
                                                </label>
                                                <textarea
                                                    id="itemDescription"
                                                    value={itemDescription}
                                                    onChange={(e) => setItemDescription(e.target.value)}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                                                ></textarea>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemPrice">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="itemPrice"
                                                    value={itemPrice}
                                                    onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemImageUrl">
                                                    Image URL
                                                </label>
                                                <input
                                                    type="text"
                                                    id="itemImageUrl"
                                                    value={itemImageUrl}
                                                    onChange={(e) => setItemImageUrl(e.target.value)}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCategory">
                                                    Category
                                                </ label>
                                                <select
                                                    id="itemCategory"
                                                    value={itemCategory || ''}
                                                    onChange={(e) => setItemCategory(parseInt(e.target.value, 10))}
                                                    className="form-select w-full border rounded p-2 bg-slate-200"
                                                >
                                                    <option value="">Select a category</option>
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="modal-footer bg-slate-400 text-white">
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={()=>setShowEditItemForm(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={handleEditSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </Modal>
                    </div>

                    )}
                    <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mt-3">Delete</button>
                </div>
            )}



        </div>
    )
}

export default ItemModel;

