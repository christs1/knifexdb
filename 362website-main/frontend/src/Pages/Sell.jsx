import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import '../Pages/CSS/Sell.css';
import inventory from '../Components/Assets/Inventory'

const Sell = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [sellingItems, setSellingItems] = useState([])
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]);

    const addToSellingItems = (item) => {
        setSellingItems((prevItems) => [...prevItems, item]);
        inventory((prevInventory) =>
            prevInventory.filter((invItem) => invItem.id !== item.id)
        );
    };

    const removeFromSellingItems = (item) => {
        inventory((prevInventory) => [...prevInventory, item]);
        setSellingItems((prevItems) => prevItems.filter((sellItem) => sellItem.id !== item.id));
    };

    const handleSell = () => {
        // Implement the sell logic here
        // For now, we'll just clear the selling items
        setSellingItems([]);
    };

    return (
        <div className="sell-container">
            <h1>Sell Your Knives</h1>
            <div className="inventory-grid">
                <h2>Your Inventory</h2>
                <div className="inventory-items">
                    {inventory.map((item) => (
                        <div key={item.id} className="inventory-item">
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <button onClick={() => addToSellingItems(item)}>Sell</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="selling-grid">
                <h2>Selling</h2>
                <div className="selling-items">
                    {sellingItems.map((item) => (
                        <div key={item.id} className="selling-item">
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <button onClick={() => removeFromSellingItems(item)}>Remove</button>
                        </div>
                    ))}
                </div>
                {sellingItems.length > 0 && (
                    <button className="sell-button" onClick={handleSell}>Sell All</button>
                )}
            </div>
        </div>
    );
};

export default Sell;