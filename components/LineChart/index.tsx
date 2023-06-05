import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('./LineChart'), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width={630} height={450} />,
});

const LineChartPage = () => <LineChart />;

export default LineChartPage;
