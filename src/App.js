import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Shop_1 from './components/Shop_1';
import Footer from './components/Footer'
function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Shop_1 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;