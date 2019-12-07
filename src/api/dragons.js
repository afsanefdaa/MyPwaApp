import axios from 'axios';

export const dragons = () => {
  axios.get('https://api.spacexdata.com/v3/dragons')
    .then((response) => response.data);
};

export const dragons = (id) => {
  axios.get(`https://api.spacexdata.com/v3/dragons/${id}`)
    .then((response) => response.data);
};
