import React from 'react';
import Paper from '@mui/material/Paper';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { useDashboardData } from '@/lib/documents/dashboardDoc';
import CustomTooltip from '../CustomTooltip';

const LocationDetailChart = () => {
  const { data } = useDashboardData();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ transition: 'all' }}>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart
            width={630}
            height={450}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9c27b0" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="kota" fontSize={14} interval={0} />
            <YAxis dataKey="offenseCount" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="offenseCount"
              stroke="#9c27b0"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ThemeProvider>
  );
};

export default LocationDetailChart;
