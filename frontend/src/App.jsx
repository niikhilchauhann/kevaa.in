// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout"; // Import the Layout component
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/product/:id" element={<ProductDetails />} />
          <Route path="protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
