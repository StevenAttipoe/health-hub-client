import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";
import FetchState from '../../interfaces/FetchState';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

function useFetch<T>(url: string, userType:string): FetchState<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token;
        if (userType === "doctor") {
          token = localStorage.getItem("doctorAuthLoginToken");
        } else if (userType === "patient") {
          token = localStorage.getItem("patientAuthSignUpToken");
        }
        console.log(`${BASE_URL}`)
        const response: AxiosResponse = await axios.get(`${BASE_URL}`+ url, { headers: { Authorization: `Bearer ${token}` }});
        setData(response.data);
      } catch (error: any) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, userType]);

  return { loading, data, error };
}

export default useFetch;