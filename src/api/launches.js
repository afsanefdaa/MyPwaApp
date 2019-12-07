import axios from 'axios';

export const launches = () => {
  axios.get('https://api.spacexdata.com/v3/launches')
    .then((response) => response.data);
};

export const launch = (id) => {
  axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
    .then((response) => response.data);
};

export const past = () => {
  axios.get('https://api.spacexdata.com/v3/launches/past')
    .then((response) => response.data);
};

export const coming = () => {
  axios.get('https://api.spacexdata.com/v3/launches/upcoming')
    .then((response) => response.data);
};

export const latest = () => {
  axios.get('https://api.spacexdata.com/v3/launches/latest')
    .then((response) => response.data);
};

export const next = () => {
  axios.get('https://api.spacexdata.com/v3/launches/next')
    .then((response) => response.data);
};
