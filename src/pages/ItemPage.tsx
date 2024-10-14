import React, { useState, useEffect } from'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    axios.get('/api/items')
     .then(response => {
        setItems(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCreateItem = () => {
    const newItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
    };
    axios.post('/api/items', newItem)
     .then(response => {
        setItems([...items, response.data]);
        setItemName('');
        setItemDescription('');
        setItemPrice(0);
      })
     .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateItem = (item: Item) => {
    setEditingItem(item);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      const updatedItem = {
       ...editingItem,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
      };
      axios.put(`/api/items/${editingItem.id}`, updatedItem)
       .then(response => {
          setItems(items.map(item => item.id === editingItem.id? updatedItem : item));
          setEditingItem(null);
          setItemName('');
          setItemDescription('');
          setItemPrice(0);
        })
       .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <Container maxWidth="lg" className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Items</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdateItem(item)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Create Item</h2>
        <TextField label="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <TextField label="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
        <TextField label="Price" value={itemPrice} onChange={(e) => setItemPrice(Number(e.target.value))} />
        <Button onClick={handleCreateItem}>Create</Button>
      </div>
      {editingItem && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Update Item</h2>
          <TextField label="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <TextField label="Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
          <TextField label="Price" value={itemPrice} onChange={(e) => setItemPrice(Number(e.target.value))} />
          <Button onClick={handleSaveItem}>Save</Button>
        </div>
      )}
    </Container>
  );
};

export default ItemsPage;
		