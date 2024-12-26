import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL : 'https://volunteer-management-sever-side.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    const {logOut} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response =>{
            return response;
        }, error =>{

            console.log('error caught in interceptors', error);

            if(error.status === 401 || error.status === 403){
                console.log('need to logout the user')
                logOut()
                    .then(()=>{
                        console.log('logged out user');
                        navigate('/auth/login')
                    })
                    .catch(error => console.log(error));
            }
            return Promise.reject(error);
        })
    },[])
    return axiosInstance;
};

export default useAxiosSecure;