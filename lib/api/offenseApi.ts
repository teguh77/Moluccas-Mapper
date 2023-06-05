import axios from 'axios';

export const getOffense = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
export const getOffenseLatest = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
