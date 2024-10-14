import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import CategoryType from '../Types/CategoryType';

function UserHomePage(){
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<CategoryType[]>([])

  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories")
    setCategories(response.data)
  }

 useEffect(()=>{
  loadCategories()
 },[])


  const menuItems = categories.map((category) => (
    <li key={category.name}>
      <Link
        to={"http://localhost:8081/categories/" + category.name}
        className={`${selectedCategory === category.name ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium`}
        onClick={() => setSelectedCategory(category.name)}
      >
        {category.name}
      </Link>
    </li>
  ));

  return (
    <div className="bg-white">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Online Shopping Store</h1>
          <nav className="mt-8">
            <ul className="flex flex-wrap justify-center">
              {menuItems}
            </ul>
          </nav>
        </div>
      </header>

      
    </div>
  );
};

export default UserHomePage;


