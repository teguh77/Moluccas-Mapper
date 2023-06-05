import React from 'react';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Help from '@mui/icons-material/Help';
import axios from 'axios';
import { useOffense } from '@/lib/documents/offenseDoc';

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

interface Props {
  closeModal: () => void;
}

const OffenseConfirm = ({ closeModal, dataToEdit }: Props) => {
  const { mutateOffense } = useOffense();
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`/api/offense/${dataToEdit?._id}`);
      if (res.data) {
        mutateOffense();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        top: 0,
        right: 0,
        left: 0,
        height: '100vh',
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
      <div
        style={{
          width: '20rem',
          padding: '1.5rem',
          borderRadius: '10px',
          backgroundColor: '#171721',
          overflow: 'auto',
        }}
      >
        <CardHeader
          avatar={<Help color="primary" style={{ width: 30, height: 30 }} />}
          title={
            <Typography>{`Yakin hapus data ${dataToEdit?.nama} ini?`}</Typography>
          }
        />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '3rem',
            padding: '1rem',
          }}
        >
          <Button color="primary" variant="contained" onClick={deleteHandler}>
            Hapus
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
      </div>
    </div>
  );
};

export default OffenseConfirm;
