import React from 'react';
import DetailPage from '../page/DetailPage';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const authenticate = useSelector(state => state.auth.authenticate)
  return authenticate === true?<DetailPage /> : <Navigate to={'/login'}/>
}

export default PrivateRoute
