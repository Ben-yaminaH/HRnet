import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import "../style/app.css";

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
};

export default function EmployeeList() {
    const employees = useSelector((state) => state.employees.list);
    const [search, setSearch] = useState('');

    // Colonnes du tableau
    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        {
            Header: 'Birth Date',
            accessor: 'birthDate',
            Cell: ({ value }) => formatDate(value),
        },
        {
            Header: 'Start Date',
            accessor: 'startDate',
            Cell: ({ value }) => formatDate(value),
        },
        { Header: 'Street', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state' },
        { Header: 'Zip Code', accessor: 'zipCode' },
        { Header: 'Department', accessor: 'department' },
    ], []);

    // Filtrer les données 
    const filteredData = useMemo(() => {
        if (!search) return employees;
        const lowercased = search.toLowerCase();
        return employees.filter(emp =>
            Object.values(emp).some(val =>
                String(val).toLowerCase().includes(lowercased)
            )
        );
    }, [employees, search]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize },
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="container">
            <h1>Current Employees</h1>

            <div className='search-bar'>

                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />

                <p className="entry-count">
                    Showing {rows.length}/{filteredData.length} employe{filteredData.length > 1 ? 'es' : 'e'}
                </p>

            </div>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>Aucun résultat</td>
                        </tr>
                    ) : (
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className='page-bar'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>{'>>'}</button>

                <span>
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span>
                <span>
                    Go to page :
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '50px', marginLeft: '10px' }}
                    />
                </span>

                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50, 100].map(size => (
                        <option key={size} value={size}>Show {size}</option>
                    ))}
                </select>
            </div>

            <Link to="/">Home</Link>
        </div>
    );
}
