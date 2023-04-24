import React, { useState, useEffect} from 'react'
import Sidebar from '../../components/nav/Sidebar'
import { PatientHome } from './Home';
import NavBar from '../../components/nav/Navbar';
import Data from '../pages/Data';
import Scan from './Scan';
import CardData from '../../interfaces/CardData';
import { useNavigate } from 'react-router-dom';

export const PatientDashboard: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState <'home' | 'scan' | 'data'> ('home');
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("patientAuthSignUpToken");
      if (!token) {
        navigate("/patient/signup");
      }
    }, [navigate]);

  return (
    <div className='w-screen h-screen'>
      <NavBar/>
      <div className="flex">
          <div className="flex-none">
              <Sidebar 
                role={'patient'} 
                setCurrentComponent = {setCurrentComponent}
                />
          </div>
          <div className="flex-auto bg-slate-200">
                <Main currentComponent={currentComponent} />
            </div>
      </div>
    </div> 
  );
}

interface MainProps {
  currentComponent: 'home' | 'scan' | 'data';
}

const Main: React.FC<MainProps> = ({ currentComponent }) => {
  return (
    <div className="main">
      {currentComponent === 'home' && <PatientHome data={data} />}
      {currentComponent === 'scan' && <Scan />}
      {currentComponent === 'data' && <Data />}
    </div>
  );
}


export const data: CardData[] = [
  {
    heart_rate: 80,
    glucose_level: 80,
    blood_pressure: 80,
  }
];