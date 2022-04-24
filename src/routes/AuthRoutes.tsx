import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from '../routes/Auth/Login'


interface IAuthRoutesProps {}

const AuthRoutes: React.FC<IAuthRoutesProps> = (props: IAuthRoutesProps) => {
  return (
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
  );
};
export default AuthRoutes;
