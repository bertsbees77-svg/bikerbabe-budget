import React, { useState } from "react";
import "./app.css";

function App() {
  const [products, setProducts] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [build, setBuild] = useState([]);

  const fetchProductData = async () => {
    if (!linkInput) return;

    try {
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(linkInput)}`
      );
      const result = await response.json();

      if (result.status === "success") {
        const data = result.data;
        const product = {
          title: data.title || "Unnamed Product",
          description: data.description || "",
          image: data.image?.url || "",
          price: data.price || "Unknown",
          category: "Uncategorized",
          link: linkInput,
        };
        setProducts((prev) => [...prev, product]);
        setLinkInput("");
      } else {
        alert("Failed to fetch product data.");
      }
    } catch (error) {
      alert("Error fetching data.");
      console.error(error);
    }
  };

  const addToBuild = (product) => {
    setBuild((prev) => [...prev, product]);
  };

  const removeFromBuild = (index) => {
    const updated = [...build];
    updated.splice(index, 1);
    setBuild(updated);
  };

  const totalBuildCost = () => {
    return build.reduce((acc, item) => {
      const num = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return acc + (isNaN(num) ? 0 : num);
    }, 0).toFixed(2);
  };

  return (
    <div className="app">
      <h1>🏍️ Motorcycle Budget Builder</h1>

      <div className="link-input">
        <input
          type="text"
          value={linkInput}
          placeholder="Paste product link..."
          onChange={(e) => setLinkInput(e.target.value)}
        />
        <button onClick={fetchProductData}>Fetch Product Info</button>
      </div>

      <div className="products">
        <h2>🛒 Products</h2>
        <div className="grid">
          {products.map((product, idx) => (
            <div className="card" key={idx}>
              {product.image && (
                <img src={product.image} alt={product.title} />
              )}
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <button onClick={() => addToBuild(product)}>Add to Build</button>
            </div>
          ))}
        </div>
      </div>

      <div className="build">
        <h2>🧰 Your Build</h2>
        <div className="grid">
          {build.map((item, idx) => (
            <div className="card" key={idx}>
              {item.image && <img src={item.image} alt={item.title} />}
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromBuild(idx)}>Remove</button>
            </div>
          ))}
        </div>
        <h3>Total: ${totalBuildCost()}</h3>
      </div>
    </div>
  );
}

export default App;
