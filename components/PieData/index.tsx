import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';

const PieData = dynamic(() => import('./PieData'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: { md: 310, xs: '19rem', sm: '36.5rem' },
        width: { md: 328, xs: '19rem', sm: '36.5rem' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          height: { md: 200, xs: '60%', sm: '40%' },
          width: { md: 200, xs: '60%', sm: '40%' },
        }}
      />
    </Box>
  ),
});

const PieDataPage = () => <PieData />;

export default PieDataPage;
