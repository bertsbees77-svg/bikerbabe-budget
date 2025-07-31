import React, { useState } from 'react';
import './app.css';

function App() {
  const [url, setUrl] = useState('');
  const [products, setProducts] = useState([]);

  const handleFetch = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`);
      const data = await response.json();

      if (data.status === 'success') {
        const { title, description, url: productUrl, image } = data.data;
        const product = {
          title,
          description,
          url: productUrl,
          image: image?.url || '',
          price: '',
        };
        setProducts([product, ...products]);
        setUrl('');
      } else {
        alert('Failed to fetch product info.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Something went wrong.');
    }
  };

  const handleRemove = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...products];
    updated[index].price = value;
    setProducts(updated);
  };

  return (
    <div className="app">
      <h1>Motorcycle Gear App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Paste product link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleFetch}>Fetch Product</button>
      </div>

      <div className="product-list">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            {product.image && <img src={product.image} alt={product.title} />}
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Product
            </a>

            {/* Editable Price */}
            {product.price ? (
              <p>💵 ${product.price}</p>
            ) : (
              <div className="price-input">
                <label>💵 Price:</label>
                <input
  type="text"
  placeholder="Enter price"
  value={products[index].price || ''}
  onChange={(e) => handlePriceChange(index, e.target.value)}
  inputMode="decimal"
/>
              </div>
            )}

            <button className="remove-button" onClick={() => handleRemove(index)}>
              🗑️ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
