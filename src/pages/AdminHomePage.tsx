import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Button, TableHead, TableBody, AppBar, Toolbar, Typography } from '@mui/material';
import ItemsPage from './ItemPage';
import axios from 'axios';
import Item from '../Types/Item';
import CreateItemForm from '../components/CreateItemForm';
import ItemTable from '../components/ItemTable';


const AdminHomepage: React.FC = () => {

    const [selectedButtonId, setSelectedButtonId] = useState<string | null>('item-button');
    const [showCreateItemForm, setShowCreateItemForm] = useState(false);

    function handleButtonClick(event: any) {
        setSelectedButtonId(event.target.id)
    }

    function handleCreateItemButtonClick() {
        setShowCreateItemForm(true);
    }

    function handleCloseCreateItemForm() {
        setShowCreateItemForm(false);
    }


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
                <div>
                    <ItemTable />

                    <div className='w-full flex'>
                        <div className='my-3 mx-4'>
                            <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600" onClick={handleCreateItemButtonClick}>Create Item</button>
                        </div>
                        <div className='my-3'>
                            <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600">Edit selected Item</button>
                        </div>
                    </div>
                </div>



            )

            }
            {showCreateItemForm && (
                <CreateItemForm onClose={handleCloseCreateItemForm} />
            )}
        </Container>


    );
};

export default AdminHomepage;