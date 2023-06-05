import useSWR from 'swr';
import { getOffense, getOffenseLatest } from '../api/offenseApi';

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

export const offenseUrlEndpoint = '/api/offense';

export const useOffense = () => {
  const { data, isLoading, mutate, error } = useSWR<IOffense[]>(
    offenseUrlEndpoint,
    getOffense,
  );

  return {
    data,
    isLoading,
    mutateOffense: mutate,
    error,
  };
};

export const useOffenseLatest = () => {
  const { data, isLoading, mutate, error } = useSWR<IOffense[]>(
    `${offenseUrlEndpoint}/latest`,
    getOffenseLatest,
  );

  return {
    data,
    isLoading,
    mutateOffenseLatest: mutate,
    error,
  };
};
