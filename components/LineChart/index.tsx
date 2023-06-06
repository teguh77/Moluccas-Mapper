import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('./LineChart'), {
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rounded"
      sx={{
        width: { xs: '100%', md: 630 },
        height: { xs: 450, md: 450 },
      }}
    />
  ),
});

const LineChartPage = () => <LineChart />;

export default LineChartPage;
