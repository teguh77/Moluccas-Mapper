import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SubmitHandler, useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useOffense } from '@/lib/documents/offenseDoc';
import { useMalukuKota } from '@/lib/documents/malukuDoc';

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

interface IKota {
  _id: string;
  properties: {
    provinsi: string;
    kota: string;
  };
}

type FormValue = {
  area: string;
  nama: string;
  pelanggaran: string;
  provinsi: string;
  kecamatan: string;
  desa: string;
};

const OffenseEditorForm = ({ closeModal, dataToEdit }: Props) => {
  const { data: kotaOptions } = useMalukuKota();
  const { mutateOffense } = useOffense();
  const [selectedProv, setSelectedProv] = useState<IKota[] | undefined>(
    kotaOptions?.filter(
      (item) =>
        item.properties.provinsi.toLowerCase() ==
        dataToEdit?.provinsi.toLowerCase(),
    ),
  );

  const provHandler = (key: string) => {
    const prov = kotaOptions?.filter(
      (item) => item.properties.provinsi.toLowerCase() == key.toLowerCase(),
    );
    if (prov && prov.length > 0) {
      setSelectedProv(prov);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    try {
      await axios.put(`/api/offense/${dataToEdit?._id}`, data);
      mutateOffense();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '1.5rem',
        paddingBottom: '0rem',
        height: '100%',
        backgroundColor: '#171721',
      }}
    >
      <Grid
        item
        container
        md={12}
        sx={{ height: '100%' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <TextField
            {...register('nama', {
              required: 'Nama perusahaan harus diisi.',
              minLength: 3,
            })}
            variant="outlined"
            required
            id="nama"
            name="nama"
            label="Nama Perusahaan"
            fullWidth
            autoComplete="off"
            error={!!errors.nama}
            helperText={errors.nama?.message}
            defaultValue={dataToEdit?.nama}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('pelanggaran', {
              required: 'Detil pelanggaran harus diisi.',
              minLength: 3,
            })}
            variant="outlined"
            id="pelanggaran"
            name="pelanggaran"
            label="Detil Pelanggaran"
            fullWidth
            autoComplete="off"
            error={!!errors.pelanggaran}
            helperText={errors.pelanggaran?.message}
            defaultValue={dataToEdit?.pelanggaran}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            paddingRight: { sm: '.5rem' },
          }}
        >
          <TextField
            inputProps={{
              ...register('provinsi', {
                required: 'Provinsi tidak boleh kosong.',
                minLength: 3,
              }),
            }}
            id="provinsi"
            select
            label="Provinsi"
            fullWidth
            error={!!errors.provinsi}
            helperText={errors.provinsi?.message}
            defaultValue={dataToEdit?.provinsi}
            onChange={(e) => provHandler(e.target.value)}
          >
            {['Maluku', 'Maluku Utara'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            paddingLeft: { sm: '.5rem' },
          }}
        >
          <TextField
            inputProps={{
              ...register('area', {
                required: 'Kota tidak boleh kosong.',
                minLength: 3,
              }),
            }}
            id="area"
            select
            label="Kota"
            fullWidth
            error={!!errors.area}
            helperText={errors.area?.message}
            defaultValue={dataToEdit?.area}
          >
            {selectedProv?.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.properties.kota}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            paddingRight: { sm: '.5rem' },
          }}
        >
          <TextField
            {...register('kecamatan', {
              required: 'Kecamatan tidak boleh kosong.',
              minLength: 3,
            })}
            variant="outlined"
            id="kecamatan"
            name="kecamatan"
            label="Kecamatan"
            fullWidth
            autoComplete="off"
            inputProps={{ style: { textTransform: 'capitalize' } }}
            error={!!errors.kecamatan}
            helperText={errors.kecamatan?.message}
            defaultValue={dataToEdit?.kecamatan}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            paddingLeft: { sm: '.5rem' },
          }}
        >
          <TextField
            {...register('desa', {
              required: 'Desa tidak boleh kosong',
              minLength: 3,
            })}
            variant="outlined"
            id="desa"
            name="desa"
            label="Desa"
            fullWidth
            autoComplete="off"
            inputProps={{ style: { textTransform: 'capitalize' } }}
            error={!!errors.desa}
            helperText={errors.desa?.message}
            defaultValue={dataToEdit?.desa}
          />
        </Grid>

        <Grid item xs={12} sx={{ height: 'max-content' }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              Update
            </Button>
            <Button
              style={{ marginLeft: '1rem' }}
              color="primary"
              variant="contained"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default OffenseEditorForm;
