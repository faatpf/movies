import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../routes/Panel/Home'


interface IPanelRoutesProps {}

const PanelRoutes: React.FC<IPanelRoutesProps> = (props: IPanelRoutesProps) => {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
  );
};
export default PanelRoutes;
