import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Shop_1 from './components/Shop_1';
import Footer from './components/Footer';
import ExpenseForm from './components/ExpenseForm';
import ExpenseCalendar from './components/ExpenseCalendar';
import Dashboard from './components/Dashboard';
import SavingsPlan from './components/SavingsPlan';
import './App.css';

// Ajustar el `basename` para despliegue en GitHub Pages
const basename = process.env.PUBLIC_URL || '';

function App() {
  return (
    <AuthProvider>
      <Router basename={basename}>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Shop_1 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Rutas protegidas */}
            <Route path="/expense" element={<PrivateRoute><ExpenseForm /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><ExpenseCalendar /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/savingsPlan" element={<PrivateRoute><SavingsPlan /></PrivateRoute>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Rutas protegidas: Solo usuarios autenticados pueden acceder
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirige a login
  return user ? children : <Navigate to="/login" replace />;
};

export default App;
