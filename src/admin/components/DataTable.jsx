import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function DataTable({
  title,
  rows,
  columns,
  onSort,
  sortBy,
  sortDirection,
  onSearch,
  searchText,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRows,
}) {
  return (
    <Paper 
      sx={{ 
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              fontWeight: 600,
              color: 'var(--main-color2)',
            }}
          >
            {title}
          </Typography>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            sx={{
              width: { xs: '120px', sm: '200px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--main-color2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--main-color2)',
                },
              },
            }}
          />
        </Box>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.numeric ? 'right' : 'left'}
                    sx={{
                      backgroundColor: '#f8f9fa',
                      color: 'var(--main-color2)',
                      fontWeight: 600,
                      cursor: column.sortable ? 'pointer' : 'default',
                      '&:hover': column.sortable ? {
                        backgroundColor: 'rgba(13, 92, 145, 0.04)',
                      } : {},
                    }}
                    onClick={() => column.sortable && onSort(column.field)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {column.headerName}
                      {column.sortable && sortBy === column.field && (
                        <IconButton size="small" sx={{ p: 0 }}>
                          {sortDirection === 'asc' ? (
                            <ArrowUpwardIcon fontSize="small" />
                          ) : (
                            <ArrowDownwardIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={row.id || index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: 'rgba(13, 92, 145, 0.04)',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.numeric ? 'right' : 'left'}
                    >
                      {column.renderCell ? column.renderCell(row) : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{
            '.MuiTablePagination-select': {
              borderRadius: '8px',
            },
            '.MuiTablePagination-selectIcon': {
              color: 'var(--main-color2)',
            },
          }}
        />
      </Box>
    </Paper>
  );
} 