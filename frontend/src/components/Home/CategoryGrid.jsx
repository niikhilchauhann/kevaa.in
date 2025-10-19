import "./heavenlyHaste.css"; 
import "./categoryGrid.css"; 
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import useCartStore from '../../store/cartStore';

import { products as allProducts } from '../../data/realProducts';
import ProductCard from '../Global/ProductCard';


export default function CategoryGrid() {
  const { loadCart } = useCartStore();
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const labelTabs = ["All", "Hot", "Sale", "New", "Save"];
  const sidebarCategories = [
    "All",
    "Poshaks",
    "Deepaks",
    "Attars",
    "Maala",
    "Foods",
    "Samagri",
  ];

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const filteredProducts = allProducts.categoryProducts.filter((product) => {
    const label = product.label?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const matchesLabel =
      selectedLabel.toLowerCase() === "all" ||
      label.includes(selectedLabel.toLowerCase());
    const matchesCategory =
      selectedFilterCategory.toLowerCase() === "all" ||
      category.includes(selectedFilterCategory.toLowerCase());
    return matchesLabel && matchesCategory;
  });

  return (
    <>
      <div className="initial-category">
        <div>
          {labelTabs.map((label) => (
            <span
              key={label}
              onClick={() => setSelectedLabel(label)}
              className={selectedLabel === label ? "active" : ""}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="category-section">
        <div className="sidebar">
          <div className="category-main">
            <div className="filters">
              <ul>
                {sidebarCategories.map((category) => (
                  <li
                    key={category}
                    onClick={() => setSelectedFilterCategory(category)}
                    className={
                      selectedFilterCategory === category ? "active" : ""
                    }
                  >
                    {category} <FaArrowRight />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="products">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More <FaArrowRight />
          </button>
        </div>
      )}
    </>
  );
}