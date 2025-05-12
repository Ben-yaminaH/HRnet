import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEmployee from './pages/create-employee';
import EmployeeList from './pages/employee-list';
import { useDispatch } from 'react-redux';
import { setEmployees } from './store/employeeSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    dispatch(setEmployees(storedEmployees));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employee-list" element={<EmployeeList />} />
    </Routes>
  );
}
