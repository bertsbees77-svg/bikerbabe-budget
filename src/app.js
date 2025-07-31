import React, { useState } from "react";
import "./app.css";

function app() {
  const [gear, setGear] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    link: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const fetchPreview = async () => {
    if (!newItem.link) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(newItem.link)}`
      );
      const data = await res.json();
      const meta = data.data;
      setNewItem((prev) => ({
        ...prev,
        name: meta.title || "",
        image: meta.image?.url || "",
        price: meta.price?.value || ""
      }));
    } catch (err) {
      console.error("Failed to fetch product info:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.category) return;
    setGear([...gear, { ...newItem, price: parseFloat(newItem.price) }]);
    setNewItem({
      name: "",
      price: "",
      category: "",
      image: "",
      link: ""
    });
  };

  const total = gear.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <h1>🏍️ Motorcycle Gear Budget App</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="link"
          value={newItem.link}
          onChange={handleChange}
          placeholder="Paste product link"
        />
        <button type="button" onClick={fetchPreview}>
          {isLoading ? "Fetching..." : "Fetch Product Info"}
        </button>

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
            <div>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px", marginBottom: "5px" }}
                />
              )}
              <strong>{item.name}</strong> (${item.price.toFixed(2)}) –{" "}
              {item.category}
              {item.link && (
                <div>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    View Product
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default app;
