import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ListAltIcon from '@mui/icons-material/ListAlt';
import React from 'react';
import OffenseCreatorForm from './Offense/OffenseCreatorForm';
import OffenseEditorForm from './Offense/OffenseEditorForm';

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
  type: string;
  dataToEdit?: IOffense;
}

const ModalForm = ({ closeModal, type, dataToEdit }: Props) => {
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
          width: '40rem',
          maxHeight: 600,
          borderRadius: '10px',
          backgroundColor: '#171721',
          overflow: 'auto',
        }}
      >
        <CardHeader
          avatar={
            <ListAltIcon color="primary" style={{ width: 30, height: 30 }} />
          }
          sx={{ padding: '2.5rem', paddingBottom: 0 }}
          title="Data"
          subheader="Data detil"
        />
        <CardContent style={{ display: 'flex', height: 500 }}>
          {type == 'creator' ? (
            <OffenseCreatorForm closeModal={closeModal} />
          ) : (
            <OffenseEditorForm
              closeModal={closeModal}
              dataToEdit={dataToEdit}
            />
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ModalForm;
