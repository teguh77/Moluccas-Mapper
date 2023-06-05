/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModalForm from '../ModalForm';
import { styled } from '@mui/material/styles';
import OffenseDetail from './OffenseDetail';
import OffenseConfirm from './OffenseConfirm';
import { useOffense } from '@/lib/documents/offenseDoc';
import { CustomPaginationTable } from '../TablePagination';
import { Box, Paper, TableFooter } from '@mui/material';

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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:first-line': {
    textTransform: 'capitalize',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    textTransform: 'lowercase',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type Props = {
  searchValue: string | null;
};

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

const OffenseTable = ({ searchValue }: Props) => {
  const { data: offenseData, isLoading } = useOffense();
  const [dataToEdit, setDataToEdit] = useState<IOffense | undefined>();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [filteredOffense, setFilteredOffense] = useState<IOffense[]>(
    offenseData ?? [],
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [offenseLength, setOffenseLength] = useState(
    Math.ceil(filteredOffense.length / rowsPerPage),
  );

  const pageHandler = (num: number) => {
    setPage(num);
    return page;
  };

  useEffect(() => {
    setOffenseLength(Math.ceil(filteredOffense.length / rowsPerPage));
  }, [rowsPerPage, filteredOffense]);

  const filterDataBySearch = (offense: IOffense[]) => {
    if (!searchValue?.trim()) return offense;
    return offense?.filter((a) =>
      a.nama.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
  };

  useEffect(() => {
    setFilteredOffense(
      filterDataBySearch(!isLoading && offenseData ? offenseData : []),
    );
  }, [offenseData, searchValue]);
  // Pagination

  const emptyRows =
    page > 0 && filteredOffense
      ? Math.max(0, (1 + page) * rowsPerPage - filteredOffense?.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // End Pagination

  const editorHandler = (id: string, type?: string) => {
    const offense = filteredOffense?.find((item) => item._id === id);
    if (offense) {
      setDataToEdit(offense);
      if (type == 'edit') {
        openEditorModal();
      } else if (type == 'detail') {
        openDetailModal();
      } else if (type == 'delete') {
        openDeleteModal();
      }
    }
  };

  const openEditorModal = () => {
    setEditorIsOpen(true);
  };

  const closeEditorModal = () => {
    setEditorIsOpen(false);
  };
  const openDetailModal = () => {
    setDetailIsOpen(true);
  };

  const closeDetailModal = () => {
    setDetailIsOpen(false);
  };
  const openDeleteModal = () => {
    setDeleteIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIsOpen(false);
  };

  if (isLoading) {
    return null;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nama Perusahaan</StyledTableCell>
              <StyledTableCell>Desa</StyledTableCell>
              <StyledTableCell>Kota</StyledTableCell>
              <StyledTableCell>Kecamatan</StyledTableCell>
              <StyledTableCell>Provinsi</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredOffense?.slice(
                  (page > offenseLength
                    ? pageHandler(offenseLength - 1)
                    : page) * rowsPerPage,
                  (page > offenseLength
                    ? pageHandler(offenseLength - 1)
                    : page) *
                    rowsPerPage +
                    rowsPerPage,
                )
              : filteredOffense
            )?.map((item) => (
              <StyledTableRow key={item.nama}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textTransform: 'none' }}
                >
                  {item.nama}
                </TableCell>
                <StyledTableCell>{item.desa}</StyledTableCell>
                <StyledTableCell>{item.kota}</StyledTableCell>
                <StyledTableCell>{item.kecamatan}</StyledTableCell>
                <StyledTableCell>{item.provinsi}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained" color="primary" size="small">
                    <Button onClick={() => editorHandler(item._id, 'detail')}>
                      <VisibilityIcon />
                    </Button>
                    <Button onClick={() => editorHandler(item._id, 'edit')}>
                      <EditOutlinedIcon />
                    </Button>
                    <Button onClick={() => editorHandler(item._id, 'delete')}>
                      <DeleteOutlinedIcon />
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 66 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <CustomPaginationTable
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                data={filteredOffense}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {editorIsOpen && (
        <ModalForm
          closeModal={closeEditorModal}
          type="editor"
          dataToEdit={dataToEdit}
        />
      )}
      {detailIsOpen && (
        <OffenseDetail closeModal={closeDetailModal} dataToEdit={dataToEdit} />
      )}
      {deleteIsOpen && (
        <OffenseConfirm closeModal={closeDeleteModal} dataToEdit={dataToEdit} />
      )}
    </>
  );
};

export default OffenseTable;
