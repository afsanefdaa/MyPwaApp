import axios from 'axios';

export const rockets = () => {
  axios.get('https://api.spacexdata.com/v3/rockets')
    .then((response) => response.data);
};

export const rocket = (id) => {
  axios.get(`https://api.spacexdata.com/v3/rockets/${id}`)
    .then((response) => response.data);
};
