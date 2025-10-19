import React, { useState } from 'react';
import "./filters.css";
import { IoIosArrowUp } from "react-icons/io";

const Filters = ({ onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [availability, setAvailability] = useState(null); // 'in' | 'out' | null

  const [visibleFilters, setVisibleFilters] = useState({
    category: true,
    price: true,
    colors: true,
    sizes: true,
    styles: true,
    rating: true,
    availability: true
  });

  const toggleFilterGroup = (key) => {
    setVisibleFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggle = (value, list, setter) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const handleApply = () => {
    onApply({
      category: selectedCategory,
      colors: selectedColors,
      sizes: selectedSizes,
      dressStyles: selectedStyles,
      priceRange,
      rating: selectedRatings,
      availability
    });
  };

  const resetFilters = () => {
    setSelectedCategory([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setSelectedRatings([]);
    setAvailability(null);
    setPriceRange(500);
    onApply({});
  };

  const category = ['Maala', 'Poshaks', 'Kits', 'Diwali Special', 'Attars'];
  const colors = [
    'black', 'white', 'gray', 'silver', 'red', 'maroon', 'orange', 'coral', 'gold',
    'yellow', 'olive', 'lime', 'green', 'teal', 'cyan', 'aqua', 'blue', 'navy',
    'skyblue', 'purple', 'indigo', 'violet', 'pink', 'hotpink', 'deeppink',
    'brown', 'chocolate', 'beige', 'khaki', 'lavender', 'mintcream'
  ];
  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-large', 'XXX-Large'];
  const styles = ['Casual', 'Daily', 'Event', 'Festival'];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      {/* Category */}
      <div className="filter-group">
        <div className="category-list">
          {category.map(c => (
            <div
              key={c}
              className={`category-item ${selectedCategory.includes(c) ? 'selected' : ''}`}
              onClick={() => toggle(c, selectedCategory, setSelectedCategory)}
            >
              <span className="category-text">{c}</span>
              <span className="category-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('price')}>
          <label>Price</label>
          <span className={`arrow-icon ${visibleFilters.price ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.price && (
          <>
            <input
              type="range"
              min="50"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-range"
            />
            <div className="range">
              <label>₹20</label>
              <label>₹{priceRange}</label>
            </div>
          </>
        )}
      </div>

      {/* Colors */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('colors')}>
          <label>Colors</label>
          <span className={`arrow-icon ${visibleFilters.colors ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.colors && (
          <div className="colors">
            {colors.map(c => (
              <span
                key={c}
                className={`color-swatch ${selectedColors.includes(c) ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => toggle(c, selectedColors, setSelectedColors)}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('sizes')}>
          <label>Sizes</label>
          <span className={`arrow-icon ${visibleFilters.sizes ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.sizes && (
          <div className="options">
            {sizes.map(s => (
              <button
                key={s}
                className={selectedSizes.includes(s) ? 'selected' : ''}
                onClick={() => toggle(s, selectedSizes, setSelectedSizes)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Styles */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('styles')}>
          <label>Dress Style</label>
          <span className={`arrow-icon ${visibleFilters.styles ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.styles && (
          <div className="style-list">
            {styles.map(s => (
              <div
                key={s}
                className={`style-item ${selectedStyles.includes(s) ? 'selected' : ''}`}
                onClick={() => toggle(s, selectedStyles, setSelectedStyles)}
              >
                <span className="style-text">{s}</span>
                <span className="style-arrow">→</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('rating')}>
          <label>Rating</label>
          <span className={`arrow-icon ${visibleFilters.rating ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.rating && (
          <div className="options">
            {ratings.map(r => (
              <button
                key={r}
                className={selectedRatings.includes(r) ? 'selected' : ''}
                onClick={() => toggle(r, selectedRatings, setSelectedRatings)}
              >
                {r}★ & up
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="filter-group">
        <div className="filter-header" onClick={() => toggleFilterGroup('availability')}>
          <label>Availability</label>
          <span className={`arrow-icon ${visibleFilters.availability ? 'rotate-up' : 'rotate-down'}`}>
            <IoIosArrowUp />
          </span>
        </div>
        {visibleFilters.availability && (
          <div className="options">
            <button
              className={availability === 'in' ? 'selected' : ''}
              onClick={() => setAvailability(availability === 'in' ? null : 'in')}
            >
              In Stock
            </button>
            <button
              className={availability === 'out' ? 'selected' : ''}
              onClick={() => setAvailability(availability === 'out' ? null : 'out')}
            >
              Out of Stock
            </button>
          </div>
        )}
      </div>

      <div className="filter-buttons">
        <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
        <button className="reset-btn" onClick={resetFilters}>Reset</button>
      </div>
    </div>
  );
};

export default Filters;
