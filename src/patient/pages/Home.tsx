import React, { useMemo } from 'react';
import useFetch from '../../components/hooks/useFetch';
import MedicalRecord from '../../interfaces/MedicalRecord';
import Patient from '../../interfaces/Patient';
import FetchState from '../../interfaces/FetchState';


interface CardData {
  heart_rate: number,
  glucose_level: number,
  blood_pressure: number
}

interface Props {
  data: CardData[];
}


export const PatientHome:React.FC<Props> = () => {
  const [patientFetchState, medicalRecordFetchState] = usePatientAndMedicalRecord();
  const { loading: patientLoading, data: patientData, error: patientError } = patientFetchState;
  const { loading: medicalRecordLoading, data: medicalRecordData, error: medicalRecordError } = medicalRecordFetchState;
  
  function usePatientAndMedicalRecord(): [FetchState<Patient>, FetchState<MedicalRecord>] {
    const patientFetchState = useFetch<Patient>('/patient/get', 'patient');
    const medicalRecordFetchState = useFetch<MedicalRecord>('/record/get/recent', 'patient');
    return [patientFetchState, medicalRecordFetchState];
  }

  const cachedPatientData = useMemo(() => {
    return patientData;
  }, [patientData]);

  return (
    <div className='h-screen overflow-auto'>
        <div className='px-10'>
          <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-5">
            {patientLoading || patientError ? 
            (<div>
              <h2 className="w-40 h-5 bg-gray-400 rounded-sm animate-pulse mb-4">&nbsp;</h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p className='w-16 h-5 bg-gray-400 rounded-sm animate-pulse mb-1'>&nbsp;</p>
                  <p className='w-16 h-5 bg-gray-400 rounded-sm animate-pulse mb-1'>&nbsp;</p>
                </div>
                <div>
                  <p className='w-16 h-5 bg-gray-400 rounded-sm animate-pulse mb-1'>&nbsp;</p>
                  <p className='w-16 h-5 bg-gray-400 rounded-sm animate-pulse mb-1'>&nbsp;</p>
                </div>
              </div>
            </div>) 
            : 
            (<div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4 capitalize">
                Welcome Back, {cachedPatientData && cachedPatientData.firstNames.toLowerCase() + " " + cachedPatientData.surname.toLowerCase() } !
              </h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p className='italic'>Assigned Doctor: {cachedPatientData && cachedPatientData.assignedDoctor}</p>
                  <p>Last Scan: {medicalRecordData && medicalRecordData.dateCreated}</p>
                </div>
                <div>
                  <p>Gender: {cachedPatientData && cachedPatientData.gender}</p>
                  <p>DOB: {cachedPatientData && cachedPatientData.dateOfBirth}</p>
                </div>
              </div>
            </div>)
          }
            
          </div>
        </div>

        <div>
          { medicalRecordError || medicalRecordLoading ? (
            <div className="flex flex-col items-center justify-center h-64 m-24">
              <div>
                <img className="w-32 h-32 mb-6" src="https://em-content.zobj.net/thumbs/320/apple/325/melting-face_1fae0.png" alt="Melting Face Emoji" />
              </div>
              <br/>
              <div className="text-center">
                <p className="text-xl font-medium mb-2">No data scanned yet.</p>
                <p className="text-sm">Please save scan data to view it here.</p>
              </div>
              
          </div>
          ) : (
            <div className="ml-[-1rem] flex flex-row justify-evenly mt-5 mx-52 px-10 py-5">
                <div className='ml-20 h-52 bg-white w-64 flex flex-row justify-center space-x-2 border-4 border-red-200 rounded-3xl'>
                  <div className='flex items-center'>
                    <div className='bg-red-200 h-20 w-20 my-3  mx-3 flex items-center justify-center rounded-full'>
                      <svg width="54px" height="54px" viewBox="0 0 24 24" id="magicoon-Filled" fill="#cf1b30"
                        xmlns="http://www.w3.org/2000/svg"><title>heart</title> <g id="heart-Filled"><path id="heart-Filled-2" 
                        data-name="heart-Filled" d="M21.37,11.562c-.955,4.9-5.974,8.334-8.088,9.586a2.517,2.517,0,0,1-2.564,0C8.6,
                          19.9,3.585,16.458,2.63,11.562A7.088,7.088,0,0,1,4.083,5.755,6,6,0,0,1,8.772,3.5,6.5,6.5,0,0,1,12,4.344,6.5,
                          6.5,0,0,1,15.228,3.5a6,6,0,0,1,4.689,2.255A7.088,7.088,0,0,1,21.37,11.562Z"/>
                          </g>
                      </svg>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center text-center'>
                      {medicalRecordData && (<h3>{medicalRecordData.pulseRate} bpm</h3>)}
                    <h5>Heart rate</h5>
                  </div>
                </div>

                <div className=' ml-10 h-52  bg-white w-64 flex flex-row justify-center space-x-2 border-4 border-green-200 rounded-3xl'>
                  <div className='flex items-center'>
                    <div className='bg-green-200 h-20 w-20 my-3  mx-3 flex items-center justify-center rounded-full'>
                      <svg fill="#063b0c" width="54px" height="54px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13,15.28V5.5a1,1,0,0,0-2,0v9.78A2,2,0,0,0,10,17a2,2,0,0,0,4,0A2,2,0,0,0,13,15.28ZM16.5,13V5.5a4.5,4.5,0,0,0-9,0V13a6,6,0,0,0,3.21,9.83A7,7,0,0,0,12,23,6,6,0,0,0,16.5,13Zm-2,7.07a4,4,0,0,1-6.42-2.2,4,4,0,0,1,1.1-3.76,1,1,0,0,0,.3-.71V5.5a2.5,2.5,0,0,1,5,0v7.94a1,1,0,0,0,.3.71,4,4,0,0,1-.28,6Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center text-center'>
                  {medicalRecordData && (<h3>{medicalRecordData.diaMmHg} C</h3>)}
                    <h5>Dia mmHg</h5>
                  </div>
                </div>

                <div className='ml-10 h-52 bg-white w-64 flex flex-row justify-center space-x-2 border-4 border-orange-200 rounded-3xl'>
                  <div className='flex items-center'>
                    <div className='bg-orange-200 h-20 w-20 my-3  mx-3 flex items-center justify-center rounded-full'>
                      <svg width="58px" height="58px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M36.9228 21C37.4751 21 37.9228 21.4477 37.9228 22C37.9228 23.3228 37.9425 24.692 37.962 26.0465C37.9843 27.5925 38.0062 26.1193 37.9983 27.536C37.9831 30.2549 37.8624 32.8418 37.4203 35.0818C36.9793 37.3163 36.1986 39.3134 34.7794 40.7537C33.3307 42.2238 31.3311 43 28.7032 43C24.3102 43 21.8273 41.3632 20.4727 39.5782C19.8121 38.7078 19.4478 37.8388 19.2478 37.1859C19.1476 36.8585 19.0876 36.582 19.0522 36.3816C19.0344 36.2813 19.0227 36.1995 19.0152 36.1395C19.0115 36.1095 19.0087 36.0849 19.0068 36.066L19.0045 36.042L19.0037 36.0334L19.0035 36.0299L19.0033 36.0284C19.0033 36.0284 19.0032 36.027 20 35.9474L19.0032 36.027L18.9236 35.0302L20.9172 34.8709L20.9963 35.8615L20.9965 35.8635C20.9969 35.8675 20.9979 35.8769 20.9997 35.8912C21.0033 35.9198 21.0101 35.9681 21.0216 36.0333C21.0447 36.1638 21.0867 36.3602 21.1602 36.6003C21.3078 37.0822 21.578 37.7264 22.0658 38.3692C23.0079 39.6105 24.8765 41 28.7032 41C30.9103 41 32.3556 40.3639 33.3548 39.3499C34.3833 38.3061 35.0531 36.7473 35.4582 34.6945C35.8622 32.6473 35.9833 30.2155 35.9984 27.5248C36.0065 26.071 35.9849 27.6161 35.9628 26.122C35.943 24.7884 35.9228 23.4235 35.9228 22C35.9228 21.4477 36.3705 21 36.9228 21Z" fill="#473007"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M23.0033 11.4695C23.0036 11.4695 23.0032 11.4729 23.0011 11.4797C23.0019 11.4729 23.003 11.4695 23.0033 11.4695ZM22.9934 11.5C22.9726 11.4519 22.9117 11.3471 22.7451 11.186C22.4319 10.883 21.8739 10.5181 21.0209 10.1691C19.3247 9.47522 16.8435 9 14 9C11.1565 9 8.67526 9.47522 6.97909 10.1691C6.12611 10.5181 5.5681 10.883 5.25487 11.186C5.08832 11.3471 5.02743 11.4519 5.0066 11.5C5.02743 11.5481 5.08832 11.6529 5.25487 11.814C5.5681 12.117 6.12611 12.4819 6.97909 12.8309C8.67526 13.5248 11.1565 14 14 14C16.8435 14 19.3247 13.5248 21.0209 12.8309C21.8739 12.4819 22.4319 12.117 22.7451 11.814C22.9117 11.6529 22.9726 11.5481 22.9934 11.5ZM4.9967 11.4695C4.99702 11.4695 4.99807 11.4729 4.99891 11.4797C4.9968 11.4729 4.99638 11.4695 4.9967 11.4695ZM4.9967 11.5305C4.99638 11.5305 4.9968 11.5271 4.99891 11.5203C4.99807 11.5271 4.99702 11.5305 4.9967 11.5305ZM23.0011 11.5203C23.0032 11.5271 23.0036 11.5305 23.0033 11.5305C23.003 11.5305 23.0019 11.5271 23.0011 11.5203ZM14 16C20.0751 16 25 13.9853 25 11.5C25 9.01472 20.0751 7 14 7C7.92487 7 3 9.01472 3 11.5C3 13.9853 7.92487 16 14 16Z" fill="#473007"/>
                        <path d="M4 14L13 16.3158V36L4 33.6842V14Z" fill="#473007"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M25 12C25 12 24.306 12.5138 23 13.1161C21.1501 13.9692 18.0724 15 14 15C9.84407 15 6.815 13.9958 5 13.1494C3.6779 12.5328 3 12 3 12V34C3 34 6.47368 37 14 37C21.5263 37 25 34 25 34V31.9381C24.6724 31.979 24.3387 32 24 32C23.6613 32 23.3276 31.979 23 31.9381V32.9432C22.651 33.1473 22.1712 33.3976 21.5565 33.6525C19.9799 34.306 17.4896 35 14 35C10.5104 35 8.02005 34.306 6.44352 33.6525C5.82878 33.3976 5.34902 33.1473 5 32.9432V15.3312L5.05561 15.3538C7.11934 16.1895 10.1236 17 14 17C17.7658 17 20.7672 16.1864 22.8458 15.3578C22.8978 15.3371 22.9492 15.3164 23 15.2957V16.0619C23.3276 16.021 23.6613 16 24 16C24.3387 16 24.6724 16.021 25 16.0619V12Z" fill="#473007"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30ZM24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="#473007"/>
                        <path d="M26 24C26 25.1046 25.1046 26 24 26C22.8954 26 22 25.1046 22 24C22 22.8954 22.8954 22 24 22C25.1046 22 26 22.8954 26 24Z" fill="#473007"/>
                        <path d="M23 20C23 19.4477 23.4477 19 24 19C24.5523 19 25 19.4477 25 20V23C25 23.5523 24.5523 24 24 24C23.4477 24 23 23.5523 23 23V20Z" fill="#473007"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.0396 19.7624C38.5973 18.6469 39 16.966 39 15C39 13.034 38.5973 11.3531 38.0396 10.2376C37.761 9.68039 37.4809 9.33804 37.2653 9.15562C37.1621 9.06834 37.0881 9.02968 37.0486 9.01352C37.0291 9.00555 37.0168 9.00248 37.0109 9.00128C37.0052 9.00013 37.0021 9 37 9C36.9979 9 36.9948 9.00013 36.9891 9.00128C36.9832 9.00248 36.9709 9.00555 36.9514 9.01352C36.9119 9.02968 36.8379 9.06834 36.7347 9.15562C36.5191 9.33804 36.239 9.68039 35.9604 10.2376C35.4027 11.3531 35 13.034 35 15C35 16.966 35.4027 18.6469 35.9604 19.7624C36.239 20.3196 36.5191 20.662 36.7347 20.8444C36.8379 20.9317 36.9119 20.9703 36.9514 20.9865C36.9709 20.9945 36.9832 20.9975 36.9891 20.9987C36.9948 20.9999 36.9979 21 37 21C37.0021 21 37.0052 20.9999 37.0109 20.9987C37.0168 20.9975 37.0291 20.9945 37.0486 20.9865C37.0881 20.9703 37.1621 20.9317 37.2653 20.8444C37.4809 20.662 37.761 20.3196 38.0396 19.7624ZM37 23C39.2091 23 41 19.4183 41 15C41 10.5817 39.2091 7 37 7C34.7909 7 33 10.5817 33 15C33 19.4183 34.7909 23 37 23Z" fill="#473007"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.0396 19.7624C38.5973 18.6469 39 16.966 39 15C39 13.034 38.5973 11.3531 38.0396 10.2376C37.761 9.68039 37.4809 9.33804 37.2653 9.15562C37.1621 9.06834 37.0881 9.02968 37.0486 9.01352C37.0291 9.00555 37.0168 9.00248 37.0109 9.00128C37.0052 9.00013 37.0021 9 37 9C36.9979 9 36.9948 9.00013 36.9891 9.00128C36.9832 9.00248 36.9709 9.00555 36.9514 9.01352C36.9119 9.02968 36.8379 9.06834 36.7347 9.15562C36.5191 9.33804 36.239 9.68039 35.9604 10.2376C35.4027 11.3531 35 13.034 35 15C35 16.966 35.4027 18.6469 35.9604 19.7624C36.239 20.3196 36.5191 20.662 36.7347 20.8444C36.8379 20.9317 36.9119 20.9703 36.9514 20.9865C36.9709 20.9945 36.9832 20.9975 36.9891 20.9987C36.9948 20.9999 36.9979 21 37 21C37.0021 21 37.0052 20.9999 37.0109 20.9987C37.0168 20.9975 37.0291 20.9945 37.0486 20.9865C37.0881 20.9703 37.1621 20.9317 37.2653 20.8444C37.4809 20.662 37.761 20.3196 38.0396 19.7624ZM37 23C39.2091 23 41 19.4183 41 15C41 10.5817 39.2091 7 37 7C34.7909 7 33 10.5817 33 15C33 19.4183 34.7909 23 37 23Z" fill="#473007"/>
                      </svg>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center text-center'>
                    {medicalRecordData && (<h3>{medicalRecordData.sysMmHg} mmHg</h3>)}
                    <h5>Sys mmHg</h5>
                  </div>
                </div>

            </div>
          )}
        </div>
        

      {/* <div >
        <Charts/>
      </div> */}

    </div>
  );
}