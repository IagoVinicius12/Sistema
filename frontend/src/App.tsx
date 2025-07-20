import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Create_ACC from './Pages/Create_ACC';
import Home from './Pages/Home';
import Products from './Pages/Products';


function App() {
  return (
    <Router>
      <div>
        <nav className='flex justify-center gap-5'>
          <Link to="/">Sign In</Link>
          <Link to="/about"> Create</Link>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<Create_ACC />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Products/>}></Route>
      </Routes>
    </Router>
  );
}
export default App