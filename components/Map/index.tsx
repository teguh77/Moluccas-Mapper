import dynamic from 'next/dynamic';
import Loader from './Loader';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <Loader />,
});

interface Props {
  tileIndex: number;
}

const MapPage = () => <Map />;

export default MapPage;
