import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ListAlt from '@mui/icons-material/ListAlt';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';

interface IOffense {
  _id: string;
  nama: string;
  pelanggaran: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  desa: string;
  area: string;
}

interface Props {
  closeModal: () => void;
  dataToEdit?: IOffense;
}

const OffenseDetail = ({ closeModal, dataToEdit }: Props) => {
  return (
    <div
      style={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1200,
        backgroundColor: 'rgba(0,0,0,.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="fade_animation"
    >
      <Box
        sx={{
          width: { xs: '23rem', sm: '40rem' },
          height: { xs: '41rem' },
          borderRadius: '10px',
          backgroundColor: '#171721',
          overflow: 'auto',
        }}
      >
        <CardHeader
          avatar={<ListAlt color="primary" style={{ width: 30, height: 30 }} />}
          sx={{
            padding: '2.5rem 2.5rem 1rem 2.5rem',
          }}
          title="Data"
          subheader="Data detil"
          action={
            <IconButton onClick={closeModal}>
              <HighlightOffIcon color="primary" sx={{ fontSize: '30px' }} />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: { xs: 710, sm: 500 },
            backgroundColor: '#171721',
            padding: '2rem ',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              textTransform: 'uppercase',
              fontWeight: 'medium',
              marginBottom: '1rem',
            }}
          >
            Profil
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '2rem',
              border: '1px solid #9c27b0',
              padding: '1rem',
              borderRadius: 10,
              marginBottom: '3rem',
            }}
          >
            <div>
              <Typography
                sx={{ fontSize: 14, textTransform: 'uppercase' }}
                color="text.secondary"
                gutterBottom
              >
                Nama Perusahaan
              </Typography>
              <Typography variant="body2">{dataToEdit?.nama}</Typography>
            </div>
            <div>
              <Typography
                sx={{ fontSize: 14, textTransform: 'uppercase' }}
                color="text.secondary"
                gutterBottom
              >
                Detil Pelanggaran
              </Typography>
              <Typography variant="body2">{dataToEdit?.pelanggaran}</Typography>
            </div>
          </div>
          <Typography
            sx={{
              fontSize: 18,
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 'medium',
            }}
          >
            Alamat
          </Typography>
          <div
            style={{
              border: '1px solid #9c27b0',
              padding: '2rem 1rem',
              borderRadius: 10,
            }}
          >
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  paddingRight: '.5rem',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, textTransform: 'uppercase' }}
                  color="text.secondary"
                  gutterBottom
                >
                  Provinsi
                </Typography>
                <Typography variant="body2">{dataToEdit?.provinsi}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  paddingRight: '.5rem',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, textTransform: 'uppercase' }}
                  color="text.secondary"
                  gutterBottom
                >
                  Kota
                </Typography>
                <Typography variant="body2">{dataToEdit?.kota}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  paddingRight: '.5rem',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, textTransform: 'uppercase' }}
                  color="text.secondary"
                  gutterBottom
                >
                  Kecamatan
                </Typography>
                <Typography variant="body2">{dataToEdit?.kecamatan}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  paddingRight: '.5rem',
                }}
              >
                <Typography
                  sx={{ fontSize: 14, textTransform: 'uppercase' }}
                  color="text.secondary"
                  gutterBottom
                >
                  Desa
                </Typography>
                <Typography variant="body2">{dataToEdit?.desa}</Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Box>
    </div>
  );
};

export default OffenseDetail;

// TODO
// 1. Create delete button
// 2. Create realtime revalidate
// 3. ke dashboard
