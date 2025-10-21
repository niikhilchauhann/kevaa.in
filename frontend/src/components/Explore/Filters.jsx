import React, { useMemo, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./filters.css"

export default function Filters({ onApply }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [price, setPrice] = useState(500);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [open, setOpen] = useState({
    category: false,
    price: true,
    colors: false,
    sizes: false,
    styles: false,
    rating: false,
    availability: false,
  });

  const categories = ["Maala", "Poshaks", "Kits", "Diwali Special", "Attars"];
  const colors = [
    "black", "white", "gray", "silver", "red", "maroon", "orange", "coral", "gold",
    "yellow", "olive", "lime", "green", "teal", "cyan", "aqua", "blue", "navy",
    "skyblue", "purple", "indigo", "violet", "pink", "hotpink", "deeppink",
    "brown", "chocolate", "beige", "khaki", "lavender", "mintcream",
  ];
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const styles = ["Casual", "Daily", "Event", "Festival"];
  const ratings = [5, 4, 3, 2, 1];

  const toggleListVal = (value, list, setter) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleApply = () => {
    onApply?.({ category: selectedCategory, colors: selectedColors, sizes: selectedSizes, dressStyles: selectedStyles, priceRange: price, rating: selectedRatings, availability });
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setSelectedRatings([]);
    setAvailability(null);
    setPrice(500);
    onApply?.({});
  };

  const anyActive = useMemo(
    () => selectedCategory.length || selectedColors.length || selectedSizes.length || selectedStyles.length || selectedRatings.length || availability !== null || price !== 500,
    [selectedCategory, selectedColors, selectedSizes, selectedStyles, selectedRatings, availability, price]
  );

  return (
    <div className="filter-panel" role="region" aria-label="Product Filters">

      <div className="panel-head">
        <h2 className="heading">Filters</h2>
        {anyActive && (
          <button type="button" className="text-btn" onClick={handleReset}>Reset all</button>
        )}
      </div>

      <Accordion id="category" label="Category" open={open.category} onToggle={() => setOpen(p => ({ ...p, category: !p.category }))} badge={selectedCategory.length || undefined}>
        <div className="list">
          {categories.map((c) => (
            <div key={c} className={`item ${selectedCategory.includes(c) ? 'active' : ''}`} onClick={() => toggleListVal(c, selectedCategory, setSelectedCategory)}>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion id="price" label="Price" open={open.price} onToggle={() => setOpen(p => ({ ...p, price: !p.price }))} badge={`₹${price}`}>
        <div className="range-box">
          <input type="range" min={50} max={500} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="range" />
          <div className="range-values"><span>₹50</span><span>₹{price}</span></div>
        </div>
      </Accordion>

      <Accordion id="colors" label="Colors" open={open.colors} onToggle={() => setOpen(p => ({ ...p, colors: !p.colors }))} badge={selectedColors.length || undefined}>
        <div className="swatches">
          {colors.map((c) => (
            <button key={c} className={`swatch ${selectedColors.includes(c) ? 'active' : ''}`} style={{ backgroundColor: c }} onClick={() => toggleListVal(c, selectedColors, setSelectedColors)} />
          ))}
        </div>
      </Accordion>

      <Accordion id="sizes" label="Sizes" open={open.sizes} onToggle={() => setOpen(p => ({ ...p, sizes: !p.sizes }))} badge={selectedSizes.length || undefined}>
        <div className="chips">
          {sizes.map((s) => (
            <button key={s} className={`chip ${selectedSizes.includes(s) ? 'active' : ''}`} onClick={() => toggleListVal(s, selectedSizes, setSelectedSizes)}>{s}</button>
          ))}
        </div>
      </Accordion>

      <Accordion id="styles" label="Dress Style" open={open.styles} onToggle={() => setOpen(p => ({ ...p, styles: !p.styles }))} badge={selectedStyles.length || undefined}>
        <div className="list">
          {styles.map((s) => (
            <div key={s} className={`item ${selectedStyles.includes(s) ? 'active' : ''}`} onClick={() => toggleListVal(s, selectedStyles, setSelectedStyles)}>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion id="rating" label="Rating" open={open.rating} onToggle={() => setOpen(p => ({ ...p, rating: !p.rating }))} badge={selectedRatings.length || undefined}>
        <div className="chips">
          {ratings.map((r) => (
            <button key={r} className={`chip ${selectedRatings.includes(r) ? 'active' : ''}`} onClick={() => toggleListVal(r, selectedRatings, setSelectedRatings)}>{r}★ & up</button>
          ))}
        </div>
      </Accordion>

      <Accordion id="availability" label="Availability" open={open.availability} onToggle={() => setOpen(p => ({ ...p, availability: !p.availability }))} badge={availability ? 1 : undefined}>
        <div className="chips">
          <button className={`chip ${availability === 'in' ? 'active' : ''}`} onClick={() => setAvailability(availability === 'in' ? null : 'in')}>In stock</button>
          <button className={`chip ${availability === 'out' ? 'active' : ''}`} onClick={() => setAvailability(availability === 'out' ? null : 'out')}>Out of stock</button>
        </div>
      </Accordion>

      <div className="actions">
        <button className="btn primary" onClick={handleApply}>Apply Filters</button>
        <button className="btn secondary" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

function Accordion({ id, label, open, onToggle, badge, children }) {
  return (
    <section className="group">
      <header className="group-header" onClick={onToggle}>
        <span className="group-label">{label}</span>
        {badge && <span className="badge">{badge}</span>}
        <span className={`arrow ${open ? 'open' : ''}`}><IoIosArrowUp /></span>
      </header>
      {open && <div className="group-body">{children}</div>}
    </section>
  );
}
