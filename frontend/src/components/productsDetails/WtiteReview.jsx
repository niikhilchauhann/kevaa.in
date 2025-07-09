import React, { useState } from "react";
import "../../css/productDescription/writeReview.css";

const WriteReview = ({ product, onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(4);
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Text:", reviewText);
    console.log("Trimmed:", reviewText.trim());
    if (!reviewText.trim()) {
      alert("Please write something before submitting your review.");
      return
    }
    
    alert("Review submitted!");
    onClose(); 
    // close modal after submission
  };

  return (
    <div className="review-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="review-modal-container">
        <div className="write-review-modal">
          <h3 className="write-review-title">WRITE REVIEW</h3>

          <div className="write-review-product-info">
            <img src={product.image} alt="product" className="write-review-avatar" />
            <div>
              <p className="write-review-name">{product.name}</p>
              <div className="write-review-stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < rating ? "write-review-star filled" : "write-review-star"}
                    onClick={() => setRating(i + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form className="write-review-form" onSubmit={handleSubmit}>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Please write product review here."
            />

            <div className="write-review-photo-upload">
              <label className="write-review-upload-box">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                <span className="write-review-upload-icon">🖼️</span>
              </label>
              <span className="write-review-tooltip">Add Photos</span>
            </div>

            <p className="write-review-disclaimer">
              By submitting review you give us consent to publish and process personal information in accordance with our&nbsp;
              <span className="write-review-link-red">Terms of use</span>&nbsp;and&nbsp;
              <span className="write-review-link-blue">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              className="write-review-submit-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
