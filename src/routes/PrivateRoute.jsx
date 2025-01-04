import React, {useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';


import Loading from '../pages/loading/Loading';
import { AuthContext } from '../provider/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    // const location = useLocation()

    if(loading){
        return <Loading></Loading>
    }

    // if (location.pathname === '/addVolunteer') {
    //     return <Navigate to='/auth/login'></Navigate>
    // }



    if(user && user?.email){
       return children;
    }
    return <Navigate to={'/auth/login'}></Navigate>
    
};

export default PrivateRoute;