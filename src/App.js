import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Shop_1 from './components/Shop_1';
import Footer from './components/Footer'
import ExpenseForm from './components/ExpenseForm';
import ExpenseCalendar from './components/ExpenseCalendar';
import Dashboard from './components/Dashboard'
import SavingsPlan from './components/SavingsPlan'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route path="/project-software" element={<Shop_1 />} />
            <Route path="/" element={<Shop_1/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/expense' element={<ExpenseForm />}/>
            <Route path='/calendar' element={<ExpenseCalendar/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/savingsPlan' element={<SavingsPlan/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirige a la página de inicio de sesión
  if (!user) {
      return <Navigate to="/login" replace />;
  }

  return children;  // Si hay un usuario, muestra el contenido protegido
};

export default App;