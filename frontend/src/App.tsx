import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Create_ACC from './Pages/Create_ACC';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Catalog from './Pages/Catalog';
import Category from './Pages/Category';


function App() {
  return (
    <Router>
      <div className="fixed top-0 left-0 w-full h-16 bg-black text-white z-10 flex items-center justify-center">
        <nav className="flex gap-5">
          <Link to="/">Sign In</Link>
          <Link to="/about">Create</Link>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/catalog">catalog</Link>
          <Link to='/categories'>Categories</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<Create_ACC />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/catalog" element={<Category />}></Route>
      </Routes>
    </Router>
  );
}
export default App