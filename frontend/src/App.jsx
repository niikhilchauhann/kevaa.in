import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
