'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useState, useEffect } from 'react';

  

  
export default function StickyHeadTable(data: any) {

    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);

    // iterate through data and create columns
    // {
    //     "timestamp": 1721122163.1246238,
    //     "playername": "God said",
    //     "pb": "20:32",
    //     "content": "Chambers of Xeric (Team Size: 4 players)"
    // }

    useEffect(() => {
        try {
        let newcolumns: any = [];
        let newrows: any = [];
            console.log(data.data);
        let keys = Object.keys(data.data[0]);
        console.log(keys)
        for (let i = 0; i < keys.length; i++) {
            newcolumns.push({id: keys[i], label: keys[i], minWidth: 170});
        }


        // iterate through data and create rows
        for (let i = data.data.length-1; i >= 0; i--) {
            let item = data.data[i];
            let row: any = {};
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == 'timestamp') {
                    row[keys[j]] = new Date(item[keys[j]] * 1000).toLocaleString('en-GB', { timeZone: 'Asia/Singapore' });
                    continue;
                }
                row[keys[j]] = item[keys[j]];
            }
            
            newrows.push(row);
        }

        setColumns(newcolumns);
        setRows(newrows);

        console.log(newcolumns);
        console.log(newrows);
    } catch (e) {
        console.log(e);
    }

    }, [data]);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}