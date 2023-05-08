import React, { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import axios from "axios";
const FLASK_BASE_URL = process.env.REACT_APP_FLASK_API_URL;
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

interface Question {
  id: number;
  label: string;
  question: string;
}

const questions: Question[] = [
  {
    id: 1,
    label: 'bloodPressure',
    question: 'Kindly place the sphygmomanometer under the camera',
  }
];

const Scan: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState({})
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sysMmHg, setSysMmHg] = useState('');
  const [diaMmHg, setDiaMmHg] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const sysThreshold = { min: 90, max: 140 };
  const diaThreshold = { min: 60, max: 90 };
  const pulseThreshold = { min: 60, max: 100 };


  useEffect(() => {
    const createMedicalRecord = async () => {
      try {
        let token = localStorage.getItem("patientAuthSignUpToken");
        const response = await fetch(`${BASE_URL}/record/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(medicalRecord)
        });
        if (response.ok) {
          console.log("Successfully saved to save record");
        }
      } catch (error) {
        console.log("Failed to save record: " + error);
      }
    };

    if (questionIndex === questions.length) {
      setShowResult(true);
    } else {
      setCurrentQuestion(questions[questionIndex]);
    }

    if (showResult === true) {
      createMedicalRecord();
    }

  }, [questionIndex, showResult, medicalRecord]);

  const handleBackButtonClick = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextButtonClick = () => {
    setQuestionIndex(questionIndex + 1);
    setImageSrc(null);
  };

  const capture = async () => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setImageSrc(imageSrc);
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post(`${FLASK_BASE_URL}/ssr`, { imageSrc });
      setSysMmHg(response.data.sysMmHg);
      setDiaMmHg(response.data.diaMmHg);
      setPulseRate(response.data.pulseRate)

      setMedicalRecord(prevState => {
        const updatedState = { ...prevState,  ...response.data};
        console.log(updatedState);
        return updatedState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {showResult && (
        <div className="w-96 h-80 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-medium">
            You have completed the scan
          </h2>
          {
            <div className="text-red-800 p-4">
              {parseInt(sysMmHg) < sysThreshold.min ? (
                <p>Systolic Pressure (mmHg) is below the normal range. Kindly visit a hospital</p>
              ) : null}
               {parseInt(sysMmHg) > sysThreshold.max ? (
                <p>Systolic Pressure (mmHg) is above the normal range. Kindly visit a hospital</p>
              ) : null}
              <br/>
              {parseInt(diaMmHg) < diaThreshold.min  ? (
                <p>Diastolic Pressure (mmHg) is below the normal range. Kindly visit a hospital.</p>
              ) : null}
              {parseInt(diaMmHg) > diaThreshold.max ? (
                <p>Diastolic Pressure (mmHg) is above the normal range. Kindly visit a hospital.</p>
              ) : null}
              <br/>
              {parseInt(pulseRate) < pulseThreshold.min ? (
                <p>Pulse Rate is below the normal range. Kindly visit a hospital.</p>
              ) : null}
              {parseInt(pulseRate) > pulseThreshold.max ? (
                <p>Pulse Rate is above the normal range. Kindly visit a hospital.</p>
              ) : null}
            </div>
          }
        </div>)
      }
    {!showResult && (
      <div className='flex flex-row justify-evenly w-2/4'>
        <div className="w-74 md:h-1/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-medium">{currentQuestion.question}</h2>

          {questionIndex === 0 ? (
            <div className='flex flex-col'>
              <div className="mb-4">
                <label htmlFor="sysMmHg" className="block font-medium mb-2">
                  Sys MmHg:
                </label>
                <input 
                  id="sysMmHg" 
                  type="text" 
                  value={sysMmHg} 
                  onChange={(event) => {
                    const value = event.target.value;
                    setSysMmHg(value);
                    setMedicalRecord(prevState => ({ ...prevState, sysMmHg: value }));
                  }}
                  className="border-gray-300 border rounded-md p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="diaMmHg" className="block font-medium mb-2">
                  Dia MmHg:
                </label>
                <input 
                  id="diaMmHg" 
                  type="text" 
                  value={diaMmHg} 
                  onChange={(event) => {
                    const value = event.target.value;
                    setDiaMmHg(value);
                    setMedicalRecord(prevState => ({ ...prevState, diaMmHg: value }));
                  }}
                  className="border-gray-300 border rounded-md p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="pulseRate" className="block font-medium mb-2">
                  Pulse rate (per min):
                </label>
                <input 
                id="pulseRate" 
                type="text" 
                value={pulseRate} 
                onChange={(event) => {
                  const value = event.target.value;
                  setPulseRate(value);
                  setMedicalRecord(prevState => ({ ...prevState, pulseRate: value }));
                }}
                className="border-gray-300 border rounded-md p-2 w-full" />
              </div>
            </div>

          ) 
           : null}
        
        <div className="flex flex-row space-x-4 md:w-1/3">
          <button onClick={handleBackButtonClick} className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
            Back
          </button>

          <button onClick={handleNextButtonClick} className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
            Next
          </button>
          </div>
        </div>
      </div>
    )}
    {!showResult && (
      <>
        <div className="pl-10 h-80 w-80 relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover rounded-lg"
          />

          {imageSrc && (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={imageSrc}
              alt="Screenshot"
            />
          )}
        </div>
        <div className='flex flex-col ml-10'>
          <button
            className="bg-black text-sm text-white rounded-md py-2 px-4 mb-5"
            onClick={capture}
          >
            Capture Screenshot
          </button>
          <button
            className="bg-black text-sm text-white rounded-md py-2 px-4"
            onClick={handleUpload}
          >
            Upload Screenshot
          </button>
        </div>
      </>
    )}
  </div>
  );
};

export default Scan;