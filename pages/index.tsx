import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import CardInfo from '../components/CardInfo';
import LineChart from '../components/LineChart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import PieData from '@/components/PieData';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import { useOffenseLatest } from '@/lib/documents/offenseDoc';
import {
  useDashboardData,
  useDashboardInfo,
} from '@/lib/documents/dashboardDoc';
import Head from 'next/head';

const Home = () => {
  const { data: dashboardData, isLoading: isLoadingDashboardData } =
    useDashboardData();
  const { data, isLoading } = useOffenseLatest();
  const { data: dashboardInfo, isLoading: isLoadingInfo } = useDashboardInfo();
  return (
    <>
      <Head>
        <title>Moluccas Mapper</title>
      </Head>
      <main>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(14, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(4, minmax(0, auto))',
            gap: 30,
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: '1/15', md: '1/10' },
              gridTemplateRows: {
                xs: 'repeat(2, minmax(0, auto))',
                md: 'unset',
              },
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gridRow: { sm: '1/2', md: 'unset' },
              display: 'grid',
              gap: '2rem',
              paddingX: { xs: '1rem', sm: 0 },
            }}
          >
            {isLoadingInfo || !dashboardInfo ? (
              <>
                <div style={{ gridColumn: '1/5' }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ minWidth: 205, height: 220 }}
                  />
                  <Skeleton
                    width="80%"
                    animation="wave"
                    sx={{ marginTop: '5px' }}
                  />
                  <Skeleton animation="wave" />
                </div>
                <div style={{ gridColumn: '5/9' }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ minWidth: 205, height: 220 }}
                  />
                  <Skeleton
                    width="80%"
                    animation="wave"
                    sx={{ marginTop: '5px' }}
                  />
                  <Skeleton animation="wave" />
                </div>
                <div style={{ gridColumn: '9/13' }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ minWidth: 205, height: 220 }}
                  />
                  <Skeleton
                    width="80%"
                    animation="wave"
                    sx={{ marginTop: '5px' }}
                  />
                  <Skeleton animation="wave" />
                </div>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    gridColumn: { xs: '1/13', sm: '1/7', md: '1/5' },
                    gridRow: { sm: '1/2', md: 'unset' },
                  }}
                >
                  <CardInfo
                    color="#236ad3"
                    title="Aman"
                    subtitle="Tidak ada pelanggaran"
                    persentase={dashboardInfo?.aman}
                  />
                </Box>
                <Box
                  sx={{
                    gridColumn: { xs: '1/13', sm: '7/13', md: '5/9' },
                    gridRow: { sm: '1/2', md: 'unset' },
                  }}
                >
                  <CardInfo
                    color="#d6d61c"
                    title="Waspada"
                    subtitle="Hanya terdapat 1 pelanggaran"
                    persentase={dashboardInfo?.waspada}
                  />
                </Box>
                <Box
                  sx={{
                    gridColumn: { xs: '1/13', sm: '1/7', md: '9/13' },
                    gridRow: { sm: '2/3', md: 'unset' },
                  }}
                >
                  <CardInfo
                    color="#d11d1d"
                    title="Rawan"
                    subtitle="Lebih dari 1 pelanggaran"
                    persentase={dashboardInfo?.rawan}
                  />
                </Box>
              </>
            )}
          </Box>
          <Box
            sx={{
              gridColumn: { xs: '1/15', sm: '1/15', md: '10/15' },
              gridRow: { xs: 'auto', sm: '3/4', md: '1/3' },
              padding: { xs: '0 1rem', md: 0 },
            }}
          >
            <div
              style={{
                borderRadius: 15,
                padding: '1rem 1.5rem',
                backgroundColor: '#171721',
              }}
            >
              <CardHeader
                avatar={
                  <DonutLargeOutlinedIcon
                    color="primary"
                    style={{ width: 35, height: 35 }}
                  />
                }
                title="5 Kota Dengan Jumlah Pelanggaran Terbanyak"
              />
              <CardContent>
                <Divider />
                <Paper elevation={0}>
                  {isLoadingDashboardData || !dashboardData ? (
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
                  ) : (
                    <PieData />
                  )}
                </Paper>
              </CardContent>
            </div>
          </Box>
          <Box
            sx={{
              gridColumn: { xs: '1/15', sm: '1/15', md: '1/10' },
              gridRow: { xs: 'auto', sm: '2/3', md: '2/5' },
              padding: { xs: '0 1rem', md: 0 },
            }}
          >
            <div
              style={{
                height: '100%',
                borderRadius: 15,
                padding: '1rem 1.5rem',
                backgroundColor: '#171721',
              }}
            >
              <CardHeader
                avatar={
                  <InsertChartOutlinedRoundedIcon
                    color="primary"
                    style={{ width: 35, height: 35 }}
                  />
                }
                title="Statistik Pelanggaran"
                subheader="5 Kota Dengan Jumlah Pelanggaran Terbanyak"
              />
              <CardContent>
                <Divider sx={{ marginBottom: '2rem' }} />
                <Paper
                  style={{
                    padding: '0 1rem 1rem 1rem',
                    height: '100%',
                  }}
                  elevation={0}
                >
                  {isLoadingDashboardData || !dashboardData ? (
                    <Skeleton variant="rounded" width={630} height={450} />
                  ) : (
                    <LineChart />
                  )}
                </Paper>
              </CardContent>
            </div>
          </Box>
          <Box
            sx={{
              gridColumn: { xs: '1/15', sm: '1/15', md: '10/15' },
              gridRow: { xs: 'auto', sm: '4/5', md: '3/5' },
              padding: { xs: '0 1rem', md: 0 },
            }}
          >
            <div
              style={{
                borderRadius: 15,
                padding: '1rem 1.5rem',
                backgroundColor: '#171721',
              }}
            >
              <CardHeader
                avatar={
                  <BookmarkBorderOutlinedIcon
                    color="primary"
                    style={{ width: 35, height: 35 }}
                  />
                }
                title="Perusahaan Yang Melakukan Pelanggaran"
                subheader="Tiga Terbaru"
              />
              <CardContent>
                <Divider sx={{ marginBottom: '2rem' }} />
                <Paper style={{ padding: '0 1rem 0 1rem' }} elevation={0}>
                  <Grid container sx={{ gap: { xs: 3, sm: 5, md: 3 } }}>
                    {isLoading || !data
                      ? Array.from({ length: 3 }).map((_, idx) => (
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: 'flex',
                              width: '100%',
                              alignItems: 'center',
                              height: 80,
                            }}
                            key={idx}
                          >
                            <div style={{ width: '20%' }}>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={50}
                                height={50}
                              />
                            </div>

                            <div
                              style={{
                                width: '80%',
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '.2rem',
                                marginLeft: '.5rem',
                              }}
                            >
                              <Skeleton
                                animation="wave"
                                height={15}
                                width="100%"
                              />
                              <Skeleton
                                animation="wave"
                                height={15}
                                width="70%"
                              />
                            </div>
                          </Grid>
                        ))
                      : data?.map((comp) => (
                          <Grid item xs={12} key={comp._id}>
                            <Box
                              style={{
                                borderRadius: 15,
                                display: 'flex',
                                alignItems: 'center',
                                height: 80,
                                background:
                                  'linear-gradient(0deg, rgba(23,23,33,1) 0%, rgba(156,39,176,0.343032212885154) 100%)',
                                padding: '0 .5rem 0 1rem',
                              }}
                            >
                              <ApartmentIcon
                                color="primary"
                                style={{ width: 30, height: 30 }}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  marginLeft: '1rem',
                                }}
                              >
                                <Typography variant="body1">
                                  {comp.nama}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  style={{ color: '#BABABD' }}
                                >
                                  {`${comp.desa}, ${comp.kota}, ${comp.provinsi}`}
                                </Typography>
                              </div>
                            </Box>
                          </Grid>
                        ))}
                  </Grid>
                </Paper>
              </CardContent>
            </div>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
