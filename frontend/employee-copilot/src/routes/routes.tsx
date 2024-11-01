import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import AddEmployee from '../pages/addEmployee';
import ListEmployees from '../pages/listEmployees';
import DetailsEmployee from '../pages/detailsEmployee';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/employee/add' element={<AddEmployee />} />
        <Route path='/employee/list' element={<ListEmployees />} />
        <Route path='/employee/details/:id' element={<DetailsEmployee />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
