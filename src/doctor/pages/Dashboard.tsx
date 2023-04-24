import React, { useState, useEffect } from 'react';
import NavBar from '../../components/nav/Navbar';
import Sidebar from '../../components/nav/Sidebar';
import Patients from './Patients';
import Home from './Home'
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard: React.FC = () => {
    const [currentComponent, setCurrentComponent] = useState <'home' | 'patients' > ('home');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("doctorAuthLoginToken");
        if (!token) {
          navigate("/doctor/login");
        }
      }, [navigate]);
    
  return (
    <div className='w-screen h-screen'>
        <NavBar/>
        <div className="flex">
            <div className="flex-none">
                <Sidebar role= {'doctor'} setCurrentComponent={setCurrentComponent} />
            </div>
            <div className="flex-auto bg-slate-300">
                <Main currentComponent={currentComponent} />
            </div>
        </div>
    </div> 
  );
}
export default DoctorDashboard;

interface MainProps {
    currentComponent: 'home' | 'settings' | 'patients' ;
  }
  
  const Main: React.FC<MainProps> = ({ currentComponent }) => {
    return (
      <div className="main">
        {currentComponent === 'home' && <Home />}
        {currentComponent === 'patients' && <Patients />}
      </div>
    );
  }
