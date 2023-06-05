import useSWR from 'swr';
import { getMaluku, getMalukuKota } from '../api/malukuApi';
import { GeoJsonObject } from 'geojson';

interface IMaluku extends GeoJsonObject {
  properties: {
    provinsi: string;
    kota: string;
  };
  offenseCount: number;
}

interface IKota {
  _id: string;
  properties: {
    provinsi: string;
    kota: string;
  };
}

export const malukuUrlEndpoint = '/api/maluku';

export const useMaluku = () => {
  const { data, isLoading, mutate, error } = useSWR<IMaluku>(
    malukuUrlEndpoint,
    getMaluku,
  );

  return {
    data,
    isLoading,
    mutateMaluku: mutate,
    error,
  };
};

export const useMalukuKota = () => {
  const { data, isLoading, mutate, error } = useSWR<IKota[]>(
    `${malukuUrlEndpoint}/kota`,
    getMalukuKota,
  );

  return {
    data,
    isLoading,
    mutateMalukuKota: mutate,
    error,
  };
};
