import React from 'react';

export default function infoCard(){
  return (
    <div className="stats shadow">
        <div className="stat place-items-center">
            <div className="stat-title">Check In</div>
            <div className="stat-value">3000</div>
            <div className="stat-desc">From January 1st to February 1st</div>
        </div>
        
        <div className="stat place-items-center">
            <div className="stat-title">Patients</div>
            <div className="stat-value text-warning">4,200</div>
            <div className="stat-desc text-warning">↗︎ 40 (2%)</div>
        </div>
        
        <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
    </div>
  )
}
