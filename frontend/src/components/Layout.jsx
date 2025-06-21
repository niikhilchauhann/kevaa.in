// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import Footer from './Footer'; // Import your Footer component
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
