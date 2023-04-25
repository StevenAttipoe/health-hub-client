import { useState, useRef, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import Webcam from "react-webcam";
import axios from "axios";

const FLASK_BASE_URL = process.env.REACT_APP_FLASK_API_URL;
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const FormAutofill: React.FC = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<Record<string, any>>({});
  const webcamRef = useRef<Webcam>(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>('');
  const [showModal, setShowModal] = useState(true);


  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement >) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const capture = async () => {
    let image = webcamRef.current!.getScreenshot();
    setImageSrc(image);
    try {
      const response = await axios.post(`${FLASK_BASE_URL}/vision`, { image });
      setResponse(response.data)
      setFormData({ 
        surname: response.data.surname, 
        firstNames: response.data.firstNames,
        nationality: response.data.nationality, 
        gender: response.data.sex, 
        dateOfBirth: response.data.dateOfBirth,
        height: response.data.height,
        placeOfIssuance: response.data.placeOfIssuance,
        personalIdNumber: response.data.personalIdNumber
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
        const response = await fetch(`${BASE_URL}/patient/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("patientAuthSignUpToken", token);
            navigate('/patient/dashboard');
        }
    } catch(error) {
        setError("Sign up failed: " + error);
    }
  };

  useEffect(() => {
    let timeoutId:any = null;

    const validateToken = async () => {
      try{
          const response = await fetch(`${BASE_URL}/patient/auth`, {
              method: "GET",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });
          if (response.ok) {
              const isValid = await response.text();
              if (isValid === "true") {
                navigate('/patient/dashboard');
              }
          }
      } catch(error) {
          setError("Invalid token sign up again: " + error);
      }
    };

    const token = localStorage.getItem("patientAuthSignUpToken");
    if (token) {
      validateToken();
    }

    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error, navigate]);

  const hideModel = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <section className="fixed z-10 inset-0 overflow-y-hidden">
          <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
             
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >

              <div className="bg-white px-20 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col sm:items-start">
                  <h2 className="mb-2 text-lg text-center  font-medium text-gray-700">Terms and Agreement</h2>

                  <p className="mb-4 text-sm text-gray-600">
                    Consent: By agreeing to extract details from an ID card, you are giving your consent for the processing of personal data contained in the card. It is important to note that this consent can be withdrawn at any time.
                  </p>

                  <p className="mb-4 text-sm text-gray-600">         
                    Security: As a user, you are responsible for ensuring that the information extracted from the ID card is stored securely and not accessed by unauthorized persons.
                  </p>

                  <p className="mb-4 text-sm text-gray-600">
                    Accuracy: You must agree to ensure that the information extracted from the ID card is accurate and up-to-date. Any errors or discrepancies should be reported immediately.
                  </p>

                  <p className="mb-4 text-sm text-gray-600">
                    Compliance: You must agree to comply with all applicable laws and regulations that govern the use of personal data contained in the ID card.
                  </p>

                  <p className="mb-4 text-sm text-gray-600">
                    Purpose: You must agree to only extract the details for specific purposes that are clearly stated. For instance, if you are extracting details for identity verification, you must not use the information for any other purpose without obtaining further consent.
                  </p>
                </div>
                <div className="flex flex-row items-center justify-evenly">
                    <button onClick={hideModel} className="px-4 py-2 bg-slate-900 rounded-md text-white hover:bg-gray-700">
                      Yes
                    </button>
                    <Link to="/">
                      <button onClick={hideModel} className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-700">
                        No
                      </button>
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </section>

        )}    

      {error && (
        <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
            <strong className="font-medium">Error: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex h-screen  bg-gradient-to-r from-lime-100 to-cyan-100">
        <div className="w-1/2 flex items-center justify-center">
            <div className="h-80 w-80 relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                className="bg-black text-white rounded-md py-2 px-4 absolute bottom-4 right-4"
                onClick={capture}
              >
                Capture Screenshot
              </button>
              {imageSrc && (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={imageSrc}
                  alt="Screenshot"
                />
              )}
          </div>
           
        </div>
        <div className="w-3/4 flex items-center justify-center">
          <form onSubmit={handleSignup} className="w-3/4 space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="flex space-x-4">
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Surname Nom
                <input
                  type="text"
                  name="surname"
                  defaultValue={response["surname"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Firstnames Prénoms
                <input
                  type="text"
                  name="firstNames"
                  defaultValue={response["firstNames"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Nationality/Nationalité
                <input
                  type="text"
                  name="nationality"
                  defaultValue={response["nationality"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Sex/Sexe
                <input
                  type="text"
                  name="gender"
                  defaultValue={response["sex"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Date of Birth/Date de Naissance
                <input
                  type="text"
                  name="dateOfBirth"
                  defaultValue={response["dateOfBirth"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
              </label>
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Height/Taille(m)
                <input
                  type="text"
                  name="height"
                  defaultValue={response["height"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Place of Issuance/Lieu de délivrance
                <input
                  type="text"
                  name="placeOfIssuance"
                  defaultValue={response["placeOfIssuance"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
              </label>
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Personal ID Number
                <input
                  type="text"
                  name="personalIdNumber"
                  defaultValue={response["personalIdNumber"]}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
              </label>
            </div>

            <div className="flex items-center justify-center pt-5">
              <div className="md:w-1/3 space-x-4">
                  <Link to="/#">
                      <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                          Back
                      </button>
                  </Link>
                      
                  <button className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                      SignUp
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
                
export default FormAutofill;
