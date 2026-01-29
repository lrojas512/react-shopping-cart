import React from "react";
import './InventoryList.css'

const InventoryList = ({ title, inventory, handleAddItem, handleRemoveItem }) => {
  return (
    <div className="inventory-list">
      <h2>{title}</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
            {handleAddItem ? (
              <button onClick={() => handleAddItem(item)}>Add Item</button>
            ) : (
              <button onClick={() => handleRemoveItem(item)}>Remove Item</button>
            ) }
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
