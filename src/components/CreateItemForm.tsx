import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CategoryType from '../Types/CategoryType';
import axios from 'axios';
import { Container } from '@mui/material';

interface CreateItemFormProps {
  onClose: () => void;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ onClose }) => {
  
  const [showModal, setShowModal] = useState(true);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemCategory, setItemCategory] = useState<number | null>(null);
  const [availableCategories, setAvailableCategories] = useState<CategoryType[]>([]);

  const handleCloseModal = () => setShowModal(false);

  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories");
    console.log(response);
    setAvailableCategories(response.data);
  }

  useEffect(() => {
      loadCategories()
  }, []);

  async function handleSubmit() {
    // Handle form submission here
    // console.log('Item Name:', itemName);
    // console.log('Item Description:', itemDescription);
    // console.log('Item Price:', itemPrice);
    // console.log('Item Image URL:', itemImageUrl);
    // console.log('Item Category:', itemCategory);

    const data={
      name:itemName,
      description:itemDescription,
      price:itemPrice,
      imgUrl:itemImageUrl,
      categoryId:itemCategory
    }

    const response = await axios.post("http://localhost:8081/items",data)
    console.log(response.data)


    // Reset form fields or perform other actions after submission
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal fade"
      overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
      contentLabel="Create Item"
      
    ><Container className='justify-center items-center h-screen mt-10'>
      <div className="modal-dialog">
        <div className="modal-content bg-slate-100">
          <div className="modal-header bg-slate-400 text-white flex">
            <h5 className="modal-title">Create Item</h5>
            <div className='items-end'>
            <button type="button" className="close text-white  hover:bg-slate-700" onClick={onClose}>
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
                onChange={(e) => setItemPrice(e.target.value)}
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
                {availableCategories.map((category) => (
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
              onClick={handleCloseModal}
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
  );
};

export default CreateItemForm;