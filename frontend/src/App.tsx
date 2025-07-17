import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Create_ACC from './Pages/Create_ACC';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
      <div>
        <nav className='flex justify-end gap-5'>
          <Link to="/">Sign In</Link>
          <Link to="/about"> Create</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<Create_ACC />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}
export default App