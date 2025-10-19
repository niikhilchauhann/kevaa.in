import React, { useState, useEffect } from 'react';
import ProductCard from '../Global/ProductCard';
import useSearchStore from '../../store/searchStore';
import "./productList.css";

const ITEMS_PER_PAGE = 20;

const ProductList = ({ products, filters }) => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [sortOption, setSortOption] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setCurrentPage(1);

    const allProductArrays = [
      ...products.normal,
      ...products.dailyEssentials,
      ...products.popularProducts,
      ...products.havenlyHaste,
      ...products.categoryProducts,
    ];

    const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledProducts = shuffleArray(allProductArrays);

    const filtered = shuffledProducts.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStyle =
        (filters?.dressStyles ?? []).length === 0 || (filters?.dressStyles ?? []).includes(product.dressStyle);
      const matchCategory =
        (filters?.category ?? []).length === 0 || (filters?.category ?? []).includes(product.category);
      const matchColor =
        (filters?.colors ?? []).length === 0 || (filters?.colors ?? []).includes(product.color);
      const matchSize =
        (filters?.sizes ?? []).length === 0 || (filters?.sizes ?? []).includes(product.size);
      const matchPrice =
        product.price >= 50 && product.price <= (filters?.priceRange ?? 500);

      return matchSearch && matchStyle && matchCategory && matchColor && matchSize && matchPrice;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      if (sortOption === 'Rating') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      return 0; // Default: Most Popular
    });

    setFilteredProducts(sorted);
  }, [filters, products, sortOption, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="product-list-wrapper">
      <div className="product-list-header">
        <div className="left-info">
          <h2>
            {filters?.category?.length > 0 ? filters.category.join(', ') : "All Categories"} —{' '}
            {filters?.dressStyles?.length > 0 ? filters.dressStyles.join(', ') : "All Styles"}
          </h2>
        </div>
        <div className="right-sort">
          <span className="product-count">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} Products
          </span>
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products match your filters.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isVisible =
              page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;

            if (!isVisible && page === currentPage - 2) return <span key={page}>...</span>;
            if (!isVisible && page === currentPage + 2) return <span key={page + 'dots'}>...</span>;

            return isVisible ? (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ) : null;
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
