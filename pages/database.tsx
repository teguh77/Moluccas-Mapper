import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import OffenseTable from '../components/Offense/OffenseTable';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import NoteAdd from '@mui/icons-material/NoteAdd';
import ModalForm from '../components/ModalForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Autocomplete from '@mui/material/Autocomplete';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useOffense } from '@/lib/documents/offenseDoc';
import Head from 'next/head';
import Typography from '@mui/material/Typography';

const Data = () => {
  const { data: offenseData, isLoading } = useOffense();
  const router = useRouter();
  const { status } = useSession();
  const [creatorIsOpen, setCreatorIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>('');

  const openCreatorModal = () => {
    setCreatorIsOpen(true);
  };

  const closeCreatorModal = () => {
    setCreatorIsOpen(false);
  };

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    router.prefetch('/auth/login');
  }, [router]);

  if (status === 'authenticated')
    return (
      <Box sx={{ paddingX: { xs: '1rem', md: 0 } }}>
        <Head>
          <title>Moluccas Mapper | Database</title>
        </Head>
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                padding: '.5rem',
                borderRadius: 15,
                backgroundColor: '#171721',
              }}
            >
              {isLoading ? (
                <div style={{ padding: '2rem' }}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="6rem"
                    animation="wave"
                    sx={{ marginBottom: '1rem' }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      columnGap: '2rem',
                    }}
                  >
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                    <Skeleton height={78} width="100%" />
                  </div>
                </div>
              ) : (
                <>
                  <CardHeader
                    style={{ margin: '.5rem 1.5rem 0rem 1.5rem' }}
                    avatar={
                      <TableChartOutlinedIcon
                        color="primary"
                        style={{ width: 30, height: 30 }}
                      />
                    }
                    action={
                      <Button
                        variant="outlined"
                        // size="small"
                        color="primary"
                        style={{ marginTop: '.5rem' }}
                        onClick={openCreatorModal}
                      >
                        <NoteAdd />
                      </Button>
                    }
                    title={
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: 12, sm: 14 } }}
                      >
                        Tabel Catatan Pelanggaran Perusahaan
                      </Typography>
                    }
                    subheader={
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: 11, sm: 14 }, color: '#BABABD' }}
                      >
                        Wilayah Maluku dan Maluku Utara
                      </Typography>
                    }
                  ></CardHeader>
                  <CardContent>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginRight: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <Autocomplete
                        sx={{ width: { xs: '18.8rem', sm: '25rem' } }}
                        id="search"
                        onChange={(e, value: string | null) =>
                          setSearchValue(value)
                        }
                        options={
                          offenseData
                            ? offenseData?.map((option) => option.nama)
                            : []
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Cari" />
                        )}
                      />
                    </div>
                    <Paper
                      style={{ padding: '0 1rem 1rem 1rem' }}
                      elevation={0}
                    >
                      <OffenseTable searchValue={searchValue} />
                    </Paper>
                  </CardContent>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        {creatorIsOpen && (
          <ModalForm closeModal={closeCreatorModal} type="creator" />
        )}
      </Box>
    );
};

export default Data;
