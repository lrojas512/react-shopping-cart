import { useState } from "react";
import "./Shop.css";
import { inventoryData } from "../../data/data";
import InventoryList from "../../components/InventoryList"; // This will automagically grab the index.jsx
// so we dont have to do InventoryList/InventoryList

const Shop = ({ name }) => {
  const [inventory, setInventory] = useState(inventoryData);
  const [userInventory, setUserInventory] = useState([]);
  const [message, setMessage] = useState("");

  const handleClearInventory = (event) => {
    console.log("Button Clicked");
    setUserInventory([]);
    setInventory(inventoryData);
  };

  const handleAddItem = (item) => {
    setMessage("");

    // Update the inventory to have 1 less of this item
    // If we don't have anymore of that item, the user should not be able to add to cart
    if (item.quantity === 0) {
      return setMessage(`We are currently out of stock on ${item.name}`);
    }

    setInventory(
      inventory.map((i) => {
        if (item._id === i._id) {
          return {
            ...i,
            quantity: i.quantity - 1,
          };
        }

        return i;
      }),
    );

    // If that item exist in the user inventory
    let newUserInventory;
    if (userInventory.findIndex((i) => i._id === item._id) !== -1) {
      newUserInventory = userInventory.map((i) => {
        if (i._id === item._id) {
          return {
            ...i,
            quantity: i.quantity + 1, // ++ tried to update state manually
          };
        } else {
          return i;
        }
      });
    } else {
      console.log("Im in your else statement the bug must me here");
      newUserInventory = [
        ...userInventory,
        {
          ...item,
          quantity: 1,
        },
      ];
    }
    // increment that items quantity
    // else
    // add that item to the user cart with a inventory of 1

    setUserInventory(newUserInventory);
    setMessage("Successfully added to cart");
  };

  const handleRemoveItem = (item) => {
    const itemToRemove = userInventory.findIndex((i) => i.name === item.name);
    const updatedItems = userInventory.filter((i, index) => {
      if (index !== itemToRemove) {
        return i;
      }
    });

    setUserInventory(updatedItems);
    console.log(itemToRemove);
  };

  return (
    <main>
      <h1>{name}</h1>
      <h2 style={{ color: "red" }}>{message}</h2>
      <button onClick={handleClearInventory}>Reset</button>
      <section className="shop-section">
        <InventoryList
          title="Shop Inventory"
          inventory={inventory}
          handleAddItem={handleAddItem}
        />
        <InventoryList
          title="User Inventory"
          inventory={userInventory}
          handleRemoveItem={handleRemoveItem}
        />
      </section>
      {/* <button onClick={handleClick}>Click her e</button>
      <button onClick={handleAddItem}>Add to Cart</button> */}
    </main>
  );
};

export default Shop;
