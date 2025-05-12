import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.list.push(action.payload);
        },
        setEmployees: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { addEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
