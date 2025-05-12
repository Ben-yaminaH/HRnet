import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeeSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/app.css';
import Modal from "../components/Modal"

export default function CreateEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        birthDate: null,
        startDate: null,
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
    });

    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedForm = {
            ...form,
            birthDate: form.birthDate?.toISOString() || '',
            startDate: form.startDate?.toISOString() || '',
        };

        const stored = JSON.parse(localStorage.getItem('employees')) || [];
        stored.push(formattedForm);
        localStorage.setItem('employees', JSON.stringify(stored));

        dispatch(addEmployee(formattedForm));
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
        navigate('/employee-list');
    };

    return (
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>

            <div className="container">
                <a href="/employee-list">View Current Employees</a>
                <h2>Create Employee</h2>

                <form id="create-employee" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={form.firstName} onChange={handleChange} required />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={form.lastName} onChange={handleChange} required />

                    <label htmlFor="birthDate">Date of Birth</label>
                    <DatePicker
                        id="birthDate"
                        selected={form.birthDate}
                        onChange={(date) => setForm({ ...form, birthDate: date })}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select birth date"
                        className="date-picker"
                    />

                    <label htmlFor="startDate">Start Date</label>
                    <DatePicker
                        id="startDate"
                        selected={form.startDate}
                        onChange={(date) => setForm({ ...form, startDate: date })}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select start date"
                        className="date-picker"
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" value={form.street} onChange={handleChange} />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" value={form.city} onChange={handleChange} />

                        <label htmlFor="state">State</label>
                        <select id="state" value={form.state} onChange={handleChange}>
                            <option value="">Select a state</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>

                        </select>

                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" value={form.zipCode} onChange={handleChange} />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select id="department" value={form.department} onChange={handleChange}>
                        <option value="">Select a department</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Legal">Legal</option>
                    </select>
                    <div className='button-box'>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>


            <Modal isOpen={modalOpen} onClose={closeModal}>
                <h2>Employee Created !</h2>
            </Modal>
        </>
    );
}
