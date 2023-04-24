import React, {useState} from 'react';
import MedicalRecord from '../../interfaces/MedicalRecord';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

interface PatientRecordProps { 
  record: MedicalRecord;
  isDoctor: boolean;
}

const PatientRecord: React.FC<PatientRecordProps> = ({
  record, 
  isDoctor, 
  }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const TOKEN = localStorage.getItem("doctorAuthLoginToken");


  const handleClick = () => {
    setShowModal(true);
  };

  const hideModel = () => {
    setShowModal(false);
  };

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    setNote(e.currentTarget.value)
  };

  const handleSave = async (recordId: number) => {
    await fetch(`${BASE_URL}/record/update?recordId=${recordId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(note)
    });
    window.location.reload();
  };

  const handleApprove = async (recordId: number) => {
    console.log(recordId);
    await fetch(`${BASE_URL}/record/approve?recordId=${recordId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    window.location.reload();
  };

  return (
    <div> 
      <div>
          <div onClick={handleClick}
            className={`${record.checked ? " border-green-400" : " border-red-400"} border-2 flex bg-white cursor-pointer my-4 mx-4 overflow-hidden justify-between items-center p-2  rounded-lg`} >
            <div className="flex flex-col">
              <p className="text-lg font-medium">{record.dateCreated}</p>
              <p className="text-sm font-medium">{record.timeCreated}</p>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mx-4">
                <p className="text-sm text-gray-500">Heart Rate Per Min</p>
                <p className="text-lg font-medium">{record.pulseRate} bpm</p>
              </div>
              <div className="flex flex-col items-center mx-4">
                <p className="text-sm text-gray-500">Sys mmHg</p>
                <p className="text-lg font-medium">{record.sysMmHg}mmHg</p>
              </div>
              <div className="flex flex-col items-center mx-4">
                <p className="text-sm text-gray-500">Dia mmHg</p>
                <p className="text-lg font-medium">{record.diaMmHg} mmHg</p>
              </div>
            </div>
        </div>
      </div>
      
    
      {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-hidden">
          <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 rounded-lg opacity-75"></div>
            </div>
            {!isDoctor && 
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
            }
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className='flex space-x-20'>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Medical Record
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Date: {record.dateCreated}
                          <br />
                          Dia: {record.diaMmHg} mmHg
                          <br />
                          Heart Rate: {record.pulseRate}
                          <br />
                          Sys mmHg: {record.sysMmHg} mmHg
                        </p>
                      </div>
                      {isDoctor &&  
                        <button onClick={() =>handleApprove(record.recordId)} className='btn btn-success rounded-md'>Approve</button>
                      }
                    </div>

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Notes
                      </h3>

                      {isDoctor === true ? 
                          (<div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Attached Note: {record.notes}
                            </p>
                            <form>
                                <input
                                  type="text"
                                  name="notes"
                                  placeholder="Enter Notes"
                                  onChange={handleChange}
                                  className="mt-1 p-2 block w-full rounded-md bg-gray-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </form>
                            <br/>
                              <button onClick={() => handleSave(record.recordId)} className='btn btn-secondary rounded-md'>Save</button>                            
                        </div>)
                        :
                        (<div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Attached Note: {record.notes}
                            </p>
                        </div>)
                      }
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={hideModel} type="button" className="btn w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
             </div>

          </div>
        </div>
      </div>
      )}    
    </div>
  );
};

export default PatientRecord;
