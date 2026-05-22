import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Catalog from './pages/Catalog';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
  );
}

export default App;
