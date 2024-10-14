import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Button, TableHead, TableBody, AppBar, Toolbar, Typography } from '@mui/material';
import ItemsPage from './ItemPage';
import axios from 'axios';
import Item from '../Types/Item';
import CreateItemModal from '../components/itemForm';


const AdminHomepage: React.FC = () => {

    const [selectedButtonId, setSelectedButtonId] = useState<string | null>('item-button');

    const [items, setItems] = useState<Item[]>([])

    function handleButtonClick(event: any) {
        setSelectedButtonId(event.target.id)
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items")
        setItems(response.data)
        console.log(response)
    }

    function showItemForm(){
        return(
            <div>
                <CreateItemModal/>
            </div>
        )
    }

    useEffect(() => {
        loadItems
    }, [])

    return (

        <Container maxWidth="lg" className="mx-auto p-4">
            <AppBar position="static" className='rounded-md'>
                <Toolbar>
                    <Typography variant="h6" component="div" className="flex items-center">
                        <Link to="/admin/home" className="text-white mr-4">
                            Item Controll
                        </Link>
                    </Typography>
                    <div className="flex-grow"></div>
                    <div className="flex space-x-4">
                        <Button id='item-button' onClick={handleButtonClick} color="inherit">
                            Items
                        </Button>
                        <Button id='stock-button' onClick={handleButtonClick} color="inherit">
                            Stock
                        </Button>
                        <Button id='user-button' onClick={handleButtonClick} color="inherit">
                            Users
                        </Button>
                        <Button id='order-button' onClick={handleButtonClick} color="inherit">
                            Orders
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            {selectedButtonId === 'item-button' && (
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
                                    Image URL
                                </th>
                            </tr>
                        </thead>
                    </table>

                    <div className='w-full flex'>
                        <div className='my-3 mx-4'>
                            <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600" onClick={showItemForm}>Create Item</button>
                        </div>
                        <div className='my-3'>
                            <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600">Edit selected Item</button>
                        </div>
                    </div>

                </div>

            )

            }
        </Container>


    );
};

export default AdminHomepage;