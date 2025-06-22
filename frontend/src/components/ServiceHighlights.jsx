import React from 'react'
import '../css/home/serviceHighlights.css';

function ServiceHighlights() {
    return (
        <div className="service-highlights">
            <div className="service-box">
                <i className="fas fa-box-open"></i>
                <div>
                    <h4>Free Shipping</h4>
                    <p>Free Shipping for orders over £130</p>
                </div>
            </div>
            <div className="service-box">
                <i className="fas fa-dollar-sign"></i>
                <div>
                    <h4>Money Guarantee</h4>
                    <p>Within 30 days for an exchange.</p>
                </div>
            </div>
            <div className="service-box">
                <i className="fas fa-headset"></i>
                <div>
                    <h4>Online Support</h4>
                    <p>24 hours a day, 7 days a week</p>
                </div>
            </div>
            <div className="service-box">
                <i className="fas fa-credit-card"></i>
                <div>
                    <h4>Flexible Payment</h4>
                    <p>Pay with Multiple Credit Cards</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceHighlights
