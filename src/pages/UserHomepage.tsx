import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import CategoryType from '../Types/CategoryType';
import Item from '../Types/Item';

function UserHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // State for category dropdown visibility
  const [cartDropdownOpen, setCartDropdownOpen] = useState<boolean>(false); // State for cart dropdown visibility
  const [cart, setCart] = useState<Item[]>([]);

  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories");
    setCategories(response.data);
  }

  async function loadItems() {
    const response = await axios.get("http://localhost:8081/items");
    setItems(response.data);
  }

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  function addItemToCart(item: Item) {
    setCart(prevCart => [...prevCart, item]);
  }

  function handleCheckout() {
    // Handle checkout logic here
    console.log("Proceeding to checkout with items:", cart);
  }

  return (
    <div className="bg-white">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Online Shopping Store</h1>
        </div>
      </header>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4 bg-white p-2 shadow-md rounded-md">
          <button onClick={toggleDropdown} className="border p-2 bg-blue-500 text-white rounded-md">
            Categories ▼
          </button>
          <button onClick={toggleCartDropdown} className="border p-2 bg-green-500 text-white rounded-md">
            My Cart ▼
          </button>
        </div>

        {/* Categories Dropdown */}
        {dropdownOpen && (
          <div className="absolute bg-white border rounded-md shadow-md mt-2">
            <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => {
              // Load all items into cards
              setDropdownOpen(false);
            }}>All categories</div>
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}

        {/* Cart Dropdown */}
        {cartDropdownOpen && (
          <div className="absolute bg-white border rounded-md shadow-md mt-2">
            <div className="p-2 font-bold">Cart Items:</div>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                  {item.name} - ${item.price}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">Your cart is empty.</div>
            )}
            <div className="p-2">
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white rounded-md py-1 px-2 mt-2"
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="border p-2 bg-white shadow-md rounded-md">
              <div className="border p-4 mb-2 bg-gray -200 rounded-md">
                <img src={item.imageUrl} alt='Image not found'></img>
              </div>
              <div className="text-gray-700">{item.name}</div>
              <div className="text-gray-700">${item.price}</div>
              <button
                type='button'
                className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mt-3"
                onClick={() => addItemToCart(item)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;