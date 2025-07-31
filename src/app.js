import React, { useState } from "react";
import "./app.css";

function App() {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProductInfo = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      const product = {
        title: data.data.title || "No Title",
        description: data.data.description || "No Description",
        image: data.data.image?.url || "",
        price: "Unknown", // Placeholder for price
        url,
      };

      setProducts([...products, product]);
      setUrl("");
    } catch (error) {
      console.error("Error fetching product info:", error);
    }
  };

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  return (
    <div className="app">
      <h1>🏍️ Motorcycle Budget Builder</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Paste product link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={fetchProductInfo}>Fetch Info</button>
      </div>

      <div className="products-container">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            {product.image && <img src={product.image} alt={product.title} />}
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
            <p className="price">{product.price}</p>
            <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;      
