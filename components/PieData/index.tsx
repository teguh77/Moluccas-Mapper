import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';

const PieData = dynamic(() => import('./PieData'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '310px',
        width: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Skeleton variant="circular" width={200} height={200} />
    </div>
  ),
});

const PieDataPage = () => <PieData />;

export default PieDataPage;
