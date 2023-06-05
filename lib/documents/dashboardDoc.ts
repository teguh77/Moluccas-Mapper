import useSWR from 'swr';
import { getDashboardData } from '../api/dashboardApi';

interface IDashboardData {
  _id: string;
  provinsi: string;
  kota: string;
  offenseCount: number;
}

interface IDashboardInfo {
  aman: number;
  waspada: number;
  rawan: number;
}

export const dashboardUrlEndpoint = '/api/dashboard';

export const useDashboardData = () => {
  const { data, isLoading, mutate, error } = useSWR<IDashboardData[]>(
    dashboardUrlEndpoint,
    getDashboardData,
    { revalidateOnFocus: false },
  );

  return {
    data,
    isLoading,
    mutateDashboardData: mutate,
    error,
  };
};
export const useDashboardInfo = () => {
  const { data, isLoading, mutate, error } = useSWR<IDashboardInfo>(
    `${dashboardUrlEndpoint}/info`,
    getDashboardData,
  );

  return {
    data,
    isLoading,
    mutateDashboardInfo: mutate,
    error,
  };
};
