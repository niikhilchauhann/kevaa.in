import React, { useState } from 'react';
import "../../css/products/filters.css";
import { IoIosArrowUp } from "react-icons/io";

const Filters = ({ onApply }) => {

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [priceRange, setPriceRange] = useState(500);

    const [visibleFilters, setVisibleFilters] = useState({
        category: true,
        price: true,
        colors: true,
        sizes: true,
        styles: true
    });


    const toggleFilterGroup = (key) => {
        setVisibleFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const toggle = (value, list, setter) => {
        setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
    };

    const handleApply = () => {
        onApply({ category: selectedCategory, colors: selectedColors, sizes: selectedSizes, dressStyles: selectedStyles, priceRange });
    };

    const category = ['Maala', 'Poshaks', 'Kits', 'Diwali Special', 'Attars'];
  const colors = [
  'black', 'white', 'gray', 'silver', 'red', 'maroon',
  'orange', 'coral', 'gold', 'yellow', 'olive',
  'lime', 'green', 'teal', 'cyan', 'aqua',
  'blue', 'navy', 'skyblue', 'purple', 'indigo', 'violet',
  'pink', 'hotpink', 'deeppink', 'brown', 'chocolate',
  'beige', 'khaki', 'lavender', 'mintcream'
];

    const sizes = ['XX-Small','X-Small','Small', 'Medium', 'Large', 'X-Large', 'XX-large', 'XXX-Large'];
    const styles = ['Casual', 'Daily', 'Event','Festival'];


    return (
        <div className="filter-panel">
            <h2>Filters</h2>
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

            <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilterGroup('price')}>
                    <label>Price</label>
                    <span
                        className={`arrow-icon ${visibleFilters.price ? 'rotate-up' : 'rotate-down'}`}
                    >
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
                        <div className='range'>
                            <label>$50</label><label> ${priceRange}</label>
                        </div>
                    </>
                )}
            </div>
            <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilterGroup('colors')}>
                    <label>Colors:</label>
                    <span
                        className={`arrow-icon ${visibleFilters.colors ? 'rotate-up' : 'rotate-down'}`}
                    >
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

            <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilterGroup('sizes')}>
                    <label>Sizes:</label>
                    <span
                        className={`arrow-icon ${visibleFilters.sizes ? 'rotate-up' : 'rotate-down'}`}
                    >
                        <IoIosArrowUp />
                    </span>
                </div>
                {visibleFilters.sizes && (
                    <div className="options">
                        {sizes.map(s => (
                            <button key={s} className={selectedSizes.includes(s) ? 'selected' : ''} onClick={() => toggle(s, selectedSizes, setSelectedSizes)}>{s}</button>
                        ))}
                    </div>
                )}
            </div>

            <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilterGroup('styles')}>
                    <label>Dress Style:</label>
                    <span
                        className={`arrow-icon ${visibleFilters.styles ? 'rotate-up' : 'rotate-down'}`}
                    >
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



            <button className="apply-btn" onClick={handleApply}>Apply Filter</button>
        </div>
    );
};

export default Filters;