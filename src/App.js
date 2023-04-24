import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage.tsx';
import Index from './pages/Index.tsx';
import DoctorDashboard from './doctor/pages/Dashboard.tsx';
import { PatientDashboard } from './patient/pages/Dashboard';
import Login from './doctor/pages/Login';
import Signup from './patient/pages/Signup';
import DoctorSignUp from './doctor/pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/health-hub" element={<Index/>} />
        <Route index element={<Index/>} />
        <Route path="/doctor/dashboard" element= {<DoctorDashboard/>} />
        <Route path="/doctor/signup" element= {<DoctorSignUp/>} />
        <Route path="/patient/dashboard" element= {<PatientDashboard/>} />
        <Route path="/doctor/login" element= {<Login/>} />
        <Route path="/patient/signup" element= {<Signup/>}/>
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
