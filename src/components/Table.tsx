import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function StickyHeadTable(props) {

  const {rows, columns, handleDoubleClick, primaryKey} = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState({})

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { target: { id, value }} = e
    setFilters({...filters, [id]: value})
  }

  const renderTableHeaders = () =>
        <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
                <div style={{display: 'inline-block'}}>
                <Typography>{column.label}</Typography>
                <TextField hiddenLabel id={column.id} variant="filled" size='small' onChange={handleFilterChange}/>
                </div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

  const isFiltered = (row) => {
    for(var key in filters) {
        if (!row[key].toLowerCase().startsWith(filters[key].toLowerCase())){
            return true
        }
    }
    return false
  }

  const renderRow = (row) =>
            <TableRow hover role="checkbox" tabIndex={-1} key={row[primaryKey]} itemID={row[primaryKey]} item={row} onDoubleClick={handleDoubleClick}>
                {
                    columns.map((column: any) => {
                        const value = row[column.id];
                        return <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            </TableCell>
                    })
                }
              </TableRow>

  const renderTableBody = () => {
    return (
        <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .reduce((filtered: Array<any>, row: any) => isFiltered(row) ? [...filtered] : [...filtered, renderRow(row)], [])
              }
          </TableBody>
    )
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
            {renderTableHeaders()}
            {renderTableBody()}
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
