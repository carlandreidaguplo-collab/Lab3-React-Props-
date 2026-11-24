import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // cart state from Lab 3
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4 state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // debounce: wait 300ms after typing stops, then update debouncedSearch
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  const handleAddToCart = (title) => {
    setCount(count + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  // derived list: calculated during rendering, original array is not modified
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((product) => category === "All" || product.category === category);

  const displayedProducts = [...filteredProducts];
  if (sortOrder === "lowToHigh") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="app">
      <header>
        <h1>CvSU Mini Store</h1>
      </header>

      <p className="cart-message">
        {count === 0
          ? "Your cart is empty."
          : `Items added to cart: ${count} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {displayedProducts.length} of {products.length} products
      </p>

      <div className="grid">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {product.id === 2 && <span>New</span>}
            {product.id === 8 && <span>Sale</span>}
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;
