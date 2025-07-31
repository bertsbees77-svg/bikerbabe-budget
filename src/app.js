import React, { useState } from 'react';
import './app.css';

function App() {
  const [url, setUrl] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProductData = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&audio=false&video=false`);
      const data = await response.json();

      if (data.status === 'success') {
        const { title, description, image, url: productUrl } = data.data;

        const newProduct = {
          title: title || 'No title found',
          description: description || 'No description found',
          image: image?.url || '',
          url: productUrl || url,
          price: ''
        };

        setProducts(prev => [...prev, newProduct]);
        setUrl('');
      } else {
        alert('Failed to fetch data.');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      alert('Something went wrong. Please try again.');
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
      <div className="input-group">
        <input
          type="text"
          value={url}
          placeholder="Paste product URL here"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={fetchProductData}>Fetch</button>
      </div>

      <div className="product-list">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            {product.image && (
              <img src={product.image} alt={product.title} className="product-image" />
            )}
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
            <div className="price-section">
              <input
                type="text"
                placeholder="Enter price"
                value={product.price || ''}
                onChange={(e) => handlePriceChange(index, e.target.value)}
                inputMode="decimal"
              />
            </div>
            <button className="remove-btn" onClick={() => handleRemove(index)}>
              🗑️ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
