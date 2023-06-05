import axios from 'axios';

export const getDashboardData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
export const getDashboardInfo = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
