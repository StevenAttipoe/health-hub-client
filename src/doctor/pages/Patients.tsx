import React, { useState, useEffect } from 'react';
import MedicalRecord from '../../interfaces/MedicalRecord';
import Patient from '../../interfaces/Patient';
import RecordView from '../components/RecordView';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const TOKEN = localStorage.getItem("doctorAuthLoginToken");

const fetchPatients = async (pageNo: number) => {
  const response = await fetch(`${BASE_URL}/patient/get/all?pageNo=${pageNo - 1}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};

const fetchRecords = async (patientId: string, pageNo: number) => {
  const response = await fetch(`${BASE_URL}/record/get/id/all/?patientId=${patientId}&pageNo=${pageNo - 1}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};

type PaginationButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  active: boolean;
}

const PaginationButton = ({ onClick, children, active }:  PaginationButtonProps) => (
  <button
    className={`${active ? 'bg-green-500 text-white' : 'bg-white text-gray-500'
      } px-4 py-2 border rounded-3xl border-gray-400`}
    onClick={onClick}
  >
    {children}
  </button>
);

 const Patients: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [currentPatientPage, setPatientCurrentPage] = useState<number>(1);
  const [currentRecordPage, setRecordCurrentPage] = useState<number>(1);
  const [noOfRecordPages, setNoOfRecordPages] = useState<number>(0);
  const [noOfPatientPages, setNoOfPatientPages] = useState<number>(0);

  const PAGE_SIZE = 4;
  const patientPages = getPageNumbers(patients.length * noOfPatientPages, PAGE_SIZE);
  const recordPages = getPageNumbers(records.length * noOfRecordPages, PAGE_SIZE);
  
  useEffect(() => {
    fetchPatients(currentPatientPage)
      .then((data) => {
        setPatients(data.patients);
        setSelectedPatient(data.patients[0]);
        setNoOfPatientPages(data.totalPages);
      });

  }, [currentPatientPage]);

  useEffect(() => {
    selectedPatient && fetchRecords(selectedPatient.personalIdNumber, currentRecordPage)
      .then((data) => {
        setRecords(data.records);
        setNoOfRecordPages(data.totalPages)
      });
  }, [selectedPatient, currentRecordPage]);

  function getPageNumbers(totalItems: number, pageSize: number): number[] {
    const pageCount = Math.ceil(totalItems / pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const handlePatientClick = async (patient: Patient) => {
    setSelectedPatient(patient);
    selectedPatient && fetchRecords(selectedPatient.personalIdNumber, currentRecordPage);
  };

  const handlePatientPageClick = (pageNumber: number) => {
    setPatientCurrentPage(pageNumber);
  };

  const handleRecordPageClick =  async (pageNumber: number) => {
    setRecordCurrentPage(pageNumber);
    selectedPatient && fetchRecords(selectedPatient.personalIdNumber, pageNumber);
  };

    return (
      <div>
        <div className='px-8 pt-3'>
          <div className='flex flex-row justify-between bg-slate-200 my-8 mx-2 rounded-lg pt-8 px-10 pb-3'>
            <div>
              <div className="flex flex-col gap-2 bg-white rounded-xl" style={{height: "calc(100vh - 11rem)"}}>
                {patients && patients.map((patient, index) => (

                  <div
                    key={index}
                    className={`p-4 bg-slate-200 shadow-md rounded-3xl mt-5 mx-5 cursor-pointer transition duration-200 ${selectedPatient && selectedPatient.personalIdNumber === patient.personalIdNumber ? 'bg-blue-200' : ''}`}
                    onClick={() => handlePatientClick(patient)}
                  >
                    <div className='flex lg:flex-row md:flex-col'>
                        <img
                          src={`https://api.dicebear.com/5.x/identicon/svg?seed=${index}`}
                          className='h-20 w-20 rounded-3xl'
                          alt="avatar"
                        />
                        <div className='flex flex-col pl-5'>
                          <h2 className="text-sm font-medium">{patient.surname + " " + patient.firstNames}</h2>
                          <p className="text-gray-500 mt-2">{patient.nationality + " " + patient.gender}</p>
                          <p className="text-gray-500 mt-2">{patient.dateOfBirth + " " + patient.placeOfIssuance}</p>
                        </div>                
                    </div>  
                  </div>
                ))}
              <div className="flex justify-center mt-8">
                {patientPages.map((page) => (
                  <PaginationButton key={page} onClick={() => handlePatientPageClick(page)} active={currentPatientPage === page}>
                    {page}
                  </PaginationButton>
                ))}
              </div>
            </div>

            </div>
            { selectedPatient && records && records.length > 0 ? 
              (<div className='rounded-xl' style={{width:"38rem", height: "calc(100vh - 11rem)"}} >
                <RecordView 
                  name= {selectedPatient.surname + " " + selectedPatient.firstNames}
                  nationality = {selectedPatient.nationality} 
                  location = {selectedPatient.placeOfIssuance}
                  records={records}
                />

                <div className="pl-64 absolute -mt-16 z-20">
                  {recordPages.map((page) => (
                    <PaginationButton key={page} onClick={() => handleRecordPageClick(page)} active={currentPatientPage === page}>
                    {page}
                  </PaginationButton>
                  ))}
                </div>
              </div>) :
              (<div className='bg-white flex items-center justify-center rounded-xl sm:w-[20rem] md:w-[20rem] lg:w-[36rem]' style={{height: "calc(100vh - 11rem)"}}>
                  No records available
              </div>)  }

          </div>
        </div>
      </div>
    );
  }

export default Patients;