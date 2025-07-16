import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Create_ACC from './Pages/Create_ACC';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/about">Create</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<Create_ACC />} />
      </Routes>
    </Router>
  );
}
export default App