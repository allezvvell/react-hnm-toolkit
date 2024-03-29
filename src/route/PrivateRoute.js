import React from 'react'
import DetailPage from '../page/DetailPage'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({authenticate,setCartList,cartList}) => {
  return authenticate === true?<DetailPage setCartList={setCartList} cartList={cartList}/> : <Navigate to={'/login'}/>
}

export default PrivateRoute
