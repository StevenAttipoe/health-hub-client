import React from 'react';

export default function NavBar() {
    const handleLogout = () => {
        localStorage.removeItem("doctorAuthLoginToken");
        localStorage.removeItem("doctorAuthSignUpToken");
        localStorage.removeItem("patientAuthSignUpToken");
        window.location.reload();
      };

  return (
    <div className="navbar bg-base-100 border-b-4 border-black-100">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            </div>
        </div>
        <div className="navbar-center">
            <a href="/health-hub" className="btn btn-ghost normal-case text-xl">Health Hub</a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
            <button onClick={handleLogout} className="btn btn-ghost btn-circle">
            <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                <path d="M23.9917 6L6 6L6 42H24" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M33 33L42 24L33 15" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 23.9917H42" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>            
            </button>
        </div>
    </div>
  )
}
