import React, { useState } from "react";
import "./App.css";

function App() {
  const [gear, setGear] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: ""
  });

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.category) return;
    setGear([...gear, { ...newItem, price: parseFloat(newItem.price) }]);
    setNewItem({ name: "", price: "", category: "" });
  };

  const total = gear.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <h1>Motorcycle Gear Budget App</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Item Name"
        />
        <input
          name="price"
          value={newItem.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
        />
        <input
          name="category"
          value={newItem.category}
          onChange={handleChange}
          placeholder="Category (Helmet, Gloves, etc)"
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>Gear List</h2>
      <ul>
        {gear.map((item, index) => (
          <li key={index}>
            {item.name} (${item.price.toFixed(2)}) – {item.category}
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default App;
