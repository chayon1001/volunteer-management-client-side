import React, {useContext } from 'react';

import { Navigate } from 'react-router-dom';


import Loading from '../pages/loading/Loading';
import { AuthContext } from '../provider/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
       return children;
    }
    return <Navigate to={'/auth/login'}></Navigate>
    
};

export default PrivateRoute;