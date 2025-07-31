import React, { useState } from "react";
import "./app.css";

function App() {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [manualPrice, setManualPrice] = useState("");

  const fetchProductInfo = async () => {
    try {
      const response = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(url)}&meta=true`
      );
      const data = await response.json();

      if (data.status === "success") {
        const meta = data.data;
        const newProduct = {
          title: meta.title || "Untitled Product",
          image: meta.image?.url || "",
          price:
            meta.price ||
            meta.data?.price ||
            meta.data?.product?.price ||
            "", // fallback: leave blank so we can show manual input
          url,
        };

        setProducts([...products, newProduct]);
        setManualPrice(""); // reset after add
        setUrl("");
      } else {
        alert("Failed to fetch product info.");
      }
    } catch (error) {
      console.error("Error fetching product info:", error);
      alert("An error occurred. Check the console for details.");
    }
  };

  const updateManualPrice = (index, value) => {
    const updated = [...products];
    updated[index].price = value;
    setProducts(updated);
  };

  return (
    <div className="app">
      <h1>🏍️ Motorcycle Budget Builder</h1>
      <input
        type="text"
        placeholder="Paste product link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchProductInfo}>Fetch Product Info</button>

      <div className="product-list">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            {product.image && (
              <img src={product.image} alt={product.title} />
            )}
            <h3>{product.title}</h3>
            <p>
              Price:{" "}
              {product.price ? (
                `$${product.price}`
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={manualPrice}
                    onChange={(e) => setManualPrice(e.target.value)}
                    onBlur={() => updateManualPrice(index, manualPrice)}
                  />
                </>
              )}
            </p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
