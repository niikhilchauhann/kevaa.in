import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blogs.css"; 
import NavBar from "../components/Global/NavBar";

const blogs = [
  {
    id: 1,
    title: "Essentials for a Pure Home Pooja",
    date: "12-09-2025",
    author: "Kevaa",
    image: "https://imgs.search.brave.com/XP9Zrl7gQhtUbDIZQ7FYPa9Fknrijb35ZSrJxiYBBLg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGVi/b21iYXlzdG9yZS5j/b20vY2RuL3Nob3Av/YXJ0aWNsZXMvYmxv/Zy1wb3N0LTgwMHg2/MDAtQV8xMDI0eDEw/MjQuanBnP3Y9MTc0/NTMxNDUwOA",
    description:
      "A compact guide to the authentic items every home should have for a simple, pure pooja—selected for quality and tradition. A heartfelt home pooja begins with simple, authentic items chosen with care. In this guide we cover the essentials: a pure brass or silver diya",
    article:
      "A heartfelt home pooja begins with simple, authentic items chosen with care. In this guide we cover the essentials: a pure brass or silver diya, cotton wicks, natural ghee or pure oil for the lamp, unadulterated camphor, kumkum (vermilion), haldi (turmeric), fresh flowers or dry flower garlands, incense (preferably natural ingredients), and an auspicious bell. Choose items that are certified or sourced from trusted artisans — authenticity ensures purity of ritual and safety. We also explain how to set up a compact altar for hostel rooms or small apartments, storage tips to keep items fresh, and small-budget alternatives that never compromise tradition."
  },
  {
    id: 2,
    title: "How to Choose Authentic Incense & Camphor",
    date: "05-09-2025",
    author: "Kevaa",
    image: "https://imgs.search.brave.com/X2RaTVTvtWAmoAGGUtci-hZImin8kL5l99EcqTZzMR8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGVw/b29qYWhvdXNlLmNv/bS9jZG4vc2hvcC9h/cnRpY2xlcy9waG90/My5wbmc_dj0xNzU1/NjgzMzIxJndpZHRo/PTQ2MA",
    description:
      "Not all incense and camphor are created equal. Learn how to pick pure, safe products that honour tradition and health. When selecting incense (agarbatti or dhoop), prefer sticks made from natural resins, essential oils, or herbal blends without synthetic fragrances or heavy chemicals. Look for short ingredient lists or label claims like 'hand-rolled', 'natural resin', or 'herbal base",
    article:
      "Incense and camphor play a central role in many pooja practices — their aroma helps focus the mind and purify the space. When selecting incense (agarbatti or dhoop), prefer sticks made from natural resins, essential oils, or herbal blends without synthetic fragrances or heavy chemicals. Look for short ingredient lists or label claims like 'hand-rolled', 'natural resin', or 'herbal base'. For camphor, choose natural camphor (broussonetia or borneol-based) rather than synthetic blocks that may contain harmful additives. This article also covers burn-safety (never leave burning items unattended), smoke sensitivity alternatives (flower-based offerings), and how to store aromatic items to preserve fragrance and potency."
  },
  {
    id: 3,
    title: "Selecting Pure Kumkum & Haldi: A Student-Friendly Guide",
    date: "02-09-2025",
    author: "Kevaa",
    image: "https://imgs.search.brave.com/RJrJssVP4HoKNhKy3bztJmQf4YyZUPK58ykvhHPLF7k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIyNDIxMTEzL3Iv/aWwvZjZkNjZkLzQw/NjU5NzEyMzEvaWxf/MzQweDI3MC40MDY1/OTcxMjMxX29rNTIu/anBn",
    description:
      "Kumkum and haldi are simple, powerful symbols. Here’s how to ensure you're buying pure, skin-safe powders suitable for daily rituals.  Authentic kumkum is usually made from turmeric powder mixed with lime (for the red shade) or natural vermilion; avoid products with artificial dyes.",
    article:
      "Kumkum (vermilion) and haldi (turmeric) are often used directly on skin and in offerings — so purity matters. Authentic kumkum is usually made from turmeric powder mixed with lime (for the red shade) or natural vermilion; avoid products with artificial dyes. For haldi, prefer single-ingredient turmeric powder (Curcuma longa) labelled 'edible' or 'culinary' to guarantee no fillers. We discuss trusted packaging indicators, small-batch artisan producers, and quick at-home tests (color, aroma, and solubility checks). Plus: tips for hostel-friendly storage and how to pack small sachets for festivals or group poojas."
  },
  {
    id: 4,
    title: "Caring For Brass & Silver Pooja Vessels",
    date: "30-08-2025",
    author: "Kevaa",
    image: "https://imgs.search.brave.com/6uAB4C__BAWfmo9iY0FQlu-JAhjsuFrI7sykCY0rbks/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIvazB5/NmNuazAvcG9vamEt/dGhhbGktc2V0L2Iv/Yi9oL2lhdi1zcC0z/LTE3OS1ma3NiLWZs/aXBrYXJ0LXNtYXJ0/YnV5LW9yaWdpbmFs/LWltYWZrZzh4Z2Zj/YnFqNXouanBlZz9x/PTcw",
    description:
      "Brass and silver vessels last generations if cared for properly. Learn safe cleaning, polishing, and storage methods for heirloom-quality care. Avoid abrasive scrubs and strong chemical polishers that remove plating or delicate finishes. This article provides step-by-step cleaning for common items — thalis, bells, aartis — and explains how to prevent tarnish, the right way to store pieces in humid climates, and how to identify genuine metal vs. plated or alloy substitutes.",
    article:
      "Brass and silver are traditional materials for pooja vessels because of their durability and sacred connotations. To maintain shine without damaging surfaces, use gentle, natural cleaning agents: lemon with salt or a paste of baking soda and water for brass; a soft cloth with warm, soapy water for silver followed by thorough drying. Avoid abrasive scrubs and strong chemical polishers that remove plating or delicate finishes. This article provides step-by-step cleaning for common items — thalis, bells, aartis — and explains how to prevent tarnish, the right way to store pieces in humid climates, and how to identify genuine metal vs. plated or alloy substitutes."
  },
  {
    id: 5,
    title: "Festivals & Small-Circle Poojas: Practical Kits for Students",
    date: "20-08-2025",
    author: "Kevaa",
    image: "https://imgs.search.brave.com/7ubhzkw7fsyadF61p3XYceVfr2Z5A-XCFaDAtefQM3w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcy/LmV4cG9ydGVyc2lu/ZGlhLmNvbS9wcm9k/dWN0X2ltYWdlcy9i/Yy1zbWFsbC8yMDE5/LzcvNDE2MDY3Ni9w/dWphLWtpdHMtMTU2/MjgyNTkxNy00OTky/MDc2LmpwZWc",
    description:
      "Short on space and time? Discover compact, curated pooja kits that include only the authentic items you need for festival rituals in shared living spaces.We outline what should be inside a responsible kit (no harmful ingredients), how to respect hostel safety rules (flame alternatives like electric diyas), and ideas for group rituals that keep the spirit of celebration while being considerate to roommates and fire-safety norms",
    article:
      "Students and young professionals living in hostels or rented rooms often seek simple solutions for festival rituals. Curated compact kits solve this — they typically include a small diya, pre-measured kumkum & haldi sachets, a mini incense box (natural), a small brass bell, and a pocket-sized aarti plate. We outline what should be inside a responsible kit (no harmful ingredients), how to respect hostel safety rules (flame alternatives like electric diyas), and ideas for group rituals that keep the spirit of celebration while being considerate to roommates and fire-safety norms."
  }
];

const Blog = () => {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDiscoverMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div>
      <NavBar />
      <div className="blog-container">
        {/* Heading */}
        <h2 className="blog-heading">Blogs</h2>

        {/* Blog Cards */}
        <div className="blog-list">
          {blogs.slice(0, visibleCount).map((item) => (
            <div key={item.id} className="blog-card">
              <h2 className="blog-title">{item.title}</h2>
              <p className="blog-meta">
                By {item.author} • {item.date}
              </p>

              <div className="blog-content">
                <img
                  src={item.image}
                  alt={item.title}
                  className="blog-image"
                />
                <div className="blog-text">
                  <p className="blog-description">{item.description}</p>
                  <Link
                    to={`/blogs/${item.id}`}
                    state={{ item }}
                    className="read-more-btn"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discover More */}
        {visibleCount < blogs.length && (
          <div className="discover-more">
            <button onClick={handleDiscoverMore} className="discover-btn">
              Discover More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
