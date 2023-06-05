import { useDashboardData } from '@/lib/documents/dashboardDoc';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

const COLORS = [
  { start: '#9e54ed', end: '#5c4cb6' },
  { start: '#34c3ff', end: '#2876bd' },
  { start: '#da9d35', end: '#e96935' },
  { start: '#dc0ab4', end: '#e60049' },
  { start: '#50e991', end: '#00bfa0' },
];

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

export default function PieData() {
  const { data, isLoading } = useDashboardData();
  return isLoading || (data == undefined && data) ? (
    <div></div>
  ) : (
    <Paper elevation={0}>
      <Box
        style={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ResponsiveContainer width={'99%'} aspect={1}>
          <PieChart>
            <defs>
              {data?.map((entry, index) => (
                <linearGradient id={`myGradient${index}`} key={index}>
                  <stop
                    offset="0%"
                    stopColor={COLORS[index % COLORS.length].start}
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS[index % COLORS.length].end}
                  />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              dataKey="offenseCount"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={5}
              label
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
