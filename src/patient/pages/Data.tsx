import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MedicalRecord from '../../interfaces/MedicalRecord';
import PatientRecord from '../components/PatientRecord';
import useFetch from '../../components/hooks/useFetch';
import Patient from '../../interfaces/Patient';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const Data: React.FC = () => {  
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [noOfRecordPages, setNoOfRecordPages] = useState<number>(0);
  // const PAGE_SIZE = 4;
  const { data: patientData } = useFetch<Patient>('/patient/get', 'patient');

  useEffect(() => {
    let TOKEN = localStorage.getItem("patientAuthSignUpToken");

    const fetchRecords = async () => {
      const response = await axios.get(`${BASE_URL}/record/get/all`, 
      { headers: { Authorization: `Bearer ${TOKEN}` }}
      );
      
      setMedicalRecords(response.data.records);
    };
    fetchRecords();

 
  }, []);



  return (
    <div>
      <div className='px-10 flex flex-row space-x-8'>
        <div className='bg-white mt-5 rounded-lg px-8 flex flex-col items-center w-2/6'>
          <svg className="mt-3 h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="black"/>
          </svg>
          <div className="py-4 flex flex-col items-center">
              <p className='capitalize pb-3'>{patientData && patientData.firstNames.toLowerCase() + " " +patientData.surname.toLowerCase()}</p>
              <button className='btn btn-sm btn-info'>Contact</button>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-2 bg-white mt-5 rounded-lg px-8 py-8 w-full">
          <div className="py-2">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700"> Nationality </label>
            <p>{patientData && patientData.nationality}</p>
          </div>

          <div className="py-2">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700"> Sex </label>
            <p>{patientData && patientData.gender}</p>
          </div>

          <div className="py-2">
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700"> Date of Birth </label>
            <p>{patientData && patientData.dateOfBirth}</p>
          </div>

          <div className="py-2">
            <label htmlFor="height" className="block text-sm font-medium text-gray-700"> Height </label>
            <p>{patientData && patientData.height}</p>
          </div>

        <div className="py-2">
          <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700"> Location </label>
          <p>{patientData && patientData.placeOfIssuance}</p>
        </div>

        <div className="py-2">
          <label htmlFor="telephone_number" className="block text-sm font-medium text-gray-700"> Assigned Doctor </label>
          <p>{patientData && patientData.assignedDoctor}</p>
        </div>
        </div>
      </div>

      <div className='bg-white my-8 mx-10 rounded-lg pt-8 pb-3'>
        <span className='pl-10 font-semibold text-xl'> Medical Record Table </span>

        <div className='h-72 bg-slate-100 overflow-auto rounded-xl mt-8 mx-10'>
          
          {medicalRecords.map((record: MedicalRecord, index: number) => (
            <PatientRecord
              key={index}
              record={record}
              isDoctor={false}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default Data;