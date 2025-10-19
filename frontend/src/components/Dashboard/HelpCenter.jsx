import React from 'react';
import Chatbot from './Chatbot';
import './helpCenter.css';

const HelpCenter = () => {
  return (
    <div className="help-center-container">
      <div className="help-center-content">
        <div className="help-center-left">
          <h2>Help Center</h2>
          <p>If you have any questions, ask our chatbot on the right. If the chatbot cannot answer, you will be redirected to email support.</p>
          <div className="help-center-image">
            <img src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1756832688/customer-support-helpdesk-logo-symbol-600nw-374752933_alfykb.jpg" alt="Temple" />
          </div>
        </div>
        <div className="help-center-right">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
