import styled from '@emotion/styled';
import PinDropIcon from '@mui/icons-material/PinDrop';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import React from 'react';

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { provinsi, kota, offenseCount } = payload[0].payload;
    return (
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader
          sx={{ paddingBottom: 0 }}
          avatar={
            <PinDropIcon sx={{ width: 25, height: 25 }} color="primary" />
          }
          title={kota}
        />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  variant="head"
                  sx={{ backgroundColor: 'black' }}
                  size="small"
                >
                  Kota
                </TableCell>
                <TableCell size="small">{kota}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  variant="head"
                  sx={{ backgroundColor: 'black' }}
                  size="small"
                >
                  Provinsi
                </TableCell>
                <TableCell size="small">{provinsi}</TableCell>
              </TableRow>
              <StyledTableRow sx={{ border: 0 }}>
                <TableCell
                  variant="head"
                  sx={{ backgroundColor: 'black' }}
                  size="small"
                >
                  Pelanggaran
                </TableCell>
                <TableCell size="small">{offenseCount}</TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CustomTooltip;
