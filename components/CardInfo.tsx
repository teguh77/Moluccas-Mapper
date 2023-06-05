import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

interface Props {
  title: string;
  subtitle: string;
  color: string;
  persentase: number;
}

const CardInfo = ({ title, subtitle, persentase, color }: Props) => {
  return (
    <Grid style={{ minWidth: 205, height: '100%' }}>
      <Card
        elevation={0}
        style={{ borderRadius: 20, padding: ' 0 1rem', height: '100%' }}
      >
        <CardHeader
          avatar={<TroubleshootIcon sx={{ color, width: 40, height: 40 }} />}
        ></CardHeader>
        <div>
          <Divider />
          <div
            style={{
              padding: '1rem 1rem 2.5rem 1rem',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="caption" style={{ color: '#BABABD' }}>
                {subtitle}
              </Typography>
            </div>
            <div>
              <Typography variant="h5">{persentase}%</Typography>
              <LinearProgress
                variant="determinate"
                value={persentase}
                color="secondary"
                style={{
                  height: 4,
                  borderRadius: 3,
                  marginTop: '.5rem',
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default CardInfo;
