import React from 'react';

interface DoctorProps {
  role: 'doctor';
  setCurrentComponent: React.Dispatch<React.SetStateAction<'home' | 'patients'>>;
}

interface PatientProps {
  role: 'patient';
  setCurrentComponent: React.Dispatch<React.SetStateAction<'home' | 'scan' | 'data' >>;
}

type Props = DoctorProps | PatientProps;


export const Sidebar: React.FC<Props> = ({role, setCurrentComponent}) => {

  return (
    <div>
    {
      role === 'doctor' ? (

        <ul className="menu bg-base-100 static top-0 h-screen w-56 p-2 border-r-4 border-black">
          <li>
            <button onClick={() => setCurrentComponent('home')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
            </button>
          </li>
      
          <li>
            <button onClick={() => setCurrentComponent('patients')}>
              <svg width="48px" className="h-5 w-5" stroke="currentColor" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 25.1333C28.9725 25.1333 33 21.076 33 16.0667C33 11.0573 28.9725 7 24 7C19.0275 7 15 11.0573 15 16.0667C15 21.076 19.0275 25.1333 24 25.1333Z" fill="#333333"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.1254 28.9539C17.8971 28.4861 17.3814 28.2333 16.8786 28.3569C11.4745 29.6849 6 32.3928 6 36.4664V42.9997H42V36.4664C42 32.3928 36.5255 29.6849 31.1214 28.3569C30.6186 28.2333 30.1029 28.4861 29.8746 28.9539L25.8105 31.9539C24.9218 31.9541 24.4693 31.9541 24.0248 31.954C23.5637 31.954 23.1112 31.954 22.1893 31.9542L18.1254 28.9539ZM31 31H33V34H36V36H33V39H31V36H28V34H31V31Z" fill="#333333"/>
              </svg>
              Patients
            </button>
          </li>
        </ul>
      ) :(

        <ul className="menu bg-base-100 static top-0 h-screen w-56 p-2 border-r-4 border-black">
          <li>
            <button onClick={() => setCurrentComponent('home')}>
              <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
            </button>
          </li>

          <li>
            <button onClick={() => setCurrentComponent('scan')}>
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1538 19.4571C18.8619 19.4571 19.4359 18.8815 19.4359 18.1714V16.1143C19.4359 15.6882 19.7803 15.3429 20.2051 15.3429C20.63 15.3429 20.9744 15.6882 20.9744 16.1143V18.1714C20.9744 19.7336 19.7116 21 18.1538 21H16.1026C15.6777 21 15.3333 20.6546 15.3333 20.2286C15.3333 19.8025 15.6777 19.4571 16.1026 19.4571H18.1538Z" fill="#030D45"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1538 4.54286C18.8619 4.54286 19.4359 5.11849 19.4359 5.82857V7.88571C19.4359 8.31176 19.7803 8.65714 20.2051 8.65714C20.63 8.65714 20.9744 8.31176 20.9744 7.88571V5.82857C20.9744 4.26639 19.7116 3 18.1538 3L16.1026 3C15.6777 3 15.3333 3.34538 15.3333 3.77143C15.3333 4.19748 15.6777 4.54286 16.1026 4.54286L18.1538 4.54286Z" fill="#030D45"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.84615 19.4571C5.1381 19.4571 4.5641 18.8815 4.5641 18.1714L4.5641 16.1143C4.5641 15.6882 4.21971 15.3429 3.79487 15.3429C3.37004 15.3429 3.02564 15.6882 3.02564 16.1143L3.02564 18.1714C3.02564 19.7336 4.28843 21 5.84615 21H7.89744C8.32227 21 8.66667 20.6546 8.66667 20.2286C8.66667 19.8025 8.32227 19.4571 7.89744 19.4571H5.84615Z" fill="#030D45"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.84615 4.54286C5.1381 4.54286 4.5641 5.11849 4.5641 5.82857L4.5641 7.88572C4.5641 8.31176 4.21971 8.65714 3.79487 8.65714C3.37004 8.65714 3.02564 8.31176 3.02564 7.88572L3.02564 5.82857C3.02564 4.2664 4.28843 3 5.84615 3L7.89744 3C8.32227 3 8.66667 3.34538 8.66667 3.77143C8.66667 4.19748 8.32227 4.54286 7.89744 4.54286L5.84615 4.54286Z" fill="#030D45"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 12.426 21.6556 12.7714 21.2308 12.7714H2.76923C2.3444 12.7714 2 12.426 2 12C2 11.574 2.3444 11.2286 2.76923 11.2286H21.2308C21.6556 11.2286 22 11.574 22 12Z" fill="#030D45"/>
              </svg>
              Scan
            </button>
          </li>

          <li>
            <button onClick={() => setCurrentComponent('data')}>
              <svg fill="#000000"width="24px" height="24px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-info"><path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/></svg>
              Data
            </button>
          </li>
        </ul>
      )
    }
    </div>
  );
}

export default Sidebar;