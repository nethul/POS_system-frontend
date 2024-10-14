import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CategoryType from '../Types/CategoryType';
import axios from 'axios';


const CreateItemModal: React.FC = () =>{
  const [showModal, setShowModal] = useState(true);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemCategory, setItemCategory] = useState<number | null>(null);
  const [availableCategories, setAvailableCategories] = useState<CategoryType[]>([]);

  const handleCloseModal = () => setShowModal(false);

  async function loadCategories(){
    const response = await axios.get("http://localhost:8081/categories")
    console.log(response)
    setAvailableCategories(response.data)
  }

  useEffect(()=>{
    loadCategories
  },[])

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Item ID:', itemId);
    console.log('Item Name:', itemName);
    console.log('Item Description:', itemDescription);
    console.log('Item Price:', itemPrice);
    console.log('Item Image URL:', itemImageUrl);
    console.log('Item Category:', itemCategory);

    // Reset form fields or perform other actions after submission
    handleCloseModal();
  };

  return (

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modal fade"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
        contentLabel="Create Item"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Item</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemId">
                  Item ID
                </label>
                <input
                  type="text"
                  id="itemId"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className="form-input w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="form-input w-full border rounded p-2"
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
                  className="form-input w-full border rounded p-2"
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
                  className="form-input w-full border rounded p-2"
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
                  className="form-input w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCategory">
                  Category
                </label>
                <select
                  id="itemCategory"
                  value={itemCategory || ''}
                  onChange={(e) => setItemCategory(parseInt(e.target.value, 10))}
                  className="form-select w-full border rounded p-2"
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
            <div className="modal-footer">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    
  );
};

export default CreateItemModal;