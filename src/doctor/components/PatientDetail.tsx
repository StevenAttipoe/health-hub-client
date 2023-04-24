import Patient from '../../interfaces/Patient';
import { useState } from 'react';

type PatientDetailsProps = {
  patient: Patient | null;
};

const PatientDetail: React.FC<PatientDetailsProps> = ({patient}) => {
    const [showRecords, setShowRecords] =  useState(false);

    const handleClick = () => {
        setShowRecords(true)
    }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        {showRecords === true ? 
        (<div>true</div>):
        (<div>false</div>)}
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="flex items-center justify-center h-screen ">
                <div className="p-6 rounded-lg shadow-lg bg-white transform transition-all">
                <div className="sm:flex sm:items-start">
                        <div className="flex-shrink-0 mx-auto h-20 w-20  rounded-full sm:mx-0 sm:h-24 sm:w-24">
                            <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="black"/>
                            </svg>
                        </div>
                        {patient && 
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <dl className="grid grid-cols-2 gap-x-32 gap-y-8 text-sm">
                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Name</dt>
                                        <dd className="mt-1">{patient.surname} {patient.firstNames}</dd>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Date Of Birth</dt>
                                        <dd className="mt-1">{patient.dateOfBirth}</dd>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Gender</dt>
                                        <dd className="mt-1">{patient.gender}</dd>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Nationality</dt>
                                        <dd className="mt-1">{patient.nationality}</dd>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Height</dt>
                                        <dd className="mt-1">{patient.height}</dd>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <dt className="font-medium text-gray-500">Location</dt>
                                        <dd className="mt-1">{patient.placeOfIssuance}</dd>
                                    </div>
                                </dl>
                            </div>
                        }
                    </div>

                <div className="flex flex-row align-baseline justify-around sm:px-6">
                    <div>
                        <button className='btn btn-info mt-6' onClick={handleClick}> More</button>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-error">Close</label>
                    </div>
   
                </div>
            </div>
                </div>
            </div>
</div>
);
};

export default PatientDetail;
