import axios from 'axios';

export const search = (query) => {
  axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    .then((response) => response.data);
};
