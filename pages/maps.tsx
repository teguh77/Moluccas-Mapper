import React from 'react';
import Map from '../components/Map';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import MapIcon from '@mui/icons-material/Map';
import Head from 'next/head';

const MapPage = () => {
  return (
    <>
      <Head>
        <title>Moluccas Mapper | Map</title>
      </Head>
      <div style={{ borderRadius: 15, backgroundColor: '#171721' }}>
        <CardHeader
          title={<Typography variant="h6">Peta</Typography>}
          subheader={<Typography variant="subtitle2">Area Rawan</Typography>}
          avatar={<MapIcon color="primary" />}
        />
        <Map />
      </div>
    </>
  );
};

export default MapPage;
