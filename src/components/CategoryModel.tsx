import { useEffect, useState } from "react";
import CategoryType from "../Types/CategoryType";
import axios from "axios";
import Modal from 'react-modal';
import { Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CategoryModel() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const[isLoaded, setIsLoaded]=useState(false)

    const [categoryName, setCategoryName] = useState("")

    useEffect(()=>
    {
        if(!isLoaded){
            loadCategories()
        }
        
    },[isLoaded])

    async function loadCategories() {
        const response = await axios.get('http://localhost:8081/categories');
        setCategories(response.data);
        console.log(response);

    }

    function handleRowClick(category: CategoryType) {
        setSelectedCategory(category);
        setShowEditDeleteButtons(true);
        
    }

    async function handleSubmit() {
        const data = {
            name: categoryName
        }
        const response = await axios.post("http://localhost:8081/categories", data)
        console.log(response)
        setCategoryName(""); // Clear the input field after submission
        setShowCategoryForm(false); // Close the modal after submission
        loadCategories();
    }

    function handleCreateCategoryButtonClick(){
        setShowCategoryForm(true)
        setSelectedCategory(null)
    }

    function handleEditCategory(){
        setShowCategoryForm(true);
    }

    async function handleCategoryDelete(){
        const response = await axios.delete(`http://localhost:8081/categories/${selectedCategory?.id}`)
        console.log(response)
        loadCategories()
        toast.success("Category deleted Successfully")
    }

    return (
        <div className='mt-4'>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}
                            className={ selectedCategory === category ? "bg-gray-200" : "hover:bg-slate-300 cursor-pointer"}
                
                            onClick={() => handleRowClick(category)}>

                            <td>{category.name}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 mt-4 hover:bg-slate-600" onClick={handleCreateCategoryButtonClick}>Create Category</button>
                {showCategoryForm && (
                    <div>
                        <Modal
                            isOpen={showCategoryForm}
                            onRequestClose={()=>{setShowCategoryForm(false)}}
                            className="modal fade"
                            overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
                            contentLabel="Create Category"

                        ><Container className='justify-center items-center h-screen mt-10'>
                                <div className="modal-dialog">
                                    <div className="modal-content bg-slate-100">
                                        <div className="modal-header bg-slate-400 text-white flex">
                                            <h5 className="modal-title">Create Category</h5>
                                            <div className='items-end'>
                                                <button type="button" className="close text-white  hover:bg-slate-700" onClick={() => (setShowCategoryForm(false))}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="modal-body p-4">

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="categoryName"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                                                />
                                            </div>

                                        </div>
                                        <div className="modal-footer bg-slate-400 text-white">
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={() => (setShowCategoryForm(false))}
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
                )}

                {showEditDeleteButtons &&  (
                    <div>
                        <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 mt-4 mr-5 hover:bg-slate-600" onClick={handleEditCategory}>Edit Category</button>
                        {showCategoryForm && (
                    <div>
                        <Modal
                            isOpen={showCategoryForm}
                            onRequestClose={()=>{setShowCategoryForm(false)}}
                            className="modal fade"
                            overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
                            contentLabel="Edit Category"

                        ><Container className='justify-center items-center h-screen mt-10'>
                                <div className="modal-dialog">
                                    <div className="modal-content bg-slate-100">
                                        <div className="modal-header bg-slate-400 text-white flex">
                                            <h5 className="modal-title">Edit Category Category</h5>
                                            <div className='items-end'>
                                                <button type="button" className="close text-white  hover:bg-slate-700" onClick={() => (setShowCategoryForm(false))}>
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
                                                    id="categoryName"
                                                    value={name}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                    className="form-input w-full border rounded p-2 bg-slate-200"
                                                />
                                            </div>

                                        </div>
                                        <div className="modal-footer bg-slate-400 text-white">
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={() => (setShowCategoryForm(false))}
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
                )}
                        <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 mt-4 hover:bg-slate-600 " onClick={handleCategoryDelete}>Delete Category</button>
                    </div>
                )}

            </div>
            <ToastContainer />
        </div>
    )
}

export default CategoryModel;