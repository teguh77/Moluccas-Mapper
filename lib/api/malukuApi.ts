import axios from 'axios';

export const getMaluku = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const getMalukuKota = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
